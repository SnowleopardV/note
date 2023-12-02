const Queue = require("../2-队列/1-queue");

// 堆
class Heap {
  constructor(arr, maxSize) {
    this.maxSize = maxSize;
    this.init(arr);
  }

  init(arr) {
    this.heap = new Array(arr.length);
    for (let i = 0; i < arr.length; i++) {
      this.heap[i] = arr[i];
    }
  }
}

// 最小堆
class MinHeap {
  constructor(arr, maxSize) {
    this.maxSize = maxSize;
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
        this.heap[minChildIndex] > this.heap[minChildIndex + 1]
      ) {
        minChildIndex = minChildIndex + 1;
      }

      if (this.heap[parentIndex] <= this.heap[minChildIndex]) {
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
      if (this.heap[minChildIndex] >= this.heap[parentIndex]) {
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
    this.shiftUp(minChildIndex, parentIndex);

    return true;
  }

  removeMin() {
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

class MaxHeap {
  constructor(arr, maxSize) {
    this.maxSize = maxSize;

    this.init(arr);
  }

  init(arr) {
    this.heap = new Array(arr.length);

    for (let i = 0; i < arr.length; i++) {
      this.heap[i] = arr[i];
    }

    let currentIndex = Math.floor((arr.length - 2) / 2);

    while (currentIndex >= 0) {
      this.shiftDown(currentIndex, arr.length - 1); //  局部自上而下下滑调整
      currentIndex--; // 调整到下一个分支结点
    }
  }

  shiftDown(maxIndex, maxSize) {
    let maxChildIndex = maxIndex * 2 + 1;
    let maxParentIndex = maxIndex;

    while (maxChildIndex <= maxSize) {
      if (
        maxChildIndex < maxSize &&
        this.heap[maxChildIndex] < this.heap[maxChildIndex + 1]
      ) {
        maxChildIndex = maxChildIndex + 1;
      }

      if (this.heap[maxParentIndex] >= this.heap[maxChildIndex]) {
        break;
      } else {
        let tmp = this.heap[maxParentIndex];
        this.heap[maxParentIndex] = this.heap[maxChildIndex];
        this.heap[maxChildIndex] = tmp;

        maxParentIndex = maxChildIndex;
        maxChildIndex = Math.floor(maxParentIndex * 2 + 1);
      }
    }
  }

  removeMax() {
    if (this.heap.length === 1) {
      return this.heap.shift();
    }
    const result = this.heap.shift();
    const last = this.heap.pop();
    this.heap.unshift(last);

    this.shiftDown(0, this.heap.length - 1);

    return result;
  }

  getMax() {
    return this.heap[0];
  }

  insert(item) {
    if (this.size() === this.maxSize) {
      return false;
    }

    this.heap.push(item);

    this.shiftUp(this.heap.length - 1, this.maxSize);
  }

  shiftUp(start, maxSize) {
    let maxChildIndex = start;
    let parentIndex = Math.floor((maxChildIndex - 1) / 2);

    while (parentIndex >= 0) {
      if (this.heap[maxChildIndex] <= this.heap[parentIndex]) {
        break;
      } else {
        // 如果孩子结点A>父结点  而父结点>孩子结点的兄弟结点B, 所以A > B
        const tmp = this.heap[maxChildIndex];
        this.heap[maxChildIndex] = this.heap[parentIndex];
        this.heap[parentIndex] = tmp;

        maxChildIndex = parentIndex;
        parentIndex = Math.floor((maxChildIndex - 1) / 2);
      }
    }
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

module.exports = { Heap, MinHeap, MaxHeap };
