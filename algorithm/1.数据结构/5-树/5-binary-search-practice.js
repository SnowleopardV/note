const { BinarySearchTree, TreeNode } = require("./2-binary-search-tree");
const Queue = require("../2-队列/1-queue");

// const binarySearchTree = new BinarySearchTree();
// binarySearchTree.insert(new TreeNode(19));
// binarySearchTree.insert(new TreeNode(27));
// binarySearchTree.insert(new TreeNode(40));
// binarySearchTree.insert(new TreeNode(35));
// binarySearchTree.insert(new TreeNode(25));
// binarySearchTree.insert(new TreeNode(10));
// binarySearchTree.insert(new TreeNode(5));
// binarySearchTree.insert(new TreeNode(17));
// binarySearchTree.insert(new TreeNode(13));
// binarySearchTree.insert(new TreeNode(36));
// binarySearchTree.insert(new TreeNode(40));
// binarySearchTree.insert(new TreeNode(7));
// binarySearchTree.insert(new TreeNode(8));

// binarySearchTree.printByDeep();
// console.log("-------------remove(7)--------------");
// binarySearchTree.remove(7);
// binarySearchTree.printByDeep();
// console.log("-------------remove(17)-------------");
// binarySearchTree.remove(17);
// binarySearchTree.printByDeep();
// console.log("-------------remove(27)-------------");
// binarySearchTree.remove(27);
// binarySearchTree.printByDeep();
// console.log("-------------remove(10)-------------");
// binarySearchTree.remove(10);
// binarySearchTree.printByDeep();
// console.log("--------------------------");
// binarySearchTree.remove(5);
// binarySearchTree.printByDeep();
// console.log("--------------------------");

// 案例1 使用二叉搜索树实现一个简单的字典
function compareString(str1, str2) {
  if (str1 == str2) {
    return "same";
  }
  let len = str1.length < str2.length ? str1.length : str2.length;

  for (let i = 0; i < len; i++) {
    if (str1[i] === str2[i]) {
      continue;
    } else if (str1[i] > str2[i]) {
      return str1;
    } else {
      return str2;
    }
  }
  return str1.length <= str2.length ? str2 : str1;
}

class BinarySearchTree2 {
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
      if (node.data.key === currentNode.data.key) {
        return false;
      } else if (
        compareString(node.data.key, currentNode.data.key) ===
        currentNode.data.key
      ) {
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

  searchData(key) {
    let currentNode = this.root;

    while (currentNode) {
      if (key === currentNode.data.key) {
        return currentNode.data.value;
      } else if (
        compareString(key, currentNode.data.key) === currentNode.data.key
      ) {
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

  remove(key) {
    let currentNode = this.root;

    while (currentNode) {
      if (key === currentNode.data.key) {
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
      } else if (
        compareString(key, currentNode.data.key) === currentNode.data.key
      ) {
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

  printByDeep() {
    const item = this.root;
    const queue = new Queue();
    queue.enqueue(item);
    let str = "";

    while (queue.size()) {
      const size = queue.size();

      for (let i = 0; i < size; i++) {
        let item = queue.dequeue();
        str += item.data.key + ": " + item.data.value + "   ";
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

  FirstMiddleNode(node) {
    while (node) {
      if (node.leftChildren === null) {
        return node;
      }
      node = node.leftChildren;
    }
    return null;
  }
}

const obj = { name: "jack", age: 20, sex: "male", grade: 1, school: "beijing" };
const binarySearchTree2 = new BinarySearchTree2();
for (let k in obj) {
  const node = new TreeNode({ key: k, value: obj[k] });
  binarySearchTree2.insert(node);
}
binarySearchTree2.printByDeep();
console.log(211, binarySearchTree2.searchData("age"));
binarySearchTree2.remove("age");
console.log(211, binarySearchTree2.searchData("age"));

// --------------------------------------------------------
// 案例2 实现二叉搜索树, 返回最大值和最小值两个功能
//
const arr = [12, 234, 435, 456, 7, 34, 1345, 2, 3, 67, 345, 23, 9999, -1];
function getMax(arr) {
  const binarySearchTree = new BinarySearchTree();
  for (let i of arr) {
    binarySearchTree.insert(new TreeNode(i));
  }

  console.log(binarySearchTree.getMax());
}

function getMin(arr) {
  const binarySearchTree = new BinarySearchTree();
  for (let i of arr) {
    binarySearchTree.insert(new TreeNode(i));
  }

  console.log(binarySearchTree.getMin());
}

// getMax(arr);
// getMin(arr);

// console.log(compareString("abcc", "abcd"));
