'use strict';

const fs = require('fs');

function Bitmap(filepath) {
  fs.readFile(`${__dirname}/..assets/palette-bitmap.bmp`, function(err, buffer) {
    if (err) throw err;
    console.log(buffer);
    this.buffer = buffer;
    readHeader();
  });

  function readHeader() {
    this.type = buffer.toString('utf-8', 0, 2);
    this.size = buffer.readInt32LE(2);
    this.reserved1 = buffer.readInt32LE(6);
    this.reserved2 = buffer.readInt32LE(8);
    this.fileOffset = buffer.readInt32LE(10);
  };

  function readDibHeader() {

  };
};
