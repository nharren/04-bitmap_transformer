'use strict';

const fs = require('fs');
const Bitmap = require('./lib/bitmap.js');
require('./lib/bitmap-transformer.js');

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

let loadBitmap = function() {
  return new Promise(function(resolve, reject) {
    fs.readFile(`${__dirname}/assets/palette-bitmap.bmp`, function(err, buffer) {
      if (err) reject(err);
      resolve(new Bitmap(buffer));
    });
  });
};

let createOutput = function(fileName, bitmap, func) {
  return new Promise(function(resolve, reject) {
    let transformedBitmap = func();

    fs.writeFile(fileName, transformedBitmap.buffer, 'binary', function(err) {
      if (err) reject(err);
      resolve(bitmap);
    });
  });
};

checkOutputDirectoryExists()
  .catch(createOutputDirectory)
  .then(loadBitmap, console.error)
  .then(bitmap => createOutput('./output/black-and-white.bmp', bitmap, () => bitmap.toBlackAndWhite()), console.error)
  .then(bitmap => createOutput('./output/grayscale.bmp', bitmap, () => bitmap.toGrayscale()), console.error)
  .then(bitmap => createOutput('./output/inverse-colors.bmp', bitmap, () => bitmap.toInverse()), console.error)
  .then(bitmap => createOutput('./output/flipped-horizontally.bmp', bitmap, () => bitmap.flipHorizontally()), console.error)
  .then(bitmap => createOutput('./output/flipped-vertically.bmp', bitmap, () => bitmap.flipVertically()), console.error)
  .then(bitmap => createOutput('./output/rotate-clockwise.bmp', bitmap, () => bitmap.rotateClockwise()), console.error)
  .then(bitmap => createOutput('./output/rotate-counterclockwise.bmp', bitmap, () => bitmap.rotateCounterclockwise()), console.error)
  .then(bitmap => createOutput('./output/shift-hue.bmp', bitmap, () => bitmap.shiftHue(60)), console.error)
  .then(bitmap => createOutput('./output/shift-saturation.bmp', bitmap, () => bitmap.shiftSaturation(-30)), console.error)
  .then(bitmap => createOutput('./output/shift-lightness.bmp', bitmap, () => bitmap.shiftLightness(20)), console.error);