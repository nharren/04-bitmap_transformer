'use strict';

module.exports = Color;

function Color(red, green, blue, alpha = 0) {
  this.red = red;
  this.green = green;
  this.blue = blue;
  this.alpha = alpha;

  this.getHSL = function() {
    let redness = this.red / 255;
    let greenness = this.green / 255;
    let blueness = this.blue / 255;

    let min = Math.min(redness, greenness, blueness);
    let max = Math.max(redness, greenness, blueness);
    let difference = max - min;

    this.hue = difference;
    this.saturation = difference;
    this.lightness = (min + max) / 2;

    if (difference === 0) {
      this.saturation = 0;
      this.hue = 0;
    } else {
      this.saturation = difference / (1 - Math.abs(2 * this.lightness - 1));
      switch (max) {
      case redness:
        this.hue = Math.round(60 * (((greenness - blueness) / difference) % 6));
        break;
      case greenness:
        this.hue = Math.round(60 * (((blueness - redness) / difference) + 2));
        break;
      case blueness:
        this.hue = Math.round(60 * (((redness - greenness) / difference) + 4));
        break;
      }

      if (this.hue < 0) {
        this.hue += 360;
      }
    }
  };

  this.toBGRAString = function() {
    return toPaddedHex(blue) + toPaddedHex(green) + toPaddedHex(red) + toPaddedHex(alpha);
  };

  this.toRGBAString = function() {
    return toPaddedHex(red) + toPaddedHex(green) + toPaddedHex(blue) + toPaddedHex(alpha);
  };

  this.toGrayscale = function() {
    let average = Math.round((this.red + this.green + this.blue) / 3);
    return new Color(average, average, average, this.alpha);
  };

  this.toInverse = function() {
    return new Color(255 - this.red, 255 - this.green, 255 - this.blue, this.alpha);
  };

  this.toBlackAndWhite = function() {
    let average = Math.round((this.red + this.green + this.blue) / 3);
    let result = average < 128 ? 0 : 255;

    return new Color(result, result, result, this.alpha);
  };

  function toPaddedHex(channel) {
    channel = channel.toString(16);

    if (channel.length === 1) {
      return '0' + channel;
    }

    return channel;
  }
}

Color.fromRGBAHex = function(rgbaHex) {
  let red = parseInt(rgbaHex.slice(0, 2), 16);
  let green = parseInt(rgbaHex.slice(2, 4), 16);
  let blue = parseInt(rgbaHex.slice(4, 6), 16);
  let alpha = parseInt(rgbaHex.slice(6, 8), 16);

  return new Color(red, green, blue, alpha);
};

Color.fromBGRAHex = function(rgbaHex) {
  let blue = parseInt(rgbaHex.slice(0, 2), 16);
  let green = parseInt(rgbaHex.slice(2, 4), 16);
  let red = parseInt(rgbaHex.slice(4, 6), 16);
  let alpha = parseInt(rgbaHex.slice(6, 8), 16);

  return new Color(red, green, blue, alpha);
};

Color.fromHSLA = function(hue, saturation, lightness, alpha = 0) {
  let chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  let h = hue / 60;
  let x = chroma * (1 - Math.abs(h % 2 - 1));

  let red = 0;
  let green = 0;
  let blue = 0;

  if (0 <= h && h <= 1) {
    red = chroma;
    green = x;
  } else if (1 <= h && h <= 2) {
    red = x;
    green = chroma;
  } else if (2 <= h && h <= 3) {
    green = chroma;
    blue = x;
  } else if (3 <= h && h <= 4) {
    green = x;
    blue = chroma;
  } else if (4 <= h && h <= 5) {
    red = x;
    blue = chroma;
  } else if (5 <= h && h <= 6) {
    red = chroma;
    blue = x;
  }

  let m = lightness - 0.5 * chroma;

  red = Math.round((red + m) * 255);
  green = Math.round((green + m) * 255);
  blue = Math.round((blue + m) * 255);

  let color = new Color(red, green, blue, alpha);
  color.hue = hue;
  color.saturation = saturation;
  color.lightness = lightness;

  return color;
};