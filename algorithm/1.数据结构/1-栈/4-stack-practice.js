const Stack = require('./1-用数组表示栈')
// 案例1 判断一个字符串的括号是否合法
// sdf(sd[f]{}klj9(dsaf(sadfdsa)df)sadflkjj)   // 成对出现, 合法
// sdfa(asdfadsf(阿斯顿范德萨发的)(sad1234(   //不成对出现, 不合法

function isbracketsLegal(string) {
  let stack = new Stack()
  let arr = string.split('')

  while (arr.length) {
    const v = arr.shift()
    if (v === '(') {
      stack.push('(')
    } else if (v == ')') {
      if (stack.isEmpty()) {
        return false
      }
      stack.pop()
    }
  }
  if (stack.size()) {
    return false
  }
  return true
}

console.log(isbracketsLegal('sdf(sdfklj9(dsaf(sadfdsa)df)sadflkjj)'))
console.log(isbracketsLegal('sdfa(asdfadsf(阿斯顿范德萨发的)(sad1234('))

// 案例2 逆波兰表达式
// 1. 中序表达式    VS    后序表达式
//    1 + 2             1 2 +
//    1 + 2 + 3         3 1 2 + +

// 计算机通常是用后序表达式来处理计算
// 4 + 10 / 5
// [4, 10, 5, "/", "+"]
// [4, 2, "+"]
// [6]

function reversePolishNotation(arr) {
  const computer = ['+', '-', '*', '/']
  const stack = new Stack()
  while (arr.length) {
    const v = arr.shift()
    if (computer.indexOf(v) == -1) {
      stack.push(v)
    } else {
      if (stack.length < 2) {
        return false
      }
      const b = stack.pop()
      const a = stack.pop()
      stack.push(eval(a + v + b))
    }
  }
  if (stack.length > 1) {
    return false
  }
  return stack.pop()
}

console.log(reversePolishNotation([4, 10, 5, '/', '+']))  // 6
console.log(reversePolishNotation([4, 10, 5, 4, 2, '/', '+', '*', '-'])) // -66

// 案例3 提供一个有min方法的栈, min方法返回栈中最小的元素, 要求时间复杂度为O(1)
class MinStack {
  constructor() {
    this.stack_p = new Stack()
    this.minstack = new Stack()
  }
  push(item) {
    this.stack_p.push(item)
    if (this.minstack.isEmpty()) {
      this.minstack.push(item)
    } else if (item < this.minstack.top()) {
      this.minstack.pop()
      this.minstack.push(item)
    }
  }
  pop() {
    return this.stack_p.pop()
  }
  //....其他方法
  min() {
    return this.minstack.pop()
  }
}

// const stack = new MinStack();
// stack.push(1);
// stack.push(-9);
// stack.push(3);
// stack.push(5);
// stack.push(-1);
// stack.push(7);
// console.log(93, stack.min());

// 案例4 中序表达式转换成后序表达式
// 1 * (3 + 5)         [1, '*', '(', 3, '+', 5, ')']           [1, 3, 5, +, *]
// 1 * 3 + 5           [1, '*', 3, '+', 5]                     [5, 1, 3, *, +]
// (1 + 3) * 5         [1, '+', 3, '*', 5]                     [5, 1, 3, +, *]
// (1* (1 + 3) + 5)    [1, "*", "(", 1, "+", 3, ")", "+", 5]   [5, 1, 1, 3, +, *, +]
// 判断优先级
// 1. ()
// 2. * /
// 3. + -
function midToEnd(arr) {
  const stack = new Stack()

  const bracket = new Stack()

  const result = []
  const tempnumber = []
  const tempcomputer = []
  for (let i = arr.length - 1; i < 0; i--) {
    const v = arr[i]

    if (v === ')') {
      //每遇到一个)就创建一个stack;
      const stackStep = new Stack()
      stack.push(stackStep)
      bracket.push(')')

      stack.push(stackStep)
    } else if (v === '(') {
      const stackStep = stack.pop()
      const size = stackStep.size()

      const computer = new Stack()
      const number = new Stack()

      for (let i = 0; i < size; i++) {
        const v = stackStep.pop()
        if (['*', '/'].indexOf(v) != -1) {
          computer.push(v)
          tempcomputer.push(v)
        } else if (['+', '-']) {
          addComputer.push(v)
        } else {
          //数字
          if (
            (multiplecomputer.size() && multiplecomputer.pop() === '*') ||
            multiplecomputer.pop() === '/'
          )
            tempnumber.push(v)
        }
      }
      bracket.pop()
    } else {
      // 数字 和 运算符
      let stackStep = stack.pop()
      stackStep.push(v)
      stack.push(stackStep)
    }
  }
}

function computer(stack, arr) {
  const stackStep = stack.pop()
  const size = stackStep.size()

  const multiplecomputer = new Stack()
  const number = new Stack()

  for (let i = 0; i < size; i++) {
    const v = stackStep.pop()
    if (['*', '/'].indexOf(v) != -1) {
      multiplecomputer.push(v)
      tempcomputer.push(v)
    } else if (['+', '-']) {
      multiplecomputer.push(v)
    } else {
      //数字

      if (multiplecomputer.top() == '*' || multiplecomputer.top == '/') {
      }
    }
  }
}

// 案例5 用两个栈实现一个队列
class QueByStack {
  constructor() {
    this._item1 = Symbol('item1')
    this._item2 = Symbol('item2')

    this[this._item1] = new Stack()
    this[this._item2] = new Stack()
  }
  enqueue(item) {
    while (this[this._item2].size() > 0) {
      this[this._item1].push(this[this._item2].pop())
    }
    this[this._item1].push(item)

    while (this[this._item1].size() > 0) {
      this[this._item2].push(this[this._item1].pop())
    }
  }

  dequeue() {
    return this[this._item2].pop()
  }

  size() {
    return this[this._item2].size()
  }

  clear() {
    this[this._item2].clear()
  }
}

const queue = new QueByStack()
// queue.enqueue(1)
// queue.enqueue(2)
// queue.enqueue(3)
// queue.enqueue(4)

// console.log(queue.dequeue())
// console.log(queue.dequeue())
// console.log(queue.dequeue())
// queue.enqueue(5)
// console.log(queue.size())
// console.log(queue.dequeue())
// console.log(queue.dequeue())
