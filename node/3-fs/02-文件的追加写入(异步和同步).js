// 倒入fs模块
const fs = require('fs')

// 追加写入 异步

fs.appendFile(
  './座右铭.txt',
  '\r\n则其善者而从之, 其不善者而改之',
  (result) => {
    // 写入失败,result 为错误对象, 写入成功, result 为 null
  }
)

// 写入文件 同步
fs.appendFileSync('./data.txt', '\r\nresult is OK')

fs.writeFile('./座右铭.txt', '\r\n哈哈哈', { flag: 'a' }, (result) => {
  // 写入失败,result 为错误对象, 写入成功, result 为 null
})

fs.writeFile('./data.txt', '\r\nare you OK?', { flag: 'a' }, (result) => {
  // 写入失败,result 为错误对象, 写入成功, result 为 null
})
console.log(14)
