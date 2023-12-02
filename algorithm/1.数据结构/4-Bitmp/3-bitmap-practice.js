const { Bitmap, SuperBitmap } = require("./1-bitmap");

// 案例1  使用一个整数表示几个数字
let value = 0;
value = value | (1 << 3);
value = value | (1 << 9);
value = value | (1 << 19);
value = value | (1 << 20);

const bitmap = new Bitmap(4);

bitmap.add(100);
// console.log(bitmap.isExist(100));
// console.log(bitmap.isExist(99));

// 案例2 对两个集合取交集
function intersection(arr1, arr2) {
  const bitmap = new Bitmap(1);
  const arr = [];

  for (let item of arr1) {
    bitmap.add(item);
  }

  for (let item of arr2) {
    arrIndex = Math.floor(item / 32);
    bitIndex = item % 32;

    // console.log(
    //   29,
    //   arrIndex,
    //   bitmap.arr[arrIndex],
    //   1 << bitIndex,
    //   bitmap.arr[arrIndex] & (1 << bitIndex)
    // );
    if (bitmap.arr[arrIndex] & (1 << bitIndex)) {
      arr.push(item);
    }
  }

  return arr;
}

// console.log(intersection([1, 4, 6, 8, 9, 10, 15], [6, 14, 9, 2, 0, 7]));

// 案例3 bitmap支持负数

// 案例4 查找重复的数, 如[1, 3, 4, 5, 7, 4, 8, 9, 2, 9]
// 使用bitmap时间复杂度为O(n)
function getRepeat(arr) {
  const bitmap = new Bitmap();
  const repeatItem = [];
  for (let item of arr) {
    if (bitmap.isExist(item)) {
      repeatItem.push(item);
    } else {
      bitmap.add(item);
    }
  }
  return repeatItem;
}

// console.log(62, getRepeat([1, 3, 4, 5, 7, 4, 8, 9, 2, 9, 2, 3]));

// 案例5 查找不重复的数, 如[1, 3, 4, 5, 7, 4, 8, 9, 2, 9]
// 使用bitmap时间复杂度为O(3n)
function getNoRepeat(arr) {
  const bitmap = new Bitmap();
  const noRepeatItem = [];
  const repeatItem = getRepeat(arr);

  for (let item of repeatItem) {
    bitmap.add(item);
  }

  for (let item of arr) {
    if (!bitmap.isExist(item)) {
      noRepeatItem.push(item);
    }
  }
  return noRepeatItem;
}

console.log(62, getNoRepeat([1, 3, 4, 5, 7, 4, 8, 9, 2, 9, 2, 3]));
