'use strict';

const fs = require('fs');
const expect = require('chai').expect;
const Bitmap = require('./../lib/bitmap.js');

var bitmap;

describe('Bitmap', function() {
  before(done => {
    fs.readFile(`${__dirname}/../assets/palette-bitmap.bmp`, function(err, buffer) {
      if (err) throw err;
      bitmap = new Bitmap(buffer);
      done();
    });
  });

  describe('#()', () => {
    it('should throw error if no buffer provided.', () => {
      expect(() => new Bitmap()).to.throw(ReferenceError);
    });
  });

  describe('#readHeader()', () => {
    it('should return the correct property values.', () => {
      expect(bitmap).to.have.property('type', 'BM');
      expect(bitmap).to.have.property('size', 10000);
      expect(bitmap).to.have.property('reserved1', 0);
      expect(bitmap).to.have.property('reserved2', 70647808);
      expect(bitmap).to.have.property('pixelArrayOffset', 1078);
    });
  });

  describe('#readBitmapHeader()', () => {
    it('should return the correct property values.', () => {
      expect(bitmap).to.have.property('bitmapHeaderSize', 40);
    });
  });

  describe('#readBitmapInfoHeader()', () => {
    it('should return the correct property values.', () => {
      expect(bitmap).to.have.property('width', 100);
      expect(bitmap).to.have.property('height', 100);
      expect(bitmap).to.have.property('colorPlanes', 1);
      expect(bitmap).to.have.property('bitsPerPixel', 8);
      expect(bitmap).to.have.property('compression', 0);
      expect(bitmap).to.have.property('horizontalResolution', 2834);
      expect(bitmap).to.have.property('verticalResolution', 2834);
      expect(bitmap).to.have.property('colorCount', 256);
      expect(bitmap).to.have.property('importantColorCount', 256);
    });
  });

  describe('#readColorTable()', () => {
    it('should return the correct property values.', () => {
      expect(bitmap).to.have.property('colors');
      expect(bitmap.colors.length).to.equal(256);
      expect(bitmap).to.have.property('colorTableOffset', 54);
      expect(bitmap).to.have.property('colorTableSize', 1024);
    });
  });

  describe('#readPixelArray()', () => {
    it('should return the correct property values.', () => {
      expect(bitmap).to.have.property('pixelRowSize', 100);
      expect(bitmap).to.have.property('bytesPerPixel', 1);
      expect(bitmap).to.have.property('pixelArray');
      expect(bitmap.pixelArray.length).to.equal(100);
    });
  });
});
