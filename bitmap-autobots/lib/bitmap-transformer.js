'use strict';

const Bitmap = require('./bitmap.js');

module.exports = BitmapTransformer;

function BitmapTransformer(bitmap) {
  if (!(bitmap instanceof Bitmap)) {
    throw new TypeError('The input is not a bitmap.');
  }

  this.bitmap = bitmap;
}

BitmapTransformer.prototype.addColor = function(color) {
  let uniqueColors = {};

  for (let i = 0; i < this.bitmap.colors.length; i++) {
    let uniqueColor = uniqueColors[this.bitmap.colors[i].toRGBAString()];

    if (uniqueColor) {
      this.bitmap.colors[i] = color;
      return i;
    } 
    else {
      uniqueColors[color.toRGBAString()] = this.bitmap.colors[i];
    }
  }
};

BitmapTransformer.prototype.writeColors = function() {
  let bgraColors = this.bitmap.colors.map(c => c.toBGRAString()).join('');
  this.bitmap.buffer.write(bgraColors, this.bitmap.colorTableOffset, this.bitmap.colorTableSize, 'hex');
};

BitmapTransformer.prototype.writePixels = function() {
  for (var y = 0; y < this.bitmap.height; y++) {
    for (var x = 0; x < this.bitmap.width; x++) {
      this.writePixel(x, y, this.bitmap.pixelArray[y][x]);
    }    
  }
};

BitmapTransformer.prototype.writePixel = function(x, y, color) {
  let pixelOffset = this.bitmap.pixelArrayOffset + (this.bitmap.height - 1 - y) * this.bitmap.pixelRowSize + x * this.bitmap.bytesPerPixel;

  let colorIndex = -1;

  for (var i = 0; i < this.bitmap.colors.length; i++) {
    let matchesRed = this.bitmap.colors[i].red === color.red;
    let matchesGreen = this.bitmap.colors[i].green === color.green;
    let matchesBlue = this.bitmap.colors[i].blue === color.blue;

    if (matchesRed && matchesGreen && matchesBlue) {
      colorIndex = i;
      break;
    }
  }

  if (colorIndex === -1) {
    colorIndex = this.addColor(color);
  }

  this.bitmap.buffer.writeUInt8(colorIndex, pixelOffset);
};