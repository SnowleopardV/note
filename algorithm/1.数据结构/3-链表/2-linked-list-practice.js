const Stack = require("../1-栈/1-stack");
const { LinkedList, Node } = require("./1-linked-list");
const DoubleLinkedList = require("./1-linked-list-double");

// 案例1 使用链表实现Stack

class StackByLinkedlist {
  constructor() {
    this._linkedlist = Symbol("linkedlist");
    this[this._linkedlist] = new LinkedList();
  }

  push(item) {
    return this[this._linkedlist].append(item);
  }

  pop() {
    return this[this._linkedlist].remove(this.size() - 1);
  }

  size() {
    return this[this._linkedlist].length;
  }

  clear() {
    this[this._linkedlist].clear();
  }
  isEmpty() {
    return this[this._linkedlist].isEmpty();
  }
  top() {
    return this[this._linkedlist].get(this.size() - 1);
  }
}

// const stack = new Stack();
// stack.push(1);
// stack.push(2);
// stack.push(3);
// stack.push(4);

// console.log(stack.top());
// console.log(stack.pop());
// console.log(stack.top());
// console.log(stack.size());
// console.log(stack.pop());
// console.log(stack.top());

// 案例2 使用链表实现Queue
class QueByLinkedlist {
  constructor() {
    this._linkedlist = Symbol("linkedlist");
    this[this._linkedlist] = new LinkedList();
  }

  enqueue(item) {
    this[this._linkedlist].append(item);
  }

  dequeue() {
    return this[this._linkedlist].remove(0);
  }

  size() {
    return this[this._linkedlist].length;
  }

  isEmpty() {
    return this[this._linkedlist].isEmpty();
  }

  head() {
    return this[this._linkedlist].get(0);
  }

  clear() {
    this[this._linkedlist].clear();
  }
}

// const queue = new QueByLinkedlist();
// queue.enqueue(1);
// queue.enqueue(2);
// queue.enqueue(3);
// queue.enqueue(4);
// queue.enqueue(5);

// console.log(queue.head());
// console.log(queue.size());
// console.log(89, queue.dequeue());
// console.log(queue.size());

//案例3 使用迭代和递归两种方法翻转列表
// 1. 迭代 iterator实现
function reverseIter(linkedlist) {
  let [preNode, currentNode, nextNode] = [
    null,
    linkedlist.head,
    linkedlist.head.next,
  ];

  linkedlist.tail = currentNode;

  while (nextNode) {
    console.log(104, currentNode.data, nextNode.data);
    linkedlist.head = nextNode;
    currentNode.next = preNode;
    preNode = currentNode;
    currentNode = nextNode;
    nextNode = nextNode.next;
    console.log(110, linkedlist.head);
  }

  currentNode.next = preNode;
  return linkedlist;
}

// 递归 recursion 实现
function reverseRecursion(linkedlist) {
  let [preNode, currentNode, nextNode] = [
    null,
    linkedlist.head,
    linkedlist.head.next,
  ];

  linkedlist.tail = currentNode;
  next();
  function next() {
    if (!nextNode) {
      return;
    }

    linkedlist.head = nextNode;
    currentNode.next = preNode;
    preNode = currentNode;
    currentNode = nextNode;
    nextNode = nextNode.next;
    next();
  }

  currentNode.next = preNode;
  return linkedlist;
}

// const linkedlist = new LinkedList();
// linkedlist.append(1);
// linkedlist.append(2);
// linkedlist.append(3);
// linkedlist.append(4);
// linkedlist.append(5);
// linkedlist.append(6);
// console.log(linkedlist);
// linkedlist.print();
// console.log(123, reverseRecursion(linkedlist));
// linkedlist.append(7);
// linkedlist.print();

// 案例4 从尾到头打印链表 (注: 不使用翻转链表)
// 方法1 时间复杂度为2n
function consoleFromTail(linkedlist) {
  const stack = new StackByLinkedlist();
  currentNode = linkedlist.head;
  while (currentNode) {
    stack.push(currentNode.data);
    currentNode = currentNode.next;
  }

  while (stack.size() > 0) {
    console.log(stack.pop());
  }
}

// 方法2: 时间复杂度为n
function reversePrint(head) {
  if (head == null) {
    return;
  } else {
    reversePrint(head.next);
    console.log(head.data);
  }
}

// const link1 = new LinkedList();
// link1.append(1);
// link1.append(3);
// link1.append(5);
// link1.append(7);
// link1.append(9);
// link1.append(11);
// link1.append(13);
// link1.print();
// console.log("************************");
// reversePrint(link1.head);

// consoleFromTail(linkedlist);

// 案例5 合并两个有序列表函数 mergyLink
function mergyLink(link1, link2) {
  // 方法1 时间复杂度 > m + n
  // let currentNode = link1.head;
  // const arr = [];
  // while (currentNode) {
  //   arr.push(currentNode.data);
  //   currentNode = currentNode.next;
  // }
  // currentNode = link2.head;
  // while (currentNode) {
  //   arr.push(currentNode.data);
  //   currentNode = currentNode.next;
  // }
  // arr.sort((x, y) => x - y);
  // console.log(187, arr);

  // const link = new LinkedList();
  // arr.forEach((i) => link.append(i));
  // return link;

  // 方法2  时间负责度为m+n
  const link = new LinkedList();

  compare(link1.head, link2.head);
  function compare(item1, item2) {
    if (item1 === null && item2 === null) {
      return;
    } else if (item2 == null || item1.data <= item2.data) {
      link.append(item1.data);
      item1 = item1.next;
    } else if (item1 == null || item2.data < item1.data) {
      link.append(item2.data);
      item2 = item2.next;
    }
    compare(item1, item2);
  }

  return link;
}
// const link1 = new LinkedList();
// link1.append(1);
// link1.append(3);
// link1.append(5);
// link1.append(7);
// link1.append(9);
// link1.append(11);
// link1.append(13);
// link1.append(15);
// link1.append(16);
// link1.append(17);
// link1.append(18);
// link1.append(19);
// link1.print();
// console.log("************************");

// const link2 = new LinkedList();
// link2.append(2);
// link2.append(4);
// link2.append(6);
// link2.append(8);
// link2.append(10);
// link2.append(12);
// link2.print();
// console.log("************************");

// mergyLink(link1, link2).print();

// console.log(reversePrint(link1));

// reversePrint(link1.head);
// console.log(mergyLink(link1, link2));

// 案例6: 查找链表中第k个结点(k > 0). reverseFind 函数
// 方法1
function reverseFind(linkedlist, k) {
  const len = linkedlist.length;

  let currentNode = linkedlist.get(len - k);
  while (currentNode) {
    console.log(220, currentNode.data);
    currentNode = currentNode.next;
  }
}

// 方法2 可以使用两个游标

// reverseFind(link1, 3);

// 案例7 查找单链表的中间结点

// 方法1
function findMiddle(linkedlist) {
  const len = linkedlist.length;
  let middle;
  if (len % 2 == 0) {
    middle = len / 2;
    return [linkedlist.get(middle - 1), linkedlist.get(middle)];
  } else {
    middle = (len + 1) / 2;
    return linkedlist.get(middle - 1);
  }
}

// 方法2 使用两个游标
function middleNode(linkedlist) {
  let fast = linkedlist.head;
  let slow = linkedlist.head;

  while (fast) {
    if (fast.next) {
      fast = fast.next;
      slow = slow.next;
    }
    fast = fast.next;
  }

  return slow.data;
}
// const link1 = new LinkedList();
// link1.append(1);
// link1.append(3);
// link1.append(5);
// link1.append(7);
// link1.append(9);
// link1.append(11);
// link1.append(13);
// link1.print();
// console.log("******************");
// console.log(middleNode(link1));

//案例8 实现双向链表

// const doublelink = new DoubleLinkedList();
// doublelink.append(1);
// doublelink.append(3);
// doublelink.append(5);
// doublelink.append(7);
// doublelink.append(1000);
// doublelink.append(9);
// doublelink.append(11);
// doublelink.append(13);
// doublelink.print();
// console.log("************************");
// doublelink.backPrint();

// console.log("************************");
// doublelink.remove(7);
// doublelink.backPrint();

// console.log("************************");
// doublelink.print();
// doublelink.remove(3);
// doublelink.backPrint();


// const linkedList = new LinkedList()
// linkedList.append(1)
// linkedList.append(2)
// linkedList.append(3)
// linkedList.append(4)
// linkedList.append(5)
// linkedList.print();

// console.log('**********reverse**************')
// function reverserLinkedList (linkedList) {
//   let current = linkedList.head;
//   let next = current.next
//   current.next = null;
//   linkedList.tail = current

//   while (next) {
//     const node = next.next;
//     // console.log(369, current.data, next.data, node?node.data:node)
//     next.next = current;
//     current = next
//     next = node
//   }
//   linkedList.head = current
//   return linkedList
// }

// const result = reverserLinkedList(linkedList)
// result.print()


const linkedList  = new LinkedList()
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
const node = new Node(4)
linkedList.tail.next = node
linkedList.tail = node
linkedList.append(5)
linkedList.append(6)
linkedList.append(7)
linkedList.tail.next = node
linkedList.tail = node
// linkedList.print()

function checkHasRing(linkedlist) {
  let slow = linkedList.head
  let fast = linkedList.head

  slow = slow.next
  fast = fast.next.next

  while (slow !== fast) {
    slow = slow.next
    if (!fast.next.next) {
      return false
    }
    fast = fast.next.next
    if (slow === fast) return true
  }
  return false
}

console.log(411, checkHasRing(linkedList))