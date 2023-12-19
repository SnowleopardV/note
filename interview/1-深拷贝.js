// 1. 简单粗暴 JSON.stringify JSON.parse, 仅针对对象中没有undefined、函数
const obj = {
  name: 'jack',
  age: 10,
  friends: ['tom', 'jerry'],
  car: {
    name: 'Benz',
    price: 100,
  },
}

const arr = [1, 'lilei', { name: 'niu' }]

const newObj = JSON.parse(JSON.stringify(obj))
const newArr = JSON.parse(JSON.stringify(arr))

console.log(newObj, newObj === obj)
console.log(newArr, newArr === arr)

// 递归遍历
// 经典写法
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj

  let newObj = Array.isArray(obj) ? [] : {}

  for (let key in obj) {
    newObj[key] = deepClone(obj[key])
  }

  return newObj
}
console.log(35, deepClone(obj))
