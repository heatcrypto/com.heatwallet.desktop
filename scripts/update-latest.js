// scripts/update-latest.js
const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Get version info from environment variables.
const VERSION = process.env.VERSION;
const BUILD_NUMBER = process.env.BUILD_NUMBER;
const RELEASE_TAG = `app-v${VERSION}-build-${BUILD_NUMBER}`;

const sigAarch64File = `Heat.Wallet_${VERSION}_aarch64-apple-darwin.dmg.sig`;
const sigX86File = `Heat.Wallet_${VERSION}_x86_64-apple-darwin.dmg.sig`;
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

// Update the platforms section for macOS.
latestContent.platforms["darwin-aarch64"] = {
  signature: sigAarch64,
  url: `https://github.com/heatcrypto/com.heatwallet.desktop/releases/download/${RELEASE_TAG}/Heat.Wallet_${VERSION}_aarch64-apple-darwin.dmg`
};
latestContent.platforms["darwin-x86_64"] = {
  signature: sigX86,
  url: `https://github.com/heatcrypto/com.heatwallet.desktop/releases/download/${RELEASE_TAG}/Heat.Wallet_${VERSION}_x86_64-apple-darwin.dmg`
};

fs.writeFileSync(latestFile, JSON.stringify(latestContent, null, 2));
console.log('latest.json updated successfully.');

// Upload the updated latest.json back to the release.
console.log(`Uploading updated latest.json to release ${RELEASE_TAG}...`);
execSync(`gh release upload "${RELEASE_TAG}" latest.json --clobber`, { stdio: 'inherit' });
