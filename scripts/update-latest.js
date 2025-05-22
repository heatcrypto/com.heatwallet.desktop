/**
 * Update Latest Script for Heat Wallet
 * 
 * This script updates the macOS entries in the latest.json file for the Heat Wallet desktop
 * application's auto-update functionality.
 * 
 * How it works with Tauri's update system:
 * 1. The Tauri GitHub Action initially generates a latest.json file with entries for all platforms
 *    (Windows, Linux, macOS) during the build process.
 * 2. However, macOS builds require additional processing (notarization, DMG creation, etc.)
 *    that happens AFTER the initial latest.json is generated.
 * 3. This script runs after those macOS-specific steps to update ONLY the macOS entries
 *    in the existing latest.json file with the correct signatures and URLs.
 * 4. Windows and Linux entries in latest.json are preserved as they were originally generated
 *    by the Tauri action and don't require additional processing.
 * 
 * Tasks performed by this script:
 * 1. Downloads signature files for macOS builds and the latest.json from a GitHub release
 * 2. Reads the macOS signature files (for both ARM and x86 architectures)
 * 3. Updates ONLY the macOS entries in the latest.json file with new download URLs and signatures
 * 4. Uploads the updated latest.json back to the GitHub release
 * 
 * How to invoke:
 * This script is typically run as part of the CI/CD pipeline after a new release is created
 * and after the macOS notarization process is complete.
 * It requires the following environment variables:
 * - VERSION: The version number of the release (e.g., "2.10.18")
 * - BUILD_NUMBER: The build number of the release
 * 
 * Example usage:
 * VERSION=2.10.18 BUILD_NUMBER=42 node scripts/update-latest.js
 * 
 * Note: The GitHub CLI (gh) must be installed and authenticated with appropriate permissions.
 */
// scripts/update-latest.js
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Get version info from environment variables.
const VERSION = process.env.VERSION;
const BUILD_NUMBER = process.env.BUILD_NUMBER;
const RELEASE_TAG = `app-v${VERSION}-build-${BUILD_NUMBER}`;

// Use tar.gz files for auto-updates instead of DMG files
const sigAarch64File = `Heat.Wallet_${VERSION}_aarch64-apple-darwin.tar.gz.sig`;
const sigX86File = `Heat.Wallet_${VERSION}_x86_64-apple-darwin.tar.gz.sig`;
const latestFile = 'latest.json';

// Download assets from the release using gh CLI.
console.log(`Downloading assets for release ${RELEASE_TAG}...`);
execSync(`gh release download "${RELEASE_TAG}" --pattern "${sigAarch64File}"`, { stdio: 'inherit' });
execSync(`gh release download "${RELEASE_TAG}" --pattern "${sigX86File}"`, { stdio: 'inherit' });
execSync(`gh release download "${RELEASE_TAG}" --pattern "latest.json"`, { stdio: 'inherit' });

console.log('Files downloaded:');
console.log(fs.readdirSync('.').join('\n'));

// Read signatures.
const sigAarch64 = fs.readFileSync(sigAarch64File, 'utf8').trim();
const sigX86 = fs.readFileSync(sigX86File, 'utf8').trim();

// Read the existing latest.json.
const latestContent = JSON.parse(fs.readFileSync(latestFile, 'utf8'));

// Update the platforms section for macOS with tar.gz files for auto-updates
latestContent.platforms["darwin-aarch64"] = {
  signature: sigAarch64,
  url: `https://github.com/heatcrypto/com.heatwallet.desktop/releases/download/${RELEASE_TAG}/Heat.Wallet_${VERSION}_aarch64-apple-darwin.tar.gz`
};
latestContent.platforms["darwin-x86_64"] = {
  signature: sigX86,
  url: `https://github.com/heatcrypto/com.heatwallet.desktop/releases/download/${RELEASE_TAG}/Heat.Wallet_${VERSION}_x86_64-apple-darwin.tar.gz`
};

fs.writeFileSync(latestFile, JSON.stringify(latestContent, null, 2));
console.log('latest.json updated successfully.');

// Upload the updated latest.json back to the release.
console.log(`Uploading updated latest.json to release ${RELEASE_TAG}...`);
execSync(`gh release upload "${RELEASE_TAG}" latest.json --clobber`, { stdio: 'inherit' });