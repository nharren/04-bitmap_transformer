'use strict';

const fs = require('fs');
const Bitmap = require('./lib/bitmap.js');
require('./lib/bitmap-transformer.js');

fs.readFile(`${__dirname}/assets/palette-bitmap.bmp`, (err, buffer) => {
  if (err) console.error(err);

  let bitmap = new Bitmap(buffer);

  let bw = bitmap.toBlackAndWhite();

  fs.writeFile('./black-and-white.bmp', bw.buffer, 'binary', function(err) {
    if (err) console.error(err);
  });

  let gs = bitmap.toGrayscale();
  
  fs.writeFile('./greyscale.bmp', gs.buffer, 'binary', function(err) {
    if (err) console.error(err);
  });

  let inv = bitmap.toInverse();
  
  fs.writeFile('./inverse.bmp', inv.buffer, 'binary', function(err) {
    if (err) console.error(err);
  });
});