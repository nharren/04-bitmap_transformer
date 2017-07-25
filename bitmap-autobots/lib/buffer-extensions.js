'use strict';

const os = require('os');

let endianness = os.endianness();

Buffer.prototype.read = function(offset, valueType) {
  if (endianness === 'LE') {
    switch (valueType) {
    case 'int32':
      return this.readInt32LE(offset);
    case 'uint16':
      return this.readUInt16LE(offset);
    case 'uint32':
      return this.readInt32LE(offset);
    case 'float':
      return this.readFloatLE(offset);
    }
  } else {
    switch (valueType) {
    case 'int32':
      return this.readInt32BE(offset);
    case 'uint16':
      return this.readUInt16BE(offset);
    case 'uint32':
      return this.readInt32BE(offset);
    case 'float':
      return this.readFloatBE(offset);
    }
  }

  return null;
};

Buffer.prototype.readInt32 = function(offset) {
  return this.read(offset, 'int32');
};

Buffer.prototype.readUInt16 = function(offset) {
  return this.read(offset, 'uint16');
};

Buffer.prototype.readUInt32 = function(offset) {
  return this.read(offset, 'uint32');
};

Buffer.prototype.readFloat = function(offset) {
  return this.read(offset, 'float');
};