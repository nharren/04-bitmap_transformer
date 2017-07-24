'use strict';

const Color = require('./color');

Color.prototype.invertColors = function() {
  return new Color(255 - this.red, 255 - this.green, 255 - this.blue, this.alpha);
};

Color.prototype.toSepia = function() {
  let red = 0.393 * this.red + 0.769 * this.green + 0.189 * this.blue;
  let green = 0.349 * this.red + 0.686 * this.green + 0.168 * this.blue;
  let blue = 0.272 * this.red + 0.534 * this.green + 0.131 * this.blue;
  return new Color(Math.min(Math.round(red), 255), Math.min(Math.round(green), 255), Math.min(Math.round(blue), 255));
};

Color.prototype.toGrayscale = function() {
  let average = Math.round((this.red + this.green + this.blue) / 3);
  return new Color(average, average, average, this.alpha);
};

Color.prototype.toBlackAndWhite = function() {
  let average = Math.round((this.red + this.green + this.blue) / 3);
  let result = average < 128 ? 0 : 255;
  return new Color(result, result, result, this.alpha);
};

Color.prototype.shiftRedness = function(magnitude) {
  return new Color(Math.max(0, Math.min(255, this.red * magnitude)), this.green, this.blue, this.alpha);
};

Color.prototype.shiftGreenness = function(magnitude) {
  return new Color(this.red, Math.max(0, Math.min(255, this.green * magnitude)), this.blue, this.alpha);
};

Color.prototype.shiftBlueness = function(magnitude) {
  return new Color(this.red, this.green, Math.max(0, Math.min(255, this.blue * magnitude)), this.alpha);
};

Color.prototype.shiftHue = function(degrees) {
  this.getHSL();
  let hue = this.hue + degrees;
  
  if (Math.abs(hue) > 360) {
    hue *= (1 / (hue / 360));
  }

  if (hue < 0) {
    hue += 360;
  }
  
  return Color.fromHSLA(hue, this.saturation, this.lightness, this.alpha);
};

Color.prototype.shiftSaturation = function(percentage) {
  this.getHSL();
  let saturation = Math.min(1, Math.max(0, this.saturation + percentage / 100));
  return Color.fromHSLA(this.hue, saturation, this.lightness, this.alpha);
};

Color.prototype.shiftLightness = function(percentage) {
  this.getHSL();
  let lightness = Math.min(1, Math.max(0, this.lightness + percentage / 100));
  return Color.fromHSLA(this.hue, this.saturation, lightness, this.alpha);
};