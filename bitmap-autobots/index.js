'use strict';

const fs = require('fs');
const Bitmap = require('./lib/bitmap.js');
require('./lib/bitmap-transforms.js');

let checkOutputDirectoryExists = function() {
  return new Promise(function(resolve, reject) {
    fs.exists('./output/', function(exists) {
      if (exists) {
        resolve();
      }
      else {
        reject();
      }
    });
  });
};

let createOutputDirectory = function() {
  return new Promise(function(resolve, reject) {
    fs.mkdir('./output', function(err) {
      if (err) reject(err);
      resolve();
    });
  });
};

let loadBitmap = function(filename) {
  return new Promise(function(resolve, reject) {
    fs.readFile(filename, function(err, buffer) {
      if (err) reject(err);
      resolve(new Bitmap(buffer));
    });
  });
};

let createOutput = function(fileName, bitmap, func) {
  return new Promise(function(resolve, reject) {
    let transformedBitmap = func();

    fs.writeFile(`./output/${fileName}.bmp`, transformedBitmap.buffer, 'binary', function(err) {
      if (err) reject(err);
      resolve(bitmap);
    });
  });
};

let filePath = process.argv[2];
let transforms = process.argv.slice(3);

if (filePath && transforms) {
  checkOutputDirectoryExists()
    .catch(createOutputDirectory)
    .then(() => loadBitmap(filePath))
    .then(bitmap => {
      while (transforms.length > 0) {
        let transform = transforms.shift();
        let transformParts = transform.split(':');

        switch (transformParts[0]) {
        case 'bw':
          bitmap = bitmap.toBlackAndWhite();
          break;
        case 'hflip':
          bitmap = bitmap.flipHorizontally();
          break;
        case 'vflip':
          bitmap = bitmap.flipVertically();
          break;
        case 'gray':
          bitmap = bitmap.toGrayscale();
          break;
        case 'invert':
          bitmap = bitmap.invertColors();
          break;
        case 'rotc':
          bitmap = bitmap.rotateClockwise();
          break;
        case 'rotcc':
          bitmap = bitmap.rotateCounterclockwise();
          break;
        case 'sepia':
          bitmap = bitmap.toSepia();
          break;
        case 'bshift':
          bitmap = bitmap.shiftBlueness(Number(transformParts[1]));
          break;
        case 'gshift':
          bitmap = bitmap.shiftGreenness(Number(transformParts[1]));
          break;
        case 'rshift':
          bitmap = bitmap.shiftRedness(Number(transformParts[1]));
          break;
        case 'sshift':
          bitmap = bitmap.shiftSaturation(Number(transformParts[1]));
          break;
        case 'hshift':
          bitmap = bitmap.shiftHue(Number(transformParts[1]));
          break;
        case 'lshift':
          bitmap = bitmap.shiftLightness(Number(transformParts[1]));
          break;
        default:
          break;
        }
      }

      createOutput('custom', bitmap, () => bitmap);

    })
    .catch(err => console.error(err));

  return;
}


checkOutputDirectoryExists()
  .catch(createOutputDirectory)
  .then(() => loadBitmap(`${__dirname}/assets/palette-bitmap.bmp`), console.error)
  .then(bitmap => createOutput('black-and-white', bitmap, () => bitmap.toBlackAndWhite()), console.error)
  .then(bitmap => createOutput('grayscale', bitmap, () => bitmap.toGrayscale()), console.error)
  .then(bitmap => createOutput('sepia', bitmap, () => bitmap.toSepia()), console.error)
  .then(bitmap => createOutput('inverted-colors', bitmap, () => bitmap.invertColors()), console.error)
  .then(bitmap => createOutput('flipped-horizontally', bitmap, () => bitmap.flipHorizontally()), console.error)
  .then(bitmap => createOutput('flipped-vertically', bitmap, () => bitmap.flipVertically()), console.error)
  .then(bitmap => createOutput('rotate-clockwise', bitmap, () => bitmap.rotateClockwise()), console.error)
  .then(bitmap => createOutput('rotate-counterclockwise', bitmap, () => bitmap.rotateCounterclockwise()), console.error)
  .then(bitmap => createOutput('shift-hue', bitmap, () => bitmap.shiftHue(60)), console.error)
  .then(bitmap => createOutput('shift-saturation', bitmap, () => bitmap.shiftSaturation(-30)), console.error)
  .then(bitmap => createOutput('shift-lightness', bitmap, () => bitmap.shiftLightness(20)), console.error)
  .then(bitmap => createOutput('shift-redness', bitmap, () => bitmap.shiftRedness(5)), console.error)
  .then(bitmap => createOutput('shift-greenness', bitmap, () => bitmap.shiftGreenness(5)), console.error)
  .then(bitmap => createOutput('shift-blueness', bitmap, () => bitmap.shiftBlueness(5)), console.error);