'use strict';

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
  this.size = this.buffer.readInt32LE(2);
  this.reserved1 = this.buffer.readInt32LE(6);
  this.reserved2 = this.buffer.readInt32LE(8);
  this.pixelArrayOffset = this.buffer.readInt32LE(10);
}

function readBitmapHeader() {
  this.bitmapHeaderSize = this.buffer.readUInt32LE(14);

  if (this.bitmapHeaderSize === 12) {
    readBitmapCoreHeader.call(this);
    return;
  }

  this.colorPlanes = this.buffer.readUInt16LE(26);
  this.bitsPerPixel = this.buffer.readUInt16LE(28);
  this.compression = this.buffer.readUInt32LE(30);
  this.size = this.buffer.readUInt32LE(34);
  this.colorCount = this.buffer.readUInt32LE(46);
  this.importantColorCount = this.buffer.readUInt32LE(50);

  if (this.bitmapHeaderSize === 16 || this.bitmapHeaderSize === 64) {
    readOS22BitmapHeader.call(this);
    return;
  }
  
  this.width = this.buffer.readInt32LE(18);
  this.height = this.buffer.readInt32LE(22);
  this.horizontalResolution = this.buffer.readInt32LE(38);
  this.verticalResolution = this.buffer.readInt32LE(42);
  
  if (this.bitmapHeaderSize === 40) {
    return;
  } 

  this.redMask = this.buffer.readUInt32LE(54);
  this.greenMask = this.buffer.readUInt32LE(58);
  this.blueMask = this.buffer.readUInt32LE(62);
  this.alphaMask = this.buffer.readUInt32LE(66);
  this.colorSpaceType = this.buffer.readUInt32LE(70);
  this.endpoints = getCIEXYZTriple(this.buffer.slice(74, 110));
  this.gammaRed = this.buffer.readUInt32LE(110);
  this.gammaGreen = this.buffer.readUInt32LE(114);
  this.gammaBlue = this.buffer.readUInt32LE(118);
  this.intent = this.buffer.readUInt32LE(122);
  this.profileData = this.buffer.readUInt32LE(126);
  this.profileSize = this.buffer.readUInt32LE(130);
  this.reserved = this.buffer.readUInt32LE(134);
}

function readBitmapCoreHeader() {
  this.width = this.buffer.readUInt16LE(18);
  this.height = this.buffer.readUInt16LE(20);
  this.colorPlanes = this.buffer.readUInt16LE(22);
  this.bitsPerPixel = this.buffer.readUInt16LE(24);
}

function readOS22BitmapHeader() {
  this.width = this.buffer.readUInt32LE(18);
  this.height = this.buffer.readUInt32LE(22);
  this.horizontalResolution = this.buffer.readUInt32LE(38);
  this.verticalResolution = this.buffer.readUInt32LE(42);

  let short = this.bitmapHeaderSize == 16;

  this.resolutionUnit = short ? 0 : this.buffer.readUInt16LE(54);
  this.reserved = short ? 0 : this.buffer.readUInt16LE(56);
  this.orientation = short ? 0 : this.buffer.readUInt16LE(58);
  this.halftoning = short ? 0 : this.buffer.readUInt16LE(60);
  this.halftoneSize1 = short ? 0 : this.buffer.readUInt32LE(62);
  this.halftoneSize2 = short ? 0 : this.buffer.readUInt32LE(66);
  this.colorSpace = short ? 0 : this.buffer.readUInt32LE(70);
  this.appData = short ? 0 : this.buffer.readUInt32LE(74);
}

function getCIEXYZTriple(buffer) {
  let red = new CIEXYZ(buffer.readFloatLE(0), buffer.readFloatLE(4), buffer.readFloatLE(8));
  let green = new CIEXYZ(buffer.readFloatLE(12), buffer.readFloatLE(16), buffer.readFloatLE(20));
  let blue = new CIEXYZ(buffer.readFloatLE(24), buffer.readFloatLE(28), buffer.readFloatLE(32));

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