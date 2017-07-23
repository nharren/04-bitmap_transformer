'use strict';

const Bitmap = require('./bitmap.js');
const Color = require('./color.js');

module.exports = BitmapTransformer;

function BitmapTransformer(bitmap) {
  this.bitmap = bitmap;


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

  this.writePixels = function() {
    for (var y = 0; y < bitmap.height; y++) {
      for (var x = 0; x < bitmap.width; x++) {
        this.writePixel(x, y, bitmap.pixelArray[y][x]);
      }    
    }
  };

  this.writePixel = function(x, y, color) {
    let pixelOffset = bitmap.pixelArrayOffset + (bitmap.height - 1 - y) * bitmap.rowSizeInBytes + x * bitmap.bytesPerPixel;
    let colorIndex = bitmap.colors.indexOf(color);

    if (colorIndex === -1) {
      colorIndex = this.addColor(color);
    }

    bitmap.buffer.writeUInt8(colorIndex, pixelOffset);
  };
}

Bitmap.prototype.toGrayscale = function() {
  let clone = this.clone();
  let bitmapTransformer = new BitmapTransformer(clone);

  clone.colors = clone.colors.map(c => c.toGrayscale());

  bitmapTransformer.writeColors();
  return clone;
};

Bitmap.prototype.toInverse = function() {
  let clone = this.clone();
  let bitmapTransformer = new BitmapTransformer(clone);

  clone.colors = clone.colors.map(c => c.toInverse());

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