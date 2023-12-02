const { Heap, MinHeap, MaxHeap } = require("./1-heap");

// const heap = new Heap([10, 2, 13, 4, 6, 0, 11, 23, 50], 100);
// const minHeap = new MinHeap([10, 2, 13, 4, 6, 0, 11, 23, 50], 100);

// console.log("minHeap", minHeap);

// minHeap.insert(-1);
// minHeap.insert(-100);
// minHeap.insert(-1000);
// minHeap.printByDeep();
// console.log(minHeap.heap[0]);
// minHeap.removeMin();
// minHeap.printByDeep();
// minHeap.getMin();
// minHeap.size();

// 案例1 Top K问题
// 1个非常大的数据集合有n个数, 求集合中最大的k个值
const arr = [23, 2, 546, 12, 4234, 1289, 233, 4132, 453, 2345, 8, 1234, 432, 2];
const k = 3;

const maxHeap = new MaxHeap(arr, k);
// maxHeap.printByDeep();
// maxHeap.insert(5000);
// maxHeap.printByDeep();
// maxHeap.insert(-1);
// maxHeap.insert(5001);
// maxHeap.printByDeep();

// 方法1 使用最小堆
function getMaxKValueByMin(arr, k) {
  const minHeap = new MinHeap([], k);

  for (let i = 0; i < arr.length; i++) {
    if (i < k) {
      minHeap.insert(arr[i]);
    } else {
      if (arr[i] > minHeap.getMin()) {
        minHeap.removeMin();
        minHeap.insert(arr[i]);
      }
    }
  }
  console.log(minHeap.removeMin());
  console.log(minHeap.removeMin());
  console.log(minHeap.removeMin());
}

// 方法2 使用最大堆

function getMaxKValueByMax(arr, k) {
  const maxHeap = new MaxHeap(arr, k);

  console.log(maxHeap.removeMax());
  console.log(maxHeap.removeMax());
  console.log(maxHeap.removeMax());
}

getMaxKValueByMin(arr, k);
getMaxKValueByMax(arr, k);
