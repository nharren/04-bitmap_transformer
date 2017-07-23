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

    fs.writeFile(`./output/${fileName}.bmp`, transformedBitmap.buffer, 'binary', function(err) {
      if (err) reject(err);
      resolve(bitmap);
    });
  });
};

checkOutputDirectoryExists()
  .catch(createOutputDirectory)
  .then(loadBitmap, console.error)
  .then(bitmap => createOutput('black-and-white', bitmap, () => bitmap.toBlackAndWhite()), console.error)
  .then(bitmap => createOutput('grayscale', bitmap, () => bitmap.toGrayscale()), console.error)
  .then(bitmap => createOutput('inverse-colors', bitmap, () => bitmap.toInverse()), console.error)
  .then(bitmap => createOutput('flipped-horizontally', bitmap, () => bitmap.flipHorizontally()), console.error)
  .then(bitmap => createOutput('flipped-vertically', bitmap, () => bitmap.flipVertically()), console.error)
  .then(bitmap => createOutput('rotate-clockwise', bitmap, () => bitmap.rotateClockwise()), console.error)
  .then(bitmap => createOutput('rotate-counterclockwise', bitmap, () => bitmap.rotateCounterclockwise()), console.error)
  .then(bitmap => createOutput('shift-hue', bitmap, () => bitmap.shiftHue(60)), console.error)
  .then(bitmap => createOutput('shift-saturation', bitmap, () => bitmap.shiftSaturation(-30)), console.error)
  .then(bitmap => createOutput('shift-lightness', bitmap, () => bitmap.shiftLightness(20)), console.error);