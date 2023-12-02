const Queue = require("../2-队列/1-queue");

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
        this.heap[minChildIndex].data.weight >
          this.heap[minChildIndex + 1].data.weight
      ) {
        minChildIndex = minChildIndex + 1;
      }

      if (
        this.heap[parentIndex].data.weight <=
        this.heap[minChildIndex].data.weight
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
        this.heap[minChildIndex].data.weight >=
        this.heap[parentIndex].data.weight
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
    this.shiftUp(minChildIndex, parentIndex);

    return true;
  }

  removeMin() {
    if (this.heap.length === 1) {
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

class CodeNode {
  constructor(code, weight) {
    this.code = code;
    this.weight = weight;
  }
}

class TreeNode {
  constructor(data) {
    this.parent = null;
    this.data = data;
    this.leftChild = null;
    this.rightChild = null;
    this.path = "";
  }
}

class HuffmanTree {
  constructor(obj) {
    this.root = null;
    const forest = [];
    for (let k in obj) {
      let item = new CodeNode(k, obj[k]);
      forest.push(new TreeNode(item));
    }
    this.init(forest);
  }

  init(arr) {
    let minHeap = new MinHeap(arr, 100);

    for (let i = 0; i < arr.length - 1; i++) {
      let first = minHeap.removeMin();
      let second = minHeap.removeMin();

      let newItem = new CodeNode("", first.data.weight + second.data.weight);
      let newNode = new TreeNode(newItem);

      newNode.leftChild = first;
      newNode.rightChild = second;

      first.parent = newNode;
      second.parent = newNode;

      minHeap.insert(newNode);
      this.root = newNode;
    }
  }

  printByDeep() {
    const item = this.root;
    const queque = new Queue();
    queque.enqueue(item);
    let str = "";
    let path = "";

    while (queque.size()) {
      const size = queque.size();

      for (let i = 0; i < size; i++) {
        const item = queque.dequeue();
        str += item.data.code + " " + item.path + " ";
        let path = item.path.concat();
        if (item.leftChild) {
          queque.enqueue(item.leftChild);
          item.leftChild.path = path + "0";
        }
        if (item.rightChild) {
          queque.enqueue(item.rightChild);
          item.rightChild.path = path + "1";
        }
      }
      console.log(str);
      str = "";
    }
  }
}

let obj = {
  a: 0.12,
  b: 0.4,
  c: 0.15,
  d: 0.08,
  e: 0.25,
};

const huffmanTree = new HuffmanTree(obj);
huffmanTree.printByDeep();
