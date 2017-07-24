'use strict';

const expect = require('chai').expect;
const BitmapTransformer = require('./../lib/bitmap-transformer.js');

describe('Bitmap Transformer', function() {
  describe('#()', () => {
    it('should throw errors if the input is not a bitmap.', () => {
      expect(() => new BitmapTransformer()).to.throw(TypeError);
    });
  });
});
