// 一、Math
// 1. Math.abs(x) 绝对值
// const a = -1000.001
// const b = 1000.001
// console.log(3, Math.abs(a), a + Math.abs(a), Math.abs(b), b - Math.abs(b))

// 2. Math.ceil(x) 向上取整(>=原数值的最小整数)
// const a = -2.9999
// const b = 2.0001
// const c = 4
// console.log(9, Math.ceil(a), Math.ceil(b), Math.ceil(c))

// 3. Math.floor(x) 向下取整(<=原数值的最大整数)
// const a = -2.9999
// const b = 2.9999
// const c = 4
// console.log(10, Math.floor(a), Math.floor(b), Math.floor(c))

// 4. Math.max(...nums) 返回数值中最大的值
// console.log(19, Math.max(-888, -0.999, 30000, 23, -777777777, 0.888, 15, 9000))

// 5. Math.min(...nums) 返回数值中最小的值
// console.log(19, Math.min(-888, -0.999, 30000, 23, -777777777, 0.888, 15, 9000))

// 6. Math.random() 生成一个0-1之间的随机数
// console.log(25, Math.random(), Math.random(), Math.random())

// 7. Math.round(x) 四舍五入
// const a = -2.9999
// const b = -2.0001
// const c = 3.4
// const d = 3.9
// console.log(Math.round(a), Math.round(b), Math.round(c), Math.round(d))

// 8. Math.sign(x) 返回数值的符号
// const a = -2.9999
// const b = -4
// const c = 5.00001
// const d = 1
// const e = 0
// console.log(
//   40,
//   Math.sign(a),
//   Math.sign(b),
//   Math.sign(c),
//   Math.sign(d),
//   Math.sign(e)
// )

// 9. Math.trunc(x) 去除一个数值除其小数点之后的部分, 返回一个数的整数
const a = -2.9999
const b = -4.999
const c = 5.00001
const d = 1
const e = 0
console.log(
  55,
  Math.trunc(a),
  Math.trunc(b),
  Math.trunc(c),
  Math.trunc(d),
  Math.trunc(e)
)
