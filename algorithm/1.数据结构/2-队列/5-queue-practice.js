const Queue = require('./1-用数组表示队列')
// 案例1 约瑟夫环
// 有一个数组a[100], 存在0-99, 要求每隔两个数删掉一个数, 到末尾时, 循环至开头继续进行, 求最后一个被删除的数
// [0, 1, 2, 3, 4, 5, 6, ... 98, 99]  -> 删除2, 5, 8,....  ->  [0, 1, 3, 4, 6, ...]

function josephRing(arr) {
  const queue = new Queue()

  for (let i = 0; i < arr.length; i++) {
    queue.enqueue(arr[i])
  }

  let step = 0
  while (queue.size() > 1) {
    let item = queue.dequeue()
    if (step++ % 3 !== 0) {
      queue.enqueue(item)
    }
  }
  return queue.head()
}

let arr = []
for (let i = 0; i < 100; i++) {
  arr.push(i)
}

console.log(josephRing(arr));

// 案例2 斐波那契数列
// f(n) = f(n-1) + f(n-2)

function fibonacci(n) {
  const queue = new Queue()

  if (n === 0) return 0
  else if (n === 1) return 1

  queue.enqueue(0)
  queue.enqueue(1)

  for (let i = 2; i < n + 1; i++) {
    const item = queue.dequeue()
    const head = queue.head()
    queue.enqueue(item + head)
  }

  queue.dequeue()
  return queue.head()
}

console.log(
  fibonacci(0),  // 0
  fibonacci(1),  // 1
  fibonacci(2),  // 3
  fibonacci(3),  // 6
  fibonacci(4),  // 10
  fibonacci(5),
  fibonacci(6),
  fibonacci(100)
);

// 案例3: 用两个队列实现一个栈
class StackByQue {
  constructor() {
    this._item1 = Symbol('que1')
    this._item2 = Symbol('que2')

    this[this._item1] = new Queue()
    this[this._item2] = new Queue()
  }

  push(item) {
    if (this[this._item1].size() >= 1) {
      const it = this[this._item1].dequeue()
      this[this._item2].enqueue(it)
    }
    this[this._item1].enqueue(item)
  }

  pop() {
    const popItem = this[this._item1].dequeue()
    while (this[this._item2].size() > 0) {
      this[this._item1].enqueue(this[this._item2].dequeue())
    }
    while (this[this._item1].size() > 1) {
      this[this._item2].enqueue(this[this._item1].dequeue())
    }
    return popItem
  }

  top() {
    return this[this._item1].head()
  }

  size() {
    return this[this._item1].size() + this[this._item2].size()
  }

  clear() {
    this[this._item1] = []
    this[this._item2] = []
  }

  isEmpty() {
    return this[this._item1].length > 0 ? false : true
  }
}

// const stack = new StackByQue();
// stack.push(1);
// stack.push(2);
// stack.push(3);
// console.log(107, stack.top());
// console.log(108, stack.pop());
// console.log(109, stack.pop());
// console.log(110, stack.size());
// console.log(111, stack.pop());
// console.log(112, stack.size());

// 案例4 打印杨辉三角
//         1
//      1     1
//   1     2     1
// 1    3     3     1
//....

function yanghuiTriangle(n) {
  console.log([1])
  if (n == 1) {
    return
  }
  console.log([1, 1])
  if (n == 2) {
    return
  }
  const queue = new Queue()

  queue.enqueue(1)
  queue.enqueue(1)

  for (let i = 2; i < n; i++) {
    const len = queue.size()

    let arr = []
    for (let j = 0; j < len; j++) {
      //取出当前元素
      let it = queue.dequeue()
      // 下一个元素
      let next = queue.head()
      if (j == 0 || j == len - 1) {
        arr.push(it)
        queue.enqueue(it)
      }
      if (j != len - 1) {
        let add = it + next
        arr.push(add)
        queue.enqueue(add)
      }
    }
    console.log(arr)
  }
}

yanghuiTriangle(7);

// 案例5  迷宫寻路, 1为障碍, 0可通行, 求mazeArray[2][1] 到 mazeArray[3][5]的最短距离
// 待完成
const s = 'start'
const e = 'end'
const mazeArray = [
  [0, 0, 1, 0, 0, 0, 0],
  [0, 0, 1, 1, 0, 0, 0],
  [0, s, 0, 0, 1, 0, 0],
  [0, 0, 0, 1, 1, e, 0],
  [1, 0, 0, 0, 1, 0, 0],
  [1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0, 0],
]

;(225)[(3, 2, [2, 1])]
;(225)[(2, 3, [3, 2])]
;(225)[(1, 4, [2, 3])]
;(225)[(2, 5, [1, 4])]

function bestWay(mazeArray) {
  const queue = new Queue()
  getMin([2, 1, [null, null]])
  function getMin([i, j, [m, n]]) {
    let min
    let x
    let y
    if ((3 - i) * (3 - i) + (5 - j) * (5 - j) == 1) {
      return
    }
    if (i - 1 > -1 && mazeArray[i - 1][j] != 1) {
      x = i - 1
      y = j

      min = (3 - x) * (3 - x) + (5 - y) * (5 - y)
      //console.log(192, min, [x, y, [i, j]]);
      queue.enqueue([x, y, [i, j]])
    }

    if (j + 1 < 7 && mazeArray[i][j + 1] != 1) {
      x = i
      y = j + 1

      if (!min || (3 - x) * (3 - x) + (5 - y) * (5 - y) < min) {
        min = (3 - x) * (3 - x) + (5 - y) * (5 - y)
        //console.log(203, min, [x, y, [i, j]]);
        queue.dequeue()
        queue.enqueue([x, y, [i, j]])
      }
    }

    if (i + 1 < 7 && mazeArray[i + 1][j] != 1) {
      x = i + 1
      y = j

      if (!min || (3 - x) * (3 - x) + (5 - y) * (5 - y) < min) {
        min = (3 - x) * (3 - x) + (5 - y) * (5 - y)
        //console.log(214, min, [x, y, [i, j]]);
        queue.dequeue()
        queue.enqueue([x, y, [i, j]])
      }
    }

    if (j - 1 > -1 && mazeArray[i][j - 1] != 1) {
      x = i
      y = j - 1

      if (!min || (3 - x) * (3 - x) + (5 - y) * (5 - y) < min) {
        min = (3 - x) * (3 - x) + (5 - y) * (5 - y)
        queue.dequeue()
        queue.enqueue([x, y, [i, j]])
      }
    }

    //console.log(230, queue);
    const it = queue.dequeue()
    // console.log(243, it, it[0], it[1], m, n);
    // 如果最小的为上一个元素, 则把当前元素置为1
    if (it[0] === m && it[1] === n) {
      mazeArray[i][j] = 1
      console.log(245, mazeArray)
      getMin(it)
    } else {
      // 如果最小的不是上一个元素, 则将上一个元素置为1
      if (m && n) {
        mazeArray[m][n] = 1
        console.log(251, mazeArray)
      }
      queue.enqueue(it)
      getMin(it)
    }
  }
}

// bestWay(mazeArray)
