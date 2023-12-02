class Bitmap {
  constructor(size) {
    this.size = size;
    this.arr = new Array(size).fill(0);
    this.bitStr = "";
  }

  add(num) {
    const arr_index = Math.floor(num / 32);
    const index = num % 32;

    this.arr[arr_index] = this.arr[arr_index] | (1 << index);
    return this.bit();
  }

  isExist(num) {
    const arr_index = Math.floor(num / 32);
    const index = num % 32;

    if ((this.arr[arr_index] & (1 << index)) == 0) {
      return false;
    }
    return true;
  }

  bit() {
    this.bitStr = "";
    for (let i = this.size - 1; i > -1; i--) {
      this.bitStr += this.arr[i].toString(2).padStart(32, "0");
    }
    // console.log(this.bitStr);
  }
}

class SuperBitmap {
  constructor(size) {
    this.size = size;
    this.positiveArr = new Array(size).fill(0);
    this.negativeArr = new Array(size).fill(0);
    this.bitStr = "";
  }

  add(num) {
    const arr_index = Math.abs(Math.floor(num / 32));
    const index = Math.abs(num % 32);

    if (num >= 0) {
      this.positiveArr[arr_index] = this.positiveArr[arr_index] | (1 << index);
    } else {
      this.negativeArr[arr_index] = this.negativeArr[arr_index] | (1 << index);
    }

    return this.bit(num);
  }

  isExist(num) {
    const arr_index = Math.abs(Math.floor(num / 32));
    const index = Math.abs(num % 32);

    if (num >= 0) {
      if ((this.positiveArr[arr_index] & (1 << index)) == 0) {
        return false;
      }
    } else {
      if ((this.negativeArr[arr_index] & (1 << index)) == 0) {
        return false;
      }
    }
    return true;
  }

  bit(num) {
    this.bitStr = "";
    for (let i = this.size - 1; i > -1; i--) {
      if (num >= 0) {
        this.bitStr += this.positiveArr[i].toString(2).padStart(32, "0");
      } else {
        this.bitStr += this.negativeArr[i].toString(2).padStart(32, "0");
      }
    }
    // console.log(this.bitStr);
  }
}
module.exports = { Bitmap, SuperBitmap };
