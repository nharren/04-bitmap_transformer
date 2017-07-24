'use strict';

const Color = require('./color');

Color.prototype.toInverse = function() {
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