'use strict';

const expect = require('chai').expect;
const Bitmap = require('../lib/bitmap.js');

describe('Bitmap', function() {
  before(function(done) {
    this.bitmap = new Bitmap(`${__dirname}/../assets/palette-bitmap.bmp`);
    this.bitmap.on('loaded', function() {
      done();
    });
  });
  // describe('with improper file paths', function() {
  //   it('should return an error', function() {
  //     new Bitmap(`${__dirname}/non-existant-path.js`, function(err) {
  //       expect(!!err).to.equal(true);
  //     });
  //   });
  // });
  // 
  // describe('with proper file paths', function() {
  //   it('should give the correct file', function() {
  //     new Bitmap(`${__dirname}/..lib/bitmap.js`, function(succ) {
  //       expect(succ).to.equal(true);
  //     });
  //   });
  // });

  describe('with proper header key value pairs', function() {
    it('should return these pairs', function() {
      expect(this.bitmap.type).to.equal('BM');
      expect(this.bitmap.size).to.equal(10000);
      expect(this.bitmap.reserved1).to.equal(0);
      expect(this.bitmap.reserved2).to.equal(70647808);
      expect(this.bitmap.pixelArrayByteOffset).to.equal(1078);
    });
  });

  describe('with a proper bitmap header', function() {
    it('should return this value', function() {
      expect(this.bitmap.bitmapHeaderSize).to.equal(40);
    });
  });

  describe('with a proper bitmap header', function() {
    it('should return these values', function() {
      expect(this.bitmap.width).to.equal(100);
      expect(this.bitmap.height).to.equal(100);
      expect(this.bitmap.colorPlanes).to.equal(1);
      expect(this.bitmap.bitsPerPixel).to.equal(8);
      expect(this.bitmap.compression).to.equal(0);
      expect(this.bitmap.size).to.equal(10000);
      expect(this.bitmap.horizontalResolution).to.equal(2834);
      expect(this.bitmap.verticalResolution).to.equal(2834);
      expect(this.bitmap.colorCount).to.equal(256);
      expect(this.bitmap.importantColorCount).to.equal(256);
    });
  });

  describe('with a proper color table', function() {
    it('should return these values', function() {
      expect(this.bitmap.colors[1]).to.equal('22203400');
    });
  });
});
