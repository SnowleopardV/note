const Stack = require("../1-栈/1-stack");
const Queue = require("../2-队列/1-queue");

class BinaryTreeNode {
  constructor(data) {
    this.data = data;
    this.leftChild = null;
    this.rightChild = null;
    this.parentNode = null;
  }
}

class BinaryTree {
  constructor(string) {
    this.root = null;
    this.init(string);
  }

  init(string) {
    const stack = new Stack();
    let k = "leftChild";
    let node = null;

    for (let i of string) {
      if (i === "#") {
        return;
      } else if (i === "(") {
        stack.push(node);
        k = "leftChild";
      } else if (i === ")") {
        stack.pop();
      } else if (i === ",") {
        k = "rightChild";
      } else {
        node = new BinaryTreeNode(i);
        const parent = stack.top();
        node.parentNode = parent;
        if (!this.root) {
          this.root = node;
        } else if (k === "leftChild") {
          parent.leftChild = node;
        } else {
          parent.rightChild = node;
        }
      }
    }
  }

  middleOrder(node) {
    if (node == null) {
      return;
    }
    this.middleOrder(node.leftChild);
    console.log(node.data);
    this.middleOrder(node.rightChild);
  }

  preOrder(node) {
    if (node === null) {
      return;
    }
    console.log(node.data);
    this.preOrder(node.leftChild);
    this.preOrder(node.rightChild);
  }

  postOrder(node) {
    if (node === null) {
      return;
    }
    this.postOrder(node.leftChild);
    this.postOrder(node.rightChild);
    console.log(node.data);
  }

  preOrder2(node) {
    const stack = new Stack();

    while (node) {
      console.log(node.data);

      if (node.rightChild) {
        stack.push(node.rightChild);
      }

      if (node.leftChild) {
        node = node.leftChild;
      } else {
        node = stack.pop();
      }
    }
  }

  middleOrder2(node) {
    const stack = new Stack();

    while (true) {
      while (node) {
        stack.push(node);
        node = node.leftChild;
      }
      let popItem = stack.pop();
      console.log(popItem.data);
      node = popItem.rightChild;

      if (!node && stack.isEmpty()) {
        break;
      }
    }
  }

  postOrder2(node) {
    const stack = new Stack();
    while (true) {
      while (node) {
        if (node.state && node.state === 1) {
          break;
        } else {
          node.state = 1;
          stack.push(node);
          node = node.leftChild;
        }
      }

      let popItem = stack.top();
      if (popItem) {
        if (popItem.rightChild && popItem.rightChild.state !== 1) {
          node = popItem.rightChild;
        } else {
          console.log(popItem.data);
          node = stack.pop();
        }
      }

      if (!popItem && !node) {
        break;
      }
    }
  }

  treeNodeCount(node) {
    if (node === null) {
      return 0;
    }
    let leftNodeCount = this.treeNodeCount(node.leftChild);
    let rightNodeCount = this.treeNodeCount(node.rightChild);
    return leftNodeCount + rightNodeCount + 1;
  }

  treeHeight(node) {
    if (node === null) {
      return 0;
    }
    let leftTreeHeight = this.treeHeight(node.leftChild);
    let rightTreeHeight = this.treeHeight(node.rightChild);
    return leftTreeHeight > rightTreeHeight
      ? leftTreeHeight + 1
      : rightTreeHeight + 1;
  }

  size() {
    return this.treeNodeCount(this.root);
  }

  height() {
    return this.treeHeight(this.root);
  }

  findNode(node, data) {
    if (node === null) {
      return null;
    } else if (node.data === data) {
      return node;
    }
    let leftResult = this.findNode(node.leftChild, data);
    if (leftResult) {
      return leftResult;
    }
    let rightResult = this.findNode(node.rightChild, data);
    return rightResult;
  }

  find(data) {
    return this.findNode(this.root, data);
  }

  mirror(node) {
    if (node === null) {
      return;
    }
    const tmpNode = node.leftChild;
    node.leftChild = node.rightChild;
    node.rightChild = tmpNode;
    this.mirror(node.leftChild);
    this.mirror(node.rightChild);
  }

  mirror2(node) {
    if (node === null) {
      return null;
    }
    let left = this.mirror2(node.leftChild);
    let right = this.mirror2(node.rightChild);

    node.leftChild = right;
    node.rightChild = left;

    return node;
  }

  nearParent(node1, node2) {
    const arr = [];

    while (node1) {
      arr.push(node1);
      node1 = node1.parentNode;
    }
    while (node2) {
      for (let n of arr) {
        if (node2 == n) {
          return n;
        }
      }
      node2 = node2.parentNode;
    }
    return null;
  }

  sameDeepPrint(node) {
    const queue = new Queue();
    let str = "";
    queue.enqueue(node);

    while (queue.size()) {
      const size = queue.size();
      for (let i = 0; i < size; i++) {
        const node = queue.dequeue();
        str += node.data + " ";
        if (node.leftChild) queue.enqueue(node.leftChild);
        if (node.rightChild) queue.enqueue(node.rightChild);
      }
      console.log(str);
      str = "";
    }
  }

  getCountByDeep(deep) {
    const queue = new Queue();
    let index = 0;
    queue.enqueue(this.root);

    while (queue.size()) {
      const size = queue.size();
      if (deep === index) {
        return size;
      }
      for (let i = 0; i < size; i++) {
        const node = queue.dequeue();
        if (node.leftChild) queue.enqueue(node.leftChild);
        if (node.rightChild) queue.enqueue(node.rightChild);
      }
      index++;
    }
    return 0;
  }
}

module.exports = BinaryTree;
