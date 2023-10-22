const fs = require('fs');
const path = require('path');
const sourceDir = 'core/src/lib/';
const destinationDir = 'dist/core/styles';

// List of .scss files to be copied
const scssFiles = ['cdk.scss', 'styles.scss', 'sui-angular.scss', 'tailwind.scss'];

// Ensure the destination directory exists, create it if not
if (!fs.existsSync(destinationDir)) {
  fs.mkdirSync(destinationDir, {recursive: true});
}

scssFiles.forEach((file) => {
  const sourceFilePath = path.join(sourceDir, file);
  const destinationFilePath = path.join(destinationDir, file);

  // Check if the source file exists
  if (fs.existsSync(sourceFilePath)) {
    fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
      if (err) {
        console.error(`Error copying ${file}: ${err}`);
      } else {
        console.log(`${file} copied to ${destinationDir}`);
      }
    });
  } else {
    console.error(`Source file ${file} not found.`);
  }
});
