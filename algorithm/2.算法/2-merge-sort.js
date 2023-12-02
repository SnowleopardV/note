const mergeSortedArr = require("./1-merge-sorted-arr");

function mergeSort(arr, start, end) {
  if (start < end) {
    let middle = Math.floor((end + start) / 2);

    let arr1 = mergeSort(arr, start, middle);
    let arr2 = mergeSort(arr, middle + 1, end);

    return mergeSortedArr(arr1, arr2);
  }
  return [arr[end]];
}

module.exports = mergeSort;
