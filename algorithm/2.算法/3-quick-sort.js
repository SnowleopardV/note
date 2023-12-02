let arr = [12, 6, 7, 5, 10, 8, 11, 9, 1, 3, 4, 2];

quickSort(arr, 0, arr.length - 1);
console.log(49, arr);

function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let x = start;
  let y = end;

  let benchmark = arr[start];
  while (x < y) {
    for (let j = y; j >= x; j--) {
      if (j === x) {
        arr[j] = benchmark;

        quickSort(arr, start, j - 1);
        quickSort(arr, j + 1, end);
        return;
      }

      if (arr[j] < benchmark) {
        arr[x] = arr[j];
        y = j;
        break;
      }
    }

    for (let i = x; i <= y; i++) {
      if (i === y) {
        arr[i] = benchmark;
        quickSort(arr, start, i - 1);
        quickSort(arr, i + 1, end);
        return;
      }
      if (arr[i] > benchmark) {
        arr[y] = arr[i];
        x = i;

        arr[i] = benchmark;
        break;
      }
    }
  }
  return;
}

// function quickSort(arr, l, r) {
//   if (l < r) {
//     let i = l;
//     let j = r;
//     let x = arr[l];
//     while (i < j) {
//       while (i < j && arr[j] >= x)
//         // 从右向左找第一个小于x的数
//         j--;
//       if (i < j) arr[i++] = arr[j];

//       while (i < j && arr[i] < x)
//         // 从左向右找第一个大于等于x的数
//         i++;
//       if (i < j) arr[j--] = arr[i];
//     }
//     arr[i] = x;
//     quickSort(arr, l, i - 1); // 递归调用
//     quickSort(arr, i + 1, r);
//   }
// }
