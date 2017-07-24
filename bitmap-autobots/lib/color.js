'use strict';

module.exports = Color;

function Color(red, green, blue, alpha) {
  this.red = red;
  this.green = green;
  this.blue = blue;
  this.alpha = alpha;

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