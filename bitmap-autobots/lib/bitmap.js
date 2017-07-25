'use strict';

require('./buffer-extensions.js');
const Color = require('./color.js');

module.exports = Bitmap;

function Bitmap(buffer) {
  if (!buffer) throw new ReferenceError('buffer cannot be undefined.');

  this.buffer = buffer;

  readHeader.call(this);
  readBitmapHeader.call(this);
  readColorTable.call(this);
  readPixelArray.call(this);
}

Bitmap.prototype.clone = function() {
  return new Bitmap(Buffer.from(this.buffer));
};

function readHeader() {
  this.type = this.buffer.toString('utf-8', 0, 2);
  this.size = this.buffer.readInt32(2);
  this.reserved1 = this.buffer.readInt32(6);
  this.reserved2 = this.buffer.readInt32(8);
  this.pixelArrayOffset = this.buffer.readInt32(10);
}

function readBitmapHeader() {
  this.bitmapHeaderSize = this.buffer.readUInt32(14);

  if (this.bitmapHeaderSize === 12) {
    readBitmapCoreHeader.call(this);
    return;
  }

  this.colorPlanes = this.buffer.readUInt16(26);
  this.bitsPerPixel = this.buffer.readUInt16(28);
  this.compression = this.buffer.readUInt32(30);
  this.size = this.buffer.readUInt32(34);
  this.colorCount = this.buffer.readUInt32(46);
  this.importantColorCount = this.buffer.readUInt32(50);

  if (this.bitmapHeaderSize === 16 || this.bitmapHeaderSize === 64) {
    readOS22BitmapHeader.call(this);
    return;
  }
  
  this.width = this.buffer.readInt32(18);
  this.height = this.buffer.readInt32(22);
  this.horizontalResolution = this.buffer.readInt32(38);
  this.verticalResolution = this.buffer.readInt32(42);
  
  if (this.bitmapHeaderSize === 40) {
    return;
  } 

  this.redMask = this.buffer.readUInt32(54);
  this.greenMask = this.buffer.readUInt32(58);
  this.blueMask = this.buffer.readUInt32(62);
  this.alphaMask = this.buffer.readUInt32(66);
  this.colorSpaceType = this.buffer.readUInt32(70);
  this.endpoints = getCIEXYZTriple(this.buffer.slice(74, 110));
  this.gammaRed = this.buffer.readUInt32(110);
  this.gammaGreen = this.buffer.readUInt32(114);
  this.gammaBlue = this.buffer.readUInt32(118);
  this.intent = this.buffer.readUInt32(122);
  this.profileData = this.buffer.readUInt32(126);
  this.profileSize = this.buffer.readUInt32(130);
  this.reserved = this.buffer.readUInt32(134);
}

function readBitmapCoreHeader() {
  this.width = this.buffer.readUInt16(18);
  this.height = this.buffer.readUInt16(20);
  this.colorPlanes = this.buffer.readUInt16(22);
  this.bitsPerPixel = this.buffer.readUInt16(24);
}

function readOS22BitmapHeader() {
  this.width = this.buffer.readUInt32(18);
  this.height = this.buffer.readUInt32(22);
  this.horizontalResolution = this.buffer.readUInt32(38);
  this.verticalResolution = this.buffer.readUInt32(42);

  let short = this.bitmapHeaderSize == 16;

  this.resolutionUnit = short ? 0 : this.buffer.readUInt16(54);
  this.reserved = short ? 0 : this.buffer.readUInt16(56);
  this.orientation = short ? 0 : this.buffer.readUInt16(58);
  this.halftoning = short ? 0 : this.buffer.readUInt16(60);
  this.halftoneSize1 = short ? 0 : this.buffer.readUInt32(62);
  this.halftoneSize2 = short ? 0 : this.buffer.readUInt32(66);
  this.colorSpace = short ? 0 : this.buffer.readUInt32(70);
  this.appData = short ? 0 : this.buffer.readUInt32(74);
}

function getCIEXYZTriple(buffer) {
  let red = new CIEXYZ(buffer.readFloat(0), buffer.readFloat(4), buffer.readFloat(8));
  let green = new CIEXYZ(buffer.readFloat(12), buffer.readFloat(16), buffer.readFloat(20));
  let blue = new CIEXYZ(buffer.readFloat(24), buffer.readFloat(28), buffer.readFloat(32));

  return new CIEXYZTriple(red, green, blue);
}

function CIEXYZ(x, y, z) {
  this.x = x;
  this.y = y;
  this.z = z;
}

function CIEXYZTriple(red, green, blue) {
  this.red = red;
  this.green = green;
  this.blue = blue;
}

function readColorTable() {
  this.colors = [];
  this.colorTableOffset = 14 + this.bitmapHeaderSize;
  this.colorTableSize = this.colorCount * 4;
  
  for (let i = this.colorTableOffset; i < this.colorTableOffset + this.colorTableSize; i += 4) {
    let bgraHex = this.buffer.toString('hex', i, i + 4);
    let color = Color.fromBGRAString(bgraHex);
    this.colors.push(color);
  }
}

function readPixelArray() {    
  this.pixelRowSize = Math.ceil(this.bitsPerPixel * this.width / 32) * 4;
  this.bytesPerPixel = this.bitsPerPixel / 8;

  this.pixelArray = [];

  for (let row = this.height - 1; row >= 0; row--) {
    let pixelRow = [];
    let rowOffset = this.pixelArrayOffset + row * this.pixelRowSize;

    for (let pixel = 0; pixel < this.width; pixel++) {
      let pixelOffset =  rowOffset + pixel * this.bytesPerPixel;
      
      if (this.bitsPerPixel < 16) {
        let colorIndex = this.buffer.readUInt8(pixelOffset);
        pixelRow.push(this.colors[colorIndex]);
      } else {
        let bgraHex = this.buffer.toString('hex', pixelOffset, this.bytesPerPixel);
        let color = Color.fromBGRAString(bgraHex);
        pixelRow.push(color);
      }
    }

    this.pixelArray.push(pixelRow);
  }
}