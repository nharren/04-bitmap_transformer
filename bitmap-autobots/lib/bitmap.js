'use strict';
// pixel array file offset 1078
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

  function readDibHeader(buffer) {
    this.dibHeaderSize = this.buffer.readUInt32LE(14);
    switch (this.dibHeaderSize) {
      case 12:

        break;
      default:

    }
  }
  function readBitMapCoreHeader(buffer) {
    this.mapCoreHeader = this.buffer.readUInt32LE(14);
    switch (this.mapCoreHeader) {
      case 64:

        break;
      default:

    }
  }
}
