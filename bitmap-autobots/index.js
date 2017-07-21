'use strict';

const createBitmap = require('./lib/bitmap.js');

createBitmap(`${__dirname}/assets/palette-bitmap.bmp`, function(err, bitmap) {
  console.log(bitmap);
});