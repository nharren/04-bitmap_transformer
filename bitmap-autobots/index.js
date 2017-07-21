'use strict';

const Bitmap = require('./lib/bitmap.js');

let bitmap = new Bitmap(`${__dirname}/assets/palette-bitmap.bmp`);

bitmap.on('loaded', function() {
  console.log(bitmap.width);
});
