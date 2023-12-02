// Js 方式表现stack
// 用数组实现栈的结构
class Stack {
  constructor() {
    // 模拟私有属性
    this._items = Symbol('items')
    this[this._items] = []
  }
  push(item) {
    this[this._items].push(item)
  }
  pop() {
    if (this[this._items].length) {
      return this[this._items].pop()
    }
    return false
  }
  top() {
    return this[this._items][this[this._items].length - 1]
  }
  isEmpty() {
    return this[this._items].length ? false : true
  }
  clear() {
    this[this._items] = []
  }
  size() {
    return this[this._items].length
  }
}

module.exports = Stack
