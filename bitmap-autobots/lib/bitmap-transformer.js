'use strict';

const bitmap = require('./lib/bitmap.js');

createBitmap(`${__dirname}/assets/palette-bitmap.bmp`, function(err, bitmap) {
  console.log(bitmap);
});

function invert(colors) {
  for (var i = 0; i < colors.length; i++) {
    var color = colors[i];
    var r = 255-parseInt(color.slice(0, 2), 16);
    var g = 255-parseInt(color.slice(2, 4), 16);
    var b = 255-parseInt(color.slice(4, 6), 16);
    var a = 255-parseInt(color.slice(6, 8), 16);

    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    a = a.toString(16);

    colors[i] = (r+g+b+a);

  }
  return colors;
}

function grayscale(colors) {
  for (var i = 0; i < colors.length; i++) {
    var color = colors[i];
    var r = parseInt(color.slice(0, 2), 16);
    var g = parseInt(color.slice(2, 4), 16);
    var b = parseInt(color.slice(4, 6), 16);
    var a = parseInt(color.slice(6, 8), 16);

    r,g,b = (r+g+b)/3;

    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    a = a.toString(16);

    colors[i] =(r+g+b+a);

  }
  return colors;
}

}
