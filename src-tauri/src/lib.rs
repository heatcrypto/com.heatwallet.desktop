use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tokio::time::{sleep, Duration};
use once_cell::sync::Lazy;
use tauri::Manager;
use log::{info, error};
use tauri_plugin_updater::UpdaterExt;
use std::fs::File;
use std::io::{Read, Write};
use std::path::Path;
use reqwest::header::{HeaderMap, HeaderValue};

/// Get the application version from the Tauri app context
fn get_embedded_app_version(app: &tauri::App) -> String {
    app.package_info().version.to_string()
}

/// Downloads a file from a URL and inspects its headers and content
async fn download_and_inspect_file(url: &str, path: &Path) -> Result<(), String> {
    info!("Downloading file from: {}", url);
    
    // Create a reqwest client with custom settings
    let client = reqwest::Client::builder()
        .user_agent("Heat-Wallet-Updater/1.0")
        .timeout(std::time::Duration::from_secs(60))
        .build()
        .map_err(|e| format!("Failed to create HTTP client: {}", e))?;
    
    // First, make a HEAD request to get the headers
    info!("Sending HEAD request to check headers...");
    let head_response = client.head(url)
        .send()
        .await
        .map_err(|e| format!("Failed to send HEAD request: {}", e))?;
    
    let status = head_response.status();
    info!("HEAD response status: {}", status);
    
    // Log the response headers in detail
    info!("HEAD response headers:");
    let mut has_content_encoding = false;
    let mut content_type_from_head = String::from("unknown");
    
    for (name, value) in head_response.headers() {
        let header_name = name.to_string();
        let header_value = value.to_str().unwrap_or("<binary>");
        info!("  {}: {}", header_name, header_value);
        
        // Check for specific headers that might affect the update process
        if header_name.eq_ignore_ascii_case("content-encoding") {
            has_content_encoding = true;
            if header_value.contains("gzip") {
                info!("  ⚠️ Server is sending content with gzip encoding");
            }
        }
        
        if header_name.eq_ignore_ascii_case("content-type") {
            content_type_from_head = header_value.to_string();
        }
    }
    
    if !has_content_encoding {
        info!("  ⚠️ No Content-Encoding header found. Server is not explicitly declaring compression.");
    }
    
    // Now download the file with explicit headers to avoid automatic decompression
    info!("Downloading file content...");
    let mut request_headers = HeaderMap::new();
    request_headers.insert("Accept-Encoding", HeaderValue::from_static("identity"));
    
    let response = client.get(url)
        .headers(request_headers)
        .send()
        .await
        .map_err(|e| format!("Failed to download file: {}", e))?;
    
    let status = response.status();
    info!("GET response status: {}", status);
    
    if !status.is_success() {
        return Err(format!("Server returned error status: {}", status));
    }
    
    // Log GET response headers
    info!("GET response headers:");
    for (name, value) in response.headers() {
        info!("  {}: {}", name, value.to_str().unwrap_or("<binary>"));
    }
    
    // Get the content length
    let content_length = response.content_length().unwrap_or(0);
    info!("Content length: {} bytes", content_length);
    
    // Get the content type
    let content_type = response.headers()
        .get(reqwest::header::CONTENT_TYPE)
        .and_then(|v| v.to_str().ok())
        .unwrap_or("unknown")
        .to_string(); // Clone the content type so we can use it later
    
    info!("Content type: {}", content_type);
    
    // Check if content type is appropriate for an update
    if content_type.contains("application/octet-stream") || 
       content_type.contains("application/gzip") || 
       content_type.contains("application/x-gzip") {
        info!("Content type appears to be appropriate for a binary update package");
    } else if content_type.contains("text/") || content_type.contains("application/json") {
        error!("⚠️ Content type suggests this is not a binary file! This may cause issues with the updater.");
    } else {
        info!("Content type is unusual for an update package. This might cause issues.");
    }
    
    // Save the file
    let mut file = File::create(path)
        .map_err(|e| format!("Failed to create file: {}", e))?;
    
    info!("Downloading file content to: {}", path.to_string_lossy());
    
    // Get the bytes from the response without borrowing the response further
    let bytes = match response.bytes().await {
        Ok(b) => b,
        Err(e) => return Err(format!("Failed to get response bytes: {}", e))
    };
    
    info!("Received {} bytes of data", bytes.len());
    
    file.write_all(&bytes)
        .map_err(|e| format!("Failed to write file: {}", e))?;
    
    info!("File saved successfully");
    
    // Check if it's a gzip file by examining the first few bytes
    let mut file = File::open(path)
        .map_err(|e| format!("Failed to open file for inspection: {}", e))?;
    
    let mut buffer = [0u8; 16]; // Read more bytes for better identification
    let bytes_read = file.read(&mut buffer)
        .map_err(|e| format!("Failed to read file header: {}", e))?;
    
    info!("Read {} bytes from file for header inspection", bytes_read);
    
    // Check for various file signatures
    if bytes_read >= 2 && buffer[0] == 0x1F && buffer[1] == 0x8B {
        info!("✅ File has a valid gzip header (magic bytes: 1F 8B)");
    } else if bytes_read >= 4 && buffer[0] == 0x50 && buffer[1] == 0x4B && buffer[2] == 0x03 && buffer[3] == 0x04 {
        info!("File has a ZIP archive header (magic bytes: 50 4B 03 04)");
        error!("⚠️ The updater expects a gzip file but received a ZIP file. This will cause the 'invalid gzip header' error.");
    } else if bytes_read >= 2 && buffer[0] == 0x4D && buffer[1] == 0x5A {
        info!("File has a Windows executable (MZ) header (magic bytes: 4D 5A)");
        error!("⚠️ The updater expects a gzip file but received an executable. This will cause the 'invalid gzip header' error.");
    } else {
        error!("⚠️ File does NOT have a valid gzip header");
        error!("First 16 bytes: {:02X?}", &buffer[0..bytes_read]);
        error!("This will cause the 'invalid gzip header' error when the updater tries to process it.");
    }
    
    // Provide a summary of findings
    info!("File inspection summary:");
    info!("  - URL: {}", url);
    info!("  - Content-Type: {}", content_type);
    info!("  - Size: {} bytes", content_length);
    info!("  - Saved to: {}", path.to_string_lossy());
    
    Ok(())
}

// Define the structure to hold update information.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UpdateInfo {
    pub available: bool,
    pub version: String,
    pub notes: String,
    pub download_url: String,
}

// Define a structure for our shared state.
pub struct SharedState {
    pub app_loaded: bool,
    pub update_info: Option<UpdateInfo>,
}

// Create a global shared state, protected by a Mutex.
pub static SHARED_STATE: Lazy<Mutex<SharedState>> = Lazy::new(|| {
    Mutex::new(SharedState {
        app_loaded: false,
        update_info: None,
    })
});

/// Tauri command for the Flutter app to signal that it loaded successfully.
#[tauri::command]
fn set_app_loaded() {
    let mut state = SHARED_STATE.lock().unwrap();
    state.app_loaded = true;
    info!("App has signaled that it loaded successfully.");
}

/// Tauri command for retrieving update information.
/// The Flutter app can call this to show an in-app update banner.
#[tauri::command]
fn get_update_info() -> Option<UpdateInfo> {
    let state = SHARED_STATE.lock().unwrap();
    state.update_info.clone()
}

/// Tauri command to check if an update is available.
/// Returns true if an update is available, false otherwise.
#[tauri::command]
async fn check_update(app_handle: tauri::AppHandle) -> Result<bool, String> {
    info!("Checking for updates...");
    
    // Use the updater extension trait to access the updater
    let updater = match app_handle.updater() {
        Ok(updater) => updater,
        Err(e) => {
            error!("Failed to initialize updater: {}", e);
            return Err(format!("Failed to initialize updater: {}", e));
        }
    };
    
    // Log the update server URL
    info!("Checking for updates with updater");
    
    // Check for updates
    match updater.check().await {
        Ok(Some(update)) => {
            // Update is available
            let update_info = UpdateInfo {
                available: true,
                version: update.version.clone(),
                notes: update.body.clone().unwrap_or_default(),
                download_url: update.download_url.to_string(),
            };
            
            info!("Update details:");
            info!("  Version: {}", update.version);
            info!("  Download URL: {}", update.download_url);
            if update.signature.is_empty() {
                info!("  Signature available: no");
            } else {
                info!("  Signature available: yes (length: {})", update.signature.len());
            }
            if let Some(body) = &update.body {
                info!("  Release notes: {}", body);
            }
            
            let mut state = SHARED_STATE.lock().unwrap();
            state.update_info = Some(update_info.clone());
            
            info!("Update available: {}", update_info.version);
            Ok(true)
        },
        Ok(None) => {
            info!("No updates available");
            Ok(false)
        },
        Err(e) => {
            error!("Error checking for updates: {}", e);
            error!("Error details: {:?}", e);
            Err(format!("Failed to check for updates: {}", e))
        }
    }
}

/// Tauri command to install an available update.
/// This will download and install the update, then restart the application.
#[tauri::command]
async fn install_update(app_handle: tauri::AppHandle) -> Result<(), String> {
    info!("Installing update...");
    
    // Use the updater extension trait to access the updater
    let updater = match app_handle.updater() {
        Ok(updater) => updater,
        Err(e) => {
            error!("Failed to initialize updater: {}", e);
            error!("Error details: {:?}", e);
            return Err(format!("Failed to initialize updater: {}", e));
        }
    };
    
    // Check for updates
    match updater.check().await {
        Ok(Some(update)) => {
            // Update is available, download and install it
            info!("Starting update process for version: {}", update.version);
            info!("Download URL: {}", update.download_url);
            
            if let Some(body) = &update.body {
                info!("Release notes: {}", body);
            }
            
            if update.signature.is_empty() {
                info!("Update signature: None");
                error!("Warning: Update package is not signed. This could be a security risk.");
            } else {
                info!("Update signature: Available (length: {} bytes)", update.signature.len());
            }
            
            // First, let's try to manually download the file to inspect it
            info!("Attempting to manually download the update file for inspection");
            let download_url = update.download_url.to_string(); // Convert tauri::Url to String
            let temp_path = std::env::temp_dir().join(format!("heat_wallet_update_{}.bin", update.version));
            let temp_path_str = temp_path.to_string_lossy().to_string();
            
            // Wait for the file inspection to complete before proceeding with the update
            match download_and_inspect_file(&download_url, &temp_path).await {
                Ok(_) => {
                    info!("File inspection complete. See logs for details.");
                    info!("Temporary file saved at: {}", temp_path_str);
                    
                    // Attempt to open and verify the file format more thoroughly
                    match std::fs::File::open(&temp_path) {
                        Ok(mut file) => {
                            let mut buffer = Vec::new();
                            match std::io::Read::read_to_end(&mut file, &mut buffer) {
                                Ok(size) => {
                                    info!("Read {} bytes from update file", size);
                                    
                                    // Check for gzip magic number (1F 8B)
                                    if buffer.len() >= 2 && buffer[0] == 0x1F && buffer[1] == 0x8B {
                                        info!("File has a valid gzip header");
                                    } else if buffer.len() >= 2 {
                                        error!("File does NOT have a valid gzip header");
                                        error!("First 10 bytes: {:?}", &buffer[0..std::cmp::min(10, buffer.len())]);
                                        
                                        // Check for common file signatures
                                        if buffer.len() >= 4 && buffer[0] == 0x50 && buffer[1] == 0x4B && buffer[2] == 0x03 && buffer[3] == 0x04 {
                                            info!("File appears to be a ZIP archive");
                                        } else if buffer.len() >= 4 && buffer[0] == 0x7F && buffer[1] == 0x45 && buffer[2] == 0x4C && buffer[3] == 0x46 {
                                            info!("File appears to be an ELF executable");
                                        } else if buffer.len() >= 2 && buffer[0] == 0x4D && buffer[1] == 0x5A {
                                            info!("File appears to be a Windows executable (MZ)");
                                        }
                                    }
                                },
                                Err(e) => error!("Failed to read update file: {}", e)
                            }
                        },
                        Err(e) => error!("Failed to open update file for verification: {}", e)
                    }
                },
                Err(e) => error!("Failed to inspect update file: {}", e)
            }
            
            // Create a progress handler that logs download progress
            let progress_handler = |current: usize, total: Option<u64>| {
                let total_bytes = total.unwrap_or(0);
                let percentage = if total_bytes > 0 {
                    (current as f64 / total_bytes as f64) * 100.0
                } else {
                    0.0
                };
                
                // Log progress more frequently - every 5% or at least every 2MB
                if current % 2_000_000 == 0 || (percentage % 5.0) < 0.1 {
                    info!(
                        "Download progress: {:.2}% ({} / {} bytes)", 
                        percentage,
                        current,
                        total_bytes
                    );
                }
            };
            
            // Create an error handler that logs detailed error information
            let error_handler = || {
                info!("Download completed, starting installation");
            };
            
            info!("Starting official update download and installation process");
            match update.download_and_install(progress_handler, error_handler).await {
                Ok(_) => {
                    info!("Update installed successfully");
                    Ok(())
                },
                Err(e) => {
                    error!("Error installing update: {}", e);
                    error!("Error details: {:?}", e);
                    
                    // Try to get more specific error information
                    let error_details = format!("{:?}", e);
                    if error_details.contains("gzip") {
                        error!("The update package appears to have an invalid compression format (gzip error).");
                        error!("This could be because the server is not sending the file with the correct Content-Encoding header.");
                        error!("Or the file might be corrupted during download or improperly compressed on the server.");
                    } else if error_details.contains("download") {
                        error!("There was an error downloading the update. Please check your network connection and try again.");
                    } else if error_details.contains("permission") || error_details.contains("access") {
                        error!("Permission denied while trying to install the update. The application may not have sufficient privileges.");
                    } else if error_details.contains("signature") || error_details.contains("verify") {
                        error!("Failed to verify the update signature. The update may be corrupted or tampered with.");
                    }
                    
                    Err(format!("Failed to install update: {}", e))
                }
            }
        },
        Ok(None) => {
            info!("No updates available to install");
            Err("No updates available to install".to_string())
        },
        Err(e) => {
            error!("Error checking for updates: {}", e);
            error!("Error details: {:?}", e);
            Err(format!("Failed to check for updates: {}", e))
        }
    }
}

/// The main entry point for the Tauri app.
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  
    tauri::Builder::default()
        // Your existing plugins.
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_process::init())
        // Register our custom commands.
        .invoke_handler(tauri::generate_handler![set_app_loaded, get_update_info, check_update, install_update])
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            
            // Log the app name and version at startup
            let app_name = "Heat Wallet";
            let app_version = get_embedded_app_version(app);
            info!("Starting {} v{}", app_name, app_version);

            // Spawn a background thread that waits 30 seconds to perform an update check.
            let app_handle = app.handle().clone();
            tauri::async_runtime::spawn(async move {
                info!("Waiting 30 seconds before checking for updates...");
                sleep(Duration::from_secs(30)).await;
                
                // Check for updates directly using the updater
                let updater = match app_handle.updater() {
                    Ok(updater) => updater,
                    Err(e) => {
                        error!("Failed to initialize updater: {}", e);
                        return;
                    }
                };
                
                match updater.check().await {
                    Ok(Some(update)) => {
                        info!("Update check completed: update is available");
                        
                        // Store update information in shared state
                        let update_info = UpdateInfo {
                            available: true,
                            version: update.version.clone(),
                            notes: update.body.clone().unwrap_or_default(),
                            download_url: update.download_url.to_string(),
                        };
                        
                        let mut state = SHARED_STATE.lock().unwrap();
                        state.update_info = Some(update_info.clone());
                        
                        info!("Update available: {}", update_info.version);
                        info!("Update URL: {}", update_info.download_url);
                        
                        // First, let's try to manually download the update file for inspection
                        info!("Attempting to manually download the update file for inspection");
                        let download_url = update.download_url.to_string(); // Convert tauri::Url to String
                        let temp_path = std::env::temp_dir().join("heat_wallet_update_inspection.bin");
                        let temp_path_str = temp_path.to_string_lossy().to_string();
                        
                        // Spawn a task to download and inspect the file
                        let update_clone = update.clone();
                        tauri::async_runtime::spawn(async move {
                            info!("Starting file inspection for: {}", download_url);
                            match download_and_inspect_file(&download_url, &temp_path).await {
                                Ok(_) => {
                                    info!("File inspection complete. See logs for details.");
                                    info!("Temporary file saved at: {}", temp_path_str);
                                },
                                Err(e) => error!("Failed to inspect update file: {}", e)
                            }
                            
                            // Create a progress handler that logs download progress
                            let progress_handler = |current: usize, total: Option<u64>| {
                                let total_bytes = total.unwrap_or(0);
                                let percentage = if total_bytes > 0 {
                                    (current as f64 / total_bytes as f64) * 100.0
                                } else {
                                    0.0
                                };
                                
                                // Log progress every 5% or at least every 2MB
                                if current % 2_000_000 == 0 || (percentage % 5.0) < 0.1 {
                                    info!(
                                        "Download progress: {:.2}% ({} / {} bytes)", 
                                        percentage,
                                        current,
                                        total_bytes
                                    );
                                }
                            };
                            
                            // Create an error handler that logs detailed error information
                            let error_handler = || {
                                info!("Download completed, starting installation");
                            };
                            
                            match update_clone.download_and_install(progress_handler, error_handler).await {
                                Ok(_) => info!("Update installation initiated successfully"),
                                Err(e) => {
                                    error!("Failed to install update: {}", e);
                                    error!("Error details: {:?}", e);
                                    
                                    // Try to get more specific error information
                                    let error_details = format!("{:?}", e);
                                    if error_details.contains("gzip") {
                                        error!("The update package appears to have an invalid compression format (gzip error). The downloaded file may be corrupted or improperly compressed.");
                                    } else if error_details.contains("download") {
                                        error!("There was an error downloading the update. Please check your network connection and try again.");
                                    }
                                }
                            }
                        });
                    },
                    Ok(None) => {
                        info!("Update check completed: no updates available");
                    },
                    Err(e) => {
                        error!("Update check failed: {}", e);
                    }
                }
            });

      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
