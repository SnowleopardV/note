const Queue = require("../2-队列/1-queue");
// 最小堆
class MinHeap {
  constructor(arr, maxSize, key) {
    this.maxSize = maxSize;
    this.key = key;
    this.init(arr);
  }

  init(arr) {
    this.heap = new Array(arr.length);

    for (let i = 0; i < arr.length; i++) {
      this.heap[i] = arr[i];
    }

    let currentIndex = Math.floor((arr.length - 2) / 2);
    // Math.floor((arr.length - 2)/2) 为堆的最后一个分支结点

    while (currentIndex >= 0) {
      this.shiftDown(currentIndex, arr.length - 1); //  局部自上而下下滑调整
      currentIndex--; // 调整到下一个分支结点
    }
  }

  shiftDown(start, max) {
    let parentIndex = start;
    let minChildIndex = parentIndex * 2 + 1; // minChildIndex 为左孩子结点 minChildIndex + 1 为孩子右结点

    while (minChildIndex <= max) {
      if (
        minChildIndex < max &&
        this.heap[minChildIndex][this.key] >
          this.heap[minChildIndex + 1][this.key]
      ) {
        minChildIndex = minChildIndex + 1;
      }

      if (
        this.heap[parentIndex][this.key] <= this.heap[minChildIndex][this.key]
      ) {
        break; // 父结点比左孩子和右孩子结点中最小值还要小, 不需要调整
      } else {
        let tmp = this.heap[parentIndex];
        this.heap[parentIndex] = this.heap[minChildIndex];
        this.heap[minChildIndex] = tmp;

        parentIndex = minChildIndex;
        minChildIndex = 2 * minChildIndex + 1;
      }
    }
  }

  shiftUp(minChildIndex, parentIndex) {
    while (parentIndex >= 0) {
      if (
        this.heap[minChildIndex][this.key] >= this.heap[parentIndex][this.key]
      ) {
        break;
      } else {
        let tmp = this.heap[minChildIndex];
        this.heap[minChildIndex] = this.heap[parentIndex];
        this.heap[parentIndex] = tmp;

        minChildIndex = parentIndex;
        parentIndex = Math.floor((minChildIndex - 1) / 2);
      }
    }
  }

  insert(item) {
    if (this.size() === this.maxSize) {
      return;
    }
    this.heap.push(item);

    let minChildIndex = this.heap.length - 1;
    let parentIndex = Math.floor((minChildIndex - 1) / 2);
    this.shiftUp(minChildIndex, parentIndex, this.key);

    return true;
  }

  removeMin() {
    if (this.size() == 0) {
      return false;
    } else if (this.size() == 1) {
      return this.heap.shift();
    }
    const result = this.heap.shift();
    const last = this.heap.pop();
    this.heap.unshift(last);

    this.shiftDown(0, this.heap.length - 1);
    return result;
  }

  getMin() {
    return this.heap[0];
  }

  size() {
    return this.heap.length;
  }

  printByDeep() {
    let index = 0;
    const queque = new Queue();
    queque.enqueue(index);
    let str = "";

    while (queque.size()) {
      const size = queque.size();
      for (let i = 0; i < size; i++) {
        const item = queque.dequeue();
        str += this.heap[item] + " ";

        if (2 * item + 1 <= this.heap.length - 1) {
          queque.enqueue(2 * item + 1);
        }
        if (2 * item + 2 <= this.heap.length - 1) {
          queque.enqueue(2 * item + 2);
        }
      }
      console.log(str);
      str = "";
    }
  }
}

module.exports = MinHeap;
