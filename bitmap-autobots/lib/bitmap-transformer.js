'use strict';

const Bitmap = require('./bitmap.js');

module.exports = BitmapTransformer;

function BitmapTransformer(bitmap) {
  this.bitmap = bitmap;

  this.setPixel = function(x, y, color) {
    let pixelOffset = bitmap.pixelArrayByteOffset + y * bitmap.rowSizeInBytes + x * bitmap.bytesPerPixel;
    let colorIndex = bitmap.colors.indexOf(color);

    if (colorIndex === -1) {
      colorIndex = this.addColor(color);
    }

    bitmap.buffer.writeUInt8(colorIndex, pixelOffset);
  };

  this.addColor = function(color) {
    let uniqueColors = {};

    for (let i = 0; i < bitmap.colors.length; i++) {
      let uniqueColor = uniqueColors[bitmap.colors[i].toRGBAString()];

      if (uniqueColor) {
        bitmap.colors[i] = color;
        return i;
      } 
      else {
        uniqueColors[color.toRGBAString()] = bitmap.colors[i];
      }
    }
  };

  this.writeColors = function() {
    let bgraColors = bitmap.colors.map(c => c.toBGRAString()).join('');
    bitmap.buffer.write(bgraColors, bitmap.colorTableOffset, bitmap.colorTableSize, 'hex');
  };
}

Bitmap.prototype.toGrayscale = function() {
  let clone = this.clone();
  let bitmapTransformer = new BitmapTransformer(clone);

  for (let i = 0; i < clone.colors.length; i++) {
    clone.colors[i] = clone.colors[i].toGrayscale();
  }

  bitmapTransformer.writeColors();
  return clone;
};

Bitmap.prototype.toInverse = function() {
  let clone = this.clone();
  let bitmapTransformer = new BitmapTransformer(clone);

  for (let i = 0; i < clone.colors.length; i++) {
    clone.colors[i] = clone.colors[i].toInverse();
  }

  bitmapTransformer.writeColors();
  return clone;
};

Bitmap.prototype.toBlackAndWhite = function() {
  let clone = this.clone();
  let bitmapTransformer = new BitmapTransformer(clone);

  for (let i = 0; i < clone.colors.length; i++) {
    clone.colors[i] = clone.colors[i].toBlackAndWhite();
  }

  bitmapTransformer.writeColors();
  return clone;
};