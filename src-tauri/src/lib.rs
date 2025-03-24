// use serde::{Deserialize, Serialize};
// use std::sync::Mutex;
// use once_cell::sync::Lazy;
// use tauri::Manager;

// // Define the structure to hold update information.
// #[derive(Debug, Clone, Serialize, Deserialize)]
// pub struct UpdateInfo {
//   pub available: bool,
//   pub version: String,
//   pub notes: String,
//   pub download_url: String,
// }

// // Define a structure for our shared state.
// pub struct SharedState {
//   pub app_loaded: bool,
//   pub update_info: Option<UpdateInfo>,
// }

// // Create a global shared state, protected by a Mutex.
// pub static SHARED_STATE: Lazy<Mutex<SharedState>> = Lazy::new(|| {
//   Mutex::new(SharedState {
//     app_loaded: false,
//     update_info: None,
//   })
// });

// /// Tauri command for the Flutter app to signal that it loaded successfully.
// #[tauri::command]
// fn set_app_loaded() {
//   let mut state = SHARED_STATE.lock().unwrap();
//   state.app_loaded = true;
//   println!("App has signaled that it loaded successfully.");
// }

// /// Tauri command for retrieving update information.
// /// The Flutter app can call this to show an in-app update banner.
// #[tauri::command]
// fn get_update_info() -> Option<UpdateInfo> {
//   let state = SHARED_STATE.lock().unwrap();
//   state.update_info.clone()
// }

// /// The main entry point for the Tauri app.
// #[cfg_attr(mobile, tauri::mobile_entry_point)]
// pub fn run() {
//   tauri::Builder::default()
//     // Your existing plugins.
//     .plugin(tauri_plugin_updater::Builder::new().build())
//     .plugin(tauri_plugin_dialog::init())
//     .plugin(tauri_plugin_process::init())
//     // Register our custom commands.
//     .invoke_handler(tauri::generate_handler![set_app_loaded, get_update_info])
//     .setup(|app| {
//       if cfg!(debug_assertions) {
//         app.handle().plugin(
//           tauri_plugin_log::Builder::default()
//             .level(log::LevelFilter::Info)
//             .build(),
//         )?;
//       }

//       // Spawn a background thread that waits 30 seconds to perform an update check.
//       let app_handle = app.handle();
//       std::thread::spawn(move || {
//         std::thread::sleep(std::time::Duration::from_secs(30));
//         // In a real app, call your updater logic here.
//         // For demonstration, we simulate an available update.
//         let simulated_update = UpdateInfo {
//           available: true,
//           version: "2.6.18".to_string(),
//           notes: "A critical update is available. Please update your app.".to_string(),
//           download_url: "https://github.com/heatcrypto/com.heatwallet.desktop/releases/download/app-v2.6.16-build-26/Heat.Wallet_2.6.16_x86_64-apple-darwin.dmg".to_string(),
//         };

//         let mut state = SHARED_STATE.lock().unwrap();
//         state.update_info = Some(simulated_update.clone());

//         // If the Flutter part hasn't signaled that it loaded, show a native dialog.
//         if !state.app_loaded {
//           if let Some(window) = app_handle.get_window("main") {
//             tauri::api::dialog::message(
//               Some(&window),
//               "Update Available",
//               format!(
//                 "A new version {} is available.\n\n{}",
//                 simulated_update.version, simulated_update.notes
//               ),
//             );
//           }
//         }
//       });

//       Ok(())
//     })
//     .run(tauri::generate_context!())
//     .expect("error while running tauri application");
// }


#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_updater::Builder::new().build())
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_process::init())  
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
