'use strict';

require('./color-transforms.js');
const Bitmap = require('./bitmap.js');
const BitmapTransformer = require('./bitmap-transformer.js');

Bitmap.prototype.invertColors = function() {
  let clone = this.clone();
  let bitmapTransformer = new BitmapTransformer(clone);

  clone.colors = clone.colors.map(c => c.invertColors());

  bitmapTransformer.writeColors();
  return clone;
};

Bitmap.prototype.toSepia = function() {
  let clone = this.clone();
  let bitmapTransformer = new BitmapTransformer(clone);

  clone.colors = clone.colors.map(c => c.toSepia());

  bitmapTransformer.writeColors();
  return clone;
};

Bitmap.prototype.toGrayscale = function() {
  let clone = this.clone();
  let bitmapTransformer = new BitmapTransformer(clone);

  clone.colors = clone.colors.map(c => c.toGrayscale());

  bitmapTransformer.writeColors();
  return clone;
};

Bitmap.prototype.toBlackAndWhite = function() {
  let clone = this.clone();
  let bitmapTransformer = new BitmapTransformer(clone);

  clone.colors = clone.colors.map(c => c.toBlackAndWhite());

  bitmapTransformer.writeColors();
  return clone;
};

Bitmap.prototype.flipHorizontally = function() {
  let clone = this.clone();
  let bitmapTransformer = new BitmapTransformer(clone);

  for (var i = 0; i < clone.height; i++) {
    clone.pixelArray[i] = clone.pixelArray[i].reverse();  
  }

  bitmapTransformer.writePixels();
  return clone;
};

Bitmap.prototype.flipVertically = function() {
  let clone = this.clone();
  let bitmapTransformer = new BitmapTransformer(clone);

  clone.pixelArray = clone.pixelArray.reverse();

  bitmapTransformer.writePixels();
  return clone;
};

Bitmap.prototype.rotateClockwise = function() {
  let clone = this.clone();
  let bitmapTransformer = new BitmapTransformer(clone);

  for (var y = 0; y < clone.height; y++) {
    for (var x = 0; x < clone.width; x++) {
      bitmapTransformer.writePixel(clone.height - 1 - y, x, clone.pixelArray[y][x]);
    }    
  }

  return clone;
};

Bitmap.prototype.rotateCounterclockwise = function() {
  let clone = this.clone();
  let bitmapTransformer = new BitmapTransformer(clone);

  for (var y = 0; y < clone.height; y++) {
    for (var x = 0; x < clone.width; x++) {
      bitmapTransformer.writePixel(y, clone.width - 1 - x, clone.pixelArray[y][x]);
    }    
  }

  return clone;
};

Bitmap.prototype.shiftHue = function(degrees) {
  let clone = this.clone();
  let bitmapTransformer = new BitmapTransformer(clone);

  clone.colors = clone.colors.map(c => c.shiftHue(degrees));

  bitmapTransformer.writeColors();
  return clone;
};

Bitmap.prototype.shiftSaturation = function(percentage) {
  let clone = this.clone();
  let bitmapTransformer = new BitmapTransformer(clone);

  clone.colors = clone.colors.map(c => c.shiftSaturation(percentage));

  bitmapTransformer.writeColors();
  return clone;
};

Bitmap.prototype.shiftLightness = function(percentage) {
  let clone = this.clone();
  let bitmapTransformer = new BitmapTransformer(clone);

  clone.colors = clone.colors.map(c => c.shiftLightness(percentage));

  bitmapTransformer.writeColors();
  return clone;
};

Bitmap.prototype.shiftRedness = function(magnitude) {
  let clone = this.clone();
  let bitmapTransformer = new BitmapTransformer(clone);

  clone.colors = clone.colors.map(c => c.shiftRedness(magnitude));

  bitmapTransformer.writeColors();
  return clone;
};


Bitmap.prototype.shiftGreenness = function(magnitude) {
  let clone = this.clone();
  let bitmapTransformer = new BitmapTransformer(clone);

  clone.colors = clone.colors.map(c => c.shiftGreenness(magnitude));

  bitmapTransformer.writeColors();
  return clone;
};

Bitmap.prototype.shiftBlueness = function(magnitude) {
  let clone = this.clone();
  let bitmapTransformer = new BitmapTransformer(clone);

  clone.colors = clone.colors.map(c => c.shiftBlueness(magnitude));

  bitmapTransformer.writeColors();
  return clone;
};