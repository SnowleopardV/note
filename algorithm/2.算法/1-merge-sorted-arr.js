// 时间复杂度为O(m + n)
function mergeSortedArr(arr1, arr2) {
  const arr = [];
  let index1 = 0;
  let index2 = 0;

  while (index1 < arr1.length && index2 < arr2.length) {
    if (arr1[index1] < arr2[index2]) {
      arr.push(arr1[index1]);
      index1++;
    } else {
      arr.push(arr2[index2]);
      index2++;
    }
  }

  if (index1 < arr1.length) {
    while (index1 < arr1.length) {
      arr.push(arr1[index1]);
      index1++;
    }
  }

  if (index2 < arr2.length) {
    while (index2 < arr2.length) {
      arr.push(arr2[index2]);
      index2++;
    }
  }

  console.log(27, arr1, arr2, arr);
  return arr;
}

module.exports = mergeSortedArr;
