'use strict';

const fs = require('fs');
const Bitmap = require('./lib/bitmap.js');

fs.readFile(`${__dirname}/assets/palette-bitmap.bmp`, (err, buffer) => {
  if (err) console.error(err);
  console.log(new Bitmap(buffer));
});