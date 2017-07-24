'use strict';

const Color = require('./color.js');

module.exports = Bitmap;

function Bitmap(buffer) {
  this.buffer = buffer;

  readHeader.call(this);
  readBitmapHeader.call(this);
  readColorTable.call(this);
  readPixelArray.call(this);

  this.clone = function() {
    return new Bitmap(Buffer.from(this.buffer));
  };

  this.getPixel = function(x, y) {
    return this.pixelArray[y][x];
  };

  function readHeader() {
    this.type = buffer.toString('utf-8', 0, 2);
    this.size = buffer.readInt32LE(2);
    this.reserved1 = buffer.readInt32LE(6);
    this.reserved2 = buffer.readInt32LE(8);
    this.pixelArrayByteOffset = buffer.readInt32LE(10);
  }

  function readBitmapHeader() {
    this.bitmapHeaderSize = buffer.readUInt32LE(14);

    switch (this.bitmapHeaderSize) {
    case 40:
      readBitmapInfoHeader.call(this, buffer);
      break;
    case 12:
    case 16:
    case 52:
    case 56:
    case 108:
    case 124:
    default:
      throw new Error('The bitmap\'s header type is currently unsupported.');
    }
  }

  function readBitmapInfoHeader() {
    this.width = buffer.readInt32LE(18);
    this.height = buffer.readInt32LE(22);
    this.colorPlanes = buffer.readUInt16LE(26);
    this.bitsPerPixel = buffer.readUInt16LE(28);
    this.compression = buffer.readUInt32LE(30);
    this.size = buffer.readUInt32LE(34);
    this.horizontalResolution = buffer.readInt32LE(38);
    this.verticalResolution = buffer.readInt32LE(42);
    this.colorCount = buffer.readUInt32LE(46);
    this.importantColorCount = buffer.readUInt32LE(50);
  }

  function readColorTable() {
    this.colors = [];
    this.colorTableOffset = 14 + this.bitmapHeaderSize;
    this.colorTableSize = this.colorCount * 4;
    
    for (let i = this.colorTableOffset; i <= this.colorTableOffset + this.colorTableSize; i += 4) {
      let bgraHex = buffer.toString('hex', i, i + 4);
      let color = Color.fromBGRAHex(bgraHex);
      this.colors.push(color);
    }
  }

  function readPixelArray() {    
    this.rowSizeInBytes = Math.ceil(this.bitsPerPixel * this.width / 32) * 4;
    this.bytesPerPixel = this.bitsPerPixel / 8;

    this.pixelArray = [];

    for (let row = this.height - 1; row >= 0; row--) {
      let pixelRow = [];
      let rowOffset = this.pixelArrayByteOffset + row * this.rowSizeInBytes;

      for (let pixel = 0; pixel < this.width; pixel++) {
        let pixelOffset =  rowOffset + pixel * this.bytesPerPixel;
        
        if (this.bitsPerPixel < 16) {
          let colorIndex = buffer.readUInt8(pixelOffset);
          pixelRow.push(this.colors[colorIndex]);
        } else {
          let bgraHex = buffer.toString('hex', pixelOffset, this.bytesPerPixel);
          let color = Color.fromBGRAHex(bgraHex);
          pixelRow.push(color);
        }
      }

      this.pixelArray.push(pixelRow);
    }
  }
}