const murmurhash = require("murmurhash");

class BloomFilter {
  constructor(maxCount, errRate) {
    this.bitMap = [];
    this.maxCount = maxCount;
    this.errRate = errRate;

    this.bitSize = Math.ceil(
      maxCount * (-Math.log(errRate) / (Math.log(2) * Math.log(2)))
    );
    this.hashCount = Math.ceil(Math.log(2) * (this.bitSize / maxCount));
    console.log(
      "this.hashCount: ",
      this.hashCount,
      "this.bitSize: ",
      this.bitSize
    );
  }

  setBit(bit) {
    var arrIndex = Math.floor(bit / 32);
    var bitIndex = Math.floor(bit % 32);

    this.bitMap[arrIndex] |= 1 << bitIndex;
    console.log(26, arrIndex, bitIndex, this.bitMap, this.bitMap.length);
  }

  getBit(bit) {
    var arrIndex = Math.floor(bit / 32);
    var bitIndex = Math.floor(bit % 32);

    return (this.bitMap[arrIndex] &= 1 << bitIndex);
  }

  add(key) {
    if (this.isExist(key)) {
      return -1;
    }

    for (let i = 0; i < this.hashCount; i++) {
      var hashValue = murmurhash.v3(key, i);
      console.log(42, hashValue, hashValue.toString(2));
      this.setBit(Math.abs(Math.floor(hashValue % this.bitSize)));
    }
  }

  isExist(key) {
    for (let i = 0; i < this.hashCount; i++) {
      let hashValue = murmurhash.v3(key, i); // murmurhash 返回的可能是一个负数
      if (!this.getBit(Math.abs(Math.floor(hashValue % this.bitSize)))) {
        return false;
      }
    }
    return true;
  }
}

module.exports = BloomFilter;
