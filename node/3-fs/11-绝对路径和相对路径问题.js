const fs = require('fs')

fs.writeFile('/Users/wangganqing/Desktop/hah.txt', '这是一个测试', (err) => {
  if (err) console.log(err)
  else console.log('创建成功')
})

// 注意: 相对路径的参照物不是代码文件, 而是命令行的工作目录
fs.writeFile('./hah.txt', '这是一个测试', (err) => {
  if (err) console.log(err)
  else console.log('创建成功')
})

// __dirname '全局变量',保存的是, 当前文件所在的目录的绝对路径
console.log(14, __dirname)

// __filename '全部变量', 保存的是, 当前文件的绝对路径
console.log(18, __filename)

fs.writeFile(__dirname + '/hah2.txt', '这是一个测试', (err) => {
  if (err) console.log(err)
  else console.log('创建成功')
})
