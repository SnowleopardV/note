const Queue = require("../2-队列/1-queue");

class TreeNode {
  constructor(data) {
    this.data = data;
    this.parent = null;
    this.leftChildren = null;
    this.rightChildren = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(node) {
    if (!this.root) {
      this.root = node;
      return true;
    }
    let currentNode = this.root;
    while (currentNode) {
      if (node.data === currentNode.data) {
        return false;
      } else if (node.data < currentNode.data) {
        if (currentNode.leftChildren) {
          currentNode = currentNode.leftChildren;
        } else {
          currentNode.leftChildren = node;
          node.parent = currentNode;
          currentNode = null;
        }
      } else {
        if (currentNode.rightChildren) {
          currentNode = currentNode.rightChildren;
        } else {
          currentNode.rightChildren = node;
          node.parent = currentNode;
          currentNode = null;
        }
      }
    }
    return true;
  }

  searchData(data) {
    let currentNode = this.root;

    while (currentNode) {
      if (data === currentNode.data) {
        return currentNode;
      } else if (data < currentNode.data) {
        if (currentNode.leftChildren) {
          currentNode = currentNode.leftChildren;
        } else {
          return null;
        }
      } else {
        if (currentNode.rightChildren) {
          currentNode = currentNode.rightChildren;
        } else {
          return null;
        }
      }
    }
    return null;
  }

  // 删除结点要考虑4种情况
  // 1. 该结点既没有左结点, 又没有右结点, 只需要将父结点指向它的结点置为null
  // 2. 该结点没有右孩子结点, 有左孩子结点,则将该左孩子结点替代它的位置
  // 3. 该结点没有左孩子结点, 有右孩子结点,则将该右孩子结点替代它的位置
  // 4. 既有左孩子结点, 又有右孩子结点.
  remove(data) {
    let currentNode = this.root;

    while (currentNode) {
      if (data === currentNode.data) {
        if (currentNode === this.root) {
          this.root = null;
        } else if (currentNode === currentNode.parent.leftChildren) {
          if (!currentNode.leftChildren && !currentNode.rightChildren) {
            currentNode.parent.leftChildren = null;
            return true;
          } else if (currentNode.leftChildren && !currentNode.rightChildren) {
            currentNode.parent.leftChildren = currentNode.leftChildren;
            return true;
          } else if (!currentNode.leftChildren && currentNode.rightChildren) {
            currentNode.parent.leftChildren = currentNode.rightChildren;
            return true;
          } else {
            const rightChildrenTree = currentNode.rightChildren;
            const firstMiddleNode = this.FirstMiddleNode(rightChildrenTree);

            if (!rightChildrenTree.leftChildren) {
              currentNode.data = firstMiddleNode.data;
              currentNode.rightChildren = null;
              return true;
            }

            currentNode.data = firstMiddleNode.data;
            firstMiddleNode.data = data;

            currentNode = firstMiddleNode;
          }
        } else {
          if (!currentNode.leftChildren && !currentNode.rightChildren) {
            currentNode.parent.rightChildren = null;
            return true;
          } else if (currentNode.leftChildren && !currentNode.rightChildren) {
            currentNode.parent.rightChildren = currentNode.leftChildren;
            return true;
          } else if (!currentNode.leftChildren && currentNode.rightChildren) {
            currentNode.parent.rightChildren = currentNode.rightChildren;
            return true;
          } else {
            const rightChildrenTree = currentNode.rightChildren;
            const firstMiddleNode = this.FirstMiddleNode(rightChildrenTree);

            if (!rightChildrenTree.leftChildren) {
              currentNode.data = firstMiddleNode.data;
              currentNode.rightChildren = null;
              return true;
            }

            currentNode.data = firstMiddleNode.data;
            firstMiddleNode.data = data;

            currentNode = firstMiddleNode;
          }
        }
      } else if (data < currentNode.data) {
        if (currentNode.leftChildren) {
          currentNode = currentNode.leftChildren;
        } else {
          return false;
        }
      } else {
        if (currentNode.rightChildren) {
          currentNode = currentNode.rightChildren;
        } else {
          return false;
        }
      }
    }
  }

  getMin() {
    let item = this.root;
    while (item) {
      if (item.leftChildren) {
        item = item.leftChildren;
      } else {
        return item.data;
      }
    }
    return null;
  }

  getMax() {
    let item = this.root;
    while (item) {
      if (item.rightChildren) {
        item = item.rightChildren;
      } else {
        return item.data;
      }
    }
    return null;
  }

  FirstMiddleNode(node) {
    while (node) {
      if (node.leftChildren === null) {
        return node;
      }
      node = node.leftChildren;
    }
    return null;
  }

  printByDeep() {
    const item = this.root;
    const queue = new Queue();
    queue.enqueue(item);
    let str = "";

    while (queue.size()) {
      const size = queue.size();

      for (let i = 0; i < size; i++) {
        let item = queue.dequeue();
        str += item.data + " ";
        if (item.leftChildren) {
          queue.enqueue(item.leftChildren);
        }
        if (item.rightChildren) {
          queue.enqueue(item.rightChildren);
        }
      }
      console.log(str);
      str = "";
    }
  }
}

module.exports = { BinarySearchTree, TreeNode };
