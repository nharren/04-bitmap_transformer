'use strict';

const fs = require('fs');
module.exports = Bitmap;

function Bitmap(filepath) {
  fs.readFile(filepath, (err, buffer) => {
    if (err) throw err;
    this.buffer = buffer;
    readHeader.call(this, buffer);
    readColorTable.call(this);
    readPixelArray.call(this);
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

  function readPixelArray() {
    let pixelRowSize = ((this.bitsPerPixel * this.width + 31) / 32) * 4;
    let pixelArraySize = this.pixelRowSize * Math.abs(this.height);

    let pixelData = this.buffer.slice(this.pixelArrayOffset, pixelArraySize);
    this.pixelArray = [];

    for (var i = this.height; i >= 0; i--) {
      let pixelRow = [];
      let pixelRowData = pixelData.slice(pixelRowSize * i, pixelRowSize);

      for (var j = 0; j < pixelRowSize; j += this.bitsPerPixel) {
        var pixel = pixelRowData.toString('hex', j, j + this.bitsPerPixel);
        pixelRow.push(pixel);
      }
      
      this.pixelArray.push(pixelRow);
    }
  }
}
