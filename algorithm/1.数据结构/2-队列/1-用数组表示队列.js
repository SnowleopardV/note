class Queue {
  constructor() {
    this._items = Symbol('items')
    this[this._items] = []
  }
  enqueue(item) {
    this[this._items].push(item)
  }
  dequeue() {
    if (this[this._items].length) {
      return this[this._items].shift()
    }
    return false
  }
  head() {
    return this[this._items][0]
  }
  clear() {
    this[this._items] = []
  }
  isEmpty() {
    return this[this._items].length ? false : true
  }
  size() {
    return this[this._items].length
  }
}

module.exports = Queue
