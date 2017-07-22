'use strict';

const Bitmap = require('./lib/bitmap.js');

let bitmap = new Bitmap(`${__dirname}/assets/palette-bitmap.bmp`);

bitmap.on('loaded', function() {
  console.log(bitmap.colors);
  // console.log(bitmap.height);
  // console.log(bitmap.colorPlanes);
  // console.log(bitmap.bitsPerPixel);
  // console.log(bitmap.compression);
  // console.log(bitmap.size);
  // console.log(bitmap.horizontalResolution);
  // console.log(bitmap.verticalResolution);
  // console.log(bitmap.colorCount);
  // console.log(bitmap.importantColorCount);
});
