const murmurhash = require("murmurhash");
class LinkListNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;

    this.next = null;
  }
}

class LinkList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  append(key, value) {
    const node = new LinkListNode(key, value);

    if (!this.head) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
  }

  search(key) {
    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.key == key) {
        // console.log(currentNode.value);
        return currentNode;
      }
      currentNode = currentNode.next;
    }

    return null;
  }

  remove(key) {
    const preNode = this.head;
    const currentNode = this.head.next;
    if (preNode.key == key) {
      this.head = currentNode;
      return true;
    }
    while (currentNode) {
      if (currentNode.key == key) {
        preNode.next = currentNode.next;
        if (this.tail == currentNode) {
          this.tail = preNode;
        }
        return true;
      }
      currentNode = currentNode.next;
    }

    return false;
  }
}

class HashTable {
  constructor(size) {
    this.items = new Array(size);
    for (let i = 0; i < size; i++) {
      this.items[i] = new LinkList();
    }
    this.prime = size;

    while (this.prime > 2) {
      if (this.isPrime(this.prime)) {
        return;
      }
      this.prime--;
    }
  }

  isPrime(number) {
    for (let i = 2; i < number - 1; i++) {
      if (number % i === 0) {
        return false;
      }
    }
    return true;
  }

  getIndex(key) {
    // 关键代码
    let stringKey = key.toString();
    let hashValue = Math.abs(murmurhash.v3(stringKey, 0));

    // console.log(hashValue % this.prime);
    return hashValue % this.prime;
  }

  set(key, value) {
    const index = this.getIndex(key);
    const node = this.items[index].search(key);
    if (node) {
      node.value = value;
    } else {
      this.items[index].append(key, value);
    }
  }

  get(key) {
    const index = this.getIndex(key);

    const node = this.items[index].search(key);
    if (node) {
      console.log(`get ${key}:`, node.value);
      return node.value;
    }
    console.log(`get ${key}:`, null);
    return null;
  }

  delKey(key) {
    const index = this.getIndex(key);

    this.items[index].remove(key);
  }

  hasKey(key) {
    const index = this.getIndex(key);

    const node = this.items[index].search(key);
    console.log(`hasKey ${key}: `, node ? true : false);
    return node ? true : false;
  }
}

module.exports = { LinkList, HashTable };
