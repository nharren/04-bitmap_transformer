'use strict';

const expect = require('chai').expect;
const Color = require('./../lib/color.js');

var color = new Color(10, 20, 30, 40);

describe('Color', function() {
  describe('#()', () => {
    it('should throw errors if the input values are not numbers.', () => {
      expect(() => new Color(0, 0)).to.throw(TypeError);
      expect(() => new Color(0)).to.throw(TypeError);
      expect(() => new Color()).to.throw(TypeError);
    });

    it('should throw errors if the input values are out of range.', () => {
      expect(() => new Color(256, 0, 0)).to.throw(RangeError);
      expect(() => new Color(0, 256, 0)).to.throw(RangeError);
      expect(() => new Color(0, 0, 256)).to.throw(RangeError);
    });

    it('should return the correct property values.', () => {
      expect(color).to.have.property('red', 10);
      expect(color).to.have.property('green', 20);
      expect(color).to.have.property('blue', 30);
      expect(color).to.have.property('alpha', 40);
    });
  });

  describe('#getHSL()', () => {
    it('should return the correct property values.', () => {
      color.getHSL();
      expect(color).to.have.property('hue', 210);
      expect(color).to.have.property('saturation', 0.5);
      expect(color).to.have.property('lightness', 0.0784313725490196);
      expect(color).to.have.property('alpha', 40);
    });
  });

  describe('#toBGRAString()', () => {
    it('should return the correct hex value.', () => {
      let bgraString = color.toBGRAString();
      expect(bgraString).to.equal('1e140a28');
    });
  });

  describe('#toRGBAString()', () => {
    it('should return the correct hex value.', () => {
      let rgbaString = color.toRGBAString();
      expect(rgbaString).to.equal('0a141e28');
    });
  });

  describe('#fromRGBAString()', () => {
    it('should return the correct property values.', () => {
      let rgba = Color.fromRGBAString('0a141e28');
      expect(rgba.red).to.equal(10);
      expect(rgba.green).to.equal(20);
      expect(rgba.blue).to.equal(30);
      expect(rgba.alpha).to.equal(40);
    });
  });

  describe('#fromBGRAString()', () => {
    it('should return the correct property values.', () => {
      let bgra = Color.fromBGRAString('1e140a28');
      expect(bgra.red).to.equal(10);
      expect(bgra.green).to.equal(20);
      expect(bgra.blue).to.equal(30);
      expect(bgra.alpha).to.equal(40);
    });
  });

  describe('#fromHSLA()', () => {
    it('should return the correct property values.', () => {
      let hsla = Color.fromHSLA(210, 0.5, 0.0784313725490196, 40);
      expect(hsla.red).to.equal(10);
      expect(hsla.green).to.equal(20);
      expect(hsla.blue).to.equal(30);
      expect(hsla.alpha).to.equal(40);
      expect(hsla.hue).to.equal(210);
      expect(hsla.saturation).to.equal(0.5);
      expect(hsla.lightness).to.equal(0.0784313725490196);
    });
  });
});