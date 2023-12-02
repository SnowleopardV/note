// 创建buffer
console.log(Buffer)
// 1. alloc
let buf_1 = Buffer.alloc(10)
console.log(buf_1)

// 2. allocUnsafe (不会对旧数据清零)
const buf_2 = Buffer.allocUnsafe(1000)
console.log(buf_2)

// 3. from
const buf_3 = Buffer.from('hell0')
console.log(buf_3)

const buf_4 = Buffer.from([1, 2, 3, 4, 5])
console.log(buf_4)
