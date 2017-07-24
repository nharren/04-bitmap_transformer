'use strict';

const expect = require('chai').expect;
const Color = require('./../lib/color.js');
require('./../lib/color-transforms.js');

var color = new Color(10, 20, 30, 40);

describe('Color', function() {
  describe('#toGreyscale()', () => {
    it('should return the correct property values.', () => {
      let grayscale = color.toGrayscale();
      expect(grayscale.red).to.equal(20);
      expect(grayscale.green).to.equal(20);
      expect(grayscale.blue).to.equal(20);
    });
  });

  describe('#invertColors()', () => {
    it('should return the correct property values.', () => {
      let inverse = color.invertColors();
      expect(inverse.red).to.equal(245);
      expect(inverse.green).to.equal(235);
      expect(inverse.blue).to.equal(225);
    });
  });

  describe('#toBlackAndWhite()', () => {
    it('should return the correct property values.', () => {
      let blackAndWhite = color.toBlackAndWhite();
      expect(blackAndWhite.red).to.equal(0);
      expect(blackAndWhite.green).to.equal(0);
      expect(blackAndWhite.blue).to.equal(0);
    });
  });
});