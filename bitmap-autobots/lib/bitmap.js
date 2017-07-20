'use strict';

const fs = require('fs');
module.exports = Bitmap;

function Bitmap(filepath) {
  fs.readFile(filepath, (err, buffer) => {
    if (err) throw err;
    this.buffer = buffer;
    readHeader.call(this);

  });

  function readHeader() {
    this.type = this.buffer.toString('utf-8', 0, 2);
    this.size = this.buffer.readInt32LE(2);
    this.reserved1 = this.buffer.readInt32LE(6);
    this.reserved2 = this.buffer.readInt32LE(8);
    this.pixelArrayOffset = this.buffer.readInt32LE(10);
  }
}
