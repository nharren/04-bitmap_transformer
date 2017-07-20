'use strict';

const fs = require('fs');
module.exports = Bitmap;

function Bitmap(filepath) {
  fs.readFile(filepath, (err, buffer) => {
    if (err) throw err;
    this.buffer = buffer;
    readHeader.call(this, buffer);
    readColorTable.call(this);

  });

  function readHeader(buffer) {
    this.type = buffer.toString('utf-8', 0, 2);
    this.size = buffer.readInt32LE(2);
    this.reserved1 = buffer.readInt32LE(6);
    this.reserved2 = buffer.readInt32LE(8);
    this.pixelArrayOffset = buffer.readInt32LE(10);
  }

  function readColorTable() {
    this.colors = [];
    var colorTableOffset = 14 + this.dibHeaderSize;
    var colorTableSize = this.colors * 4;
    for(var i = colorTableOffset; i <= colorTableOffset + colorTableSize; i+=4) {
      var colorHexString = this.buffer.toString('hex', i, i + 4);
      this.colors.push(colorHexString);
    }
  }
}
