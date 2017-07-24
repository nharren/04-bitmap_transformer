'use strict';

const Color = require('./color.js');
require('./color-transforms.js');
const Bitmap = require('./bitmap.js');
const BitmapTransformer = require('./bitmap-transformer.js');

Bitmap.prototype.toInverse = function() {
  let clone = this.clone();
  let bitmapTransformer = new BitmapTransformer(clone);

  clone.colors = clone.colors.map(c => c.toInverse());

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
      bitmapTransformer.writePixel(this.height - 1 - y, x, this.pixelArray[y][x]);
    }    
  }

  return clone;
};

Bitmap.prototype.rotateCounterclockwise = function() {
  let clone = this.clone();
  let bitmapTransformer = new BitmapTransformer(clone);

  for (var y = 0; y < clone.height; y++) {
    for (var x = 0; x < clone.width; x++) {
      bitmapTransformer.writePixel(y, this.width - 1 - x, this.pixelArray[y][x]);
    }    
  }

  return clone;
};

Bitmap.prototype.shiftHue = function(degrees) {
  let clone = this.clone();
  let bitmapTransformer = new BitmapTransformer(clone);

  clone.colors = clone.colors.map(c => {
    c.getHSL();
    let hue = c.hue + degrees;
    
    if (Math.abs(hue) > 360) {
      hue *= (1 / (hue / 360));
    }

    if (hue < 0) {
      hue += 360;
    }
    
    return Color.fromHSLA(hue, c.saturation, c.lightness, c.alpha);
  });

  bitmapTransformer.writeColors();
  return clone;
};

Bitmap.prototype.shiftSaturation = function(percentage) {
  let clone = this.clone();
  let bitmapTransformer = new BitmapTransformer(clone);

  clone.colors = clone.colors.map(c => {
    c.getHSL();
    let saturation = Math.min(1, Math.max(0, c.saturation + percentage / 100));
    return Color.fromHSLA(c.hue, saturation, c.lightness, c.alpha);
  });

  bitmapTransformer.writeColors();
  return clone;
};

Bitmap.prototype.shiftLightness = function(percentage) {
  let clone = this.clone();
  let bitmapTransformer = new BitmapTransformer(clone);

  clone.colors = clone.colors.map(c => {
    c.getHSL();
    let lightness = Math.min(1, Math.max(0, c.lightness + percentage / 100));
    return Color.fromHSLA(c.hue, c.saturation, lightness, c.alpha);
  });

  bitmapTransformer.writeColors();
  return clone;
};