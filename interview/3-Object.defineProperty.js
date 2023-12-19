// 一、Vue2 双向绑定原理 Object.defineProperty
const data = {}
let value = 'lilei'

Object.defineProperty(data, 'name', {
  // value: 'lilei',
  // writable: true,
  // enumerable: true,
  // configurable: true,
  get() {
    console.log(12)
    return value
  },
  set(newValue) {
    console.log(15, newValue)
    value = newValue
  },
})

console.log(data.name, data)
data.name = 'tom'
console.log(data.name, data)
