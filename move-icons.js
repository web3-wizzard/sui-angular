const fs = require('fs-extra');
const sourceDir = 'core/src/lib/components/wallet-button/icons';
const destinationDir = 'dist/core/assets';

// Ensure the destination directory exists, create it if not
if (!fs.existsSync(destinationDir)) {
  fs.mkdirpSync(destinationDir); // Use mkdirpSync to create directories recursively
}

// Check if the source directory exists
if (fs.existsSync(sourceDir)) {
  try {
    fs.copySync(sourceDir, destinationDir);
    console.log(`Copied from ${sourceDir} to ${destinationDir}`);
  } catch (err) {
    console.error(`Error copying: ${err}`);
  }
} else {
  console.error(`Source folder not found.`);
}
