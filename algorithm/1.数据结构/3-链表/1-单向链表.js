class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  append(data) {
    const node = new Node(data);
    if (this.head == null) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
    this.length++;
    return true;
  }

  insert(index, data) {
    // 1. 异常情况
    if (index < 0 || index > this.length) {
      return false;
    }
    // 2. 边界情况
    const node = new Node(data);
    if (index == 0) {
      node.next = this.head;
      this.head = node;
      return true;
    } else if (index == this.length) {
      return this.append(data);
    }
    // 3. 正常情况
    let currentIndex = 0;
    let currentNode = this.head;
    while (currentIndex < index - 1) {
      currentNode = currentNode.next;
      currentIndex++;
    }
    node.next = currentNode.next;
    currentNode.next = node;
    this.length++;
    return true;
  }

  remove(index) {
    // 1. 异常情况
    if (index < 0 || index > this.length - 1) {
      return null;
    }
    // 2. 边界情况
    let delItem = this.head;
    if (index == 0) {
      this.head = this.head.next;
      this.length--;
      return delItem;
    }
    let currentIndex = 0;
    let currentNode = this.head;
    while (currentIndex < index - 1) {
      currentNode = currentNode.next;
      currentIndex++;
    }
    //currentNode 是 index前一个结点
    delItem = currentNode.next.data;
    if (index == this.length - 1) {
      this.tail = currentNode;
      currentNode.next = null;
    } else {
      currentNode.next = currentNode.next.next;
    }
    this.length--;
    return delItem;
  }

  print() {
    let currentNode = this.head;
    while (currentNode) {
      console.log("next: ", currentNode.data);
      currentNode = currentNode.next;
    }
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  // 时间复杂度为n
  reversePrint(head) {
    if (head == null) {
      return;
    } else {
      console.log(head);
      this.reversePrint(head.next);
      console.log(head.data);
    }
  }

  isEmpty() {
    return this.length > 0 ? false : true;
  }

  get(index) {
    let currentIndex = 0;
    let currentNode = this.head;
    while (currentIndex < index) {
      currentNode = currentNode.next;
      currentIndex++;
    }
    return currentNode.data;
  }

  indexOf(data) {
    let currentIndex = 0;
    let currentNode = this.head;
    while (currentIndex < this.length) {
      console.log(112, currentNode.data, data);
      if (currentNode.data === data) {
        return currentIndex;
      }
      currentNode = currentNode.next;
      currentIndex++;
    }
    return -1;
  }

  removeHead() {
    this.head = this.head.next;
    this.length--;
  }

  removeTail() {
    this.remove(this.length - 1);
  }
}

module.exports = { LinkedList, Node };
