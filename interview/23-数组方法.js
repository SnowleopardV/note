// 一、判断是否是一个数组
// 1. Array.isArray
// const arr = [1, 2, 3]
// const str = '123'
// const obj = {}

// console.log(7, Array.isArray(arr))
// console.log(8, Array.isArray(str))
// console.log(9, Array.isArray(obj))

// 二、判断是否包含某个元素
// 1. indexOf(item, start) 第二个参数为可选参数, 表示起始位置(含)
// const arr = [1, 2, 3, 4, 5]
// console.log(14, arr.indexOf(3))
// console.log(15, arr.indexOf(3, 2))
// console.log(16, arr.indexOf(3, 3))

// 2. lastIndexOf(item, start) 第二个参数为可选参数, 表示起始位置(含)
// const arr = [1, 2, 3, 4, 5]
// console.log(20, arr.lastIndexOf(3))
// console.log(21, arr.lastIndexOf(3, 2))
// console.log(22, arr.lastIndexOf(3, 1))

// 3. findIndex((item, index, arr) => {}, this) 第2个参数为可选参数, 表示传入的this, 返回满足条件的第一个元素, 否则为-1
const arr = [1, 2, 3, 4, 5]
console.log(
  26,
  arr.findIndex((item, index, arr) => {
    console.log(27, item, index, arr)
    return item > 2
  })
)
