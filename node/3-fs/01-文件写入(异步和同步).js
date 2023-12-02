// 倒入fs模块
const fs = require('fs')

// 写入文件 异步
fs.writeFile('./座右铭.txt', '三人行, 必有我师', (result) => {
  // 写入失败,result 为错误对象, 写入成功, result 为 null
})

console.log(10)

// 写入文件 同步
fs.writeFileSync('./data.txt', 'test')

console.log(14)