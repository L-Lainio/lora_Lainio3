const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './assets/images';
const outputDir = './optimized-images';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.readdirSync(inputDir).forEach((file) => {
  const inputPath = path.join(inputDir, file);
  const outputPath = path.join(outputDir, file);

  sharp(inputPath)
    .rotate() // auto-orient based on EXIF
    .jpeg({ quality: 80 }) // compress
    .toFile(outputPath)
    .then(() => console.log(`Optimized & stripped: ${file}`))
    .catch((err) => console.error(`Error processing ${file}:`, err));
});
