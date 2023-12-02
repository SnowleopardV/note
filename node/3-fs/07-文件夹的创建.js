const fs = require('fs')

// 创建单个文件夹 (异步)
fs.mkdir('./html', (err) => {
  if (err) console.log(err)
  else console.log('创建成功.')
})

// 创建嵌套文件夹  (异步)
fs.mkdir('./a/b/c/d', { recursive: true }, (err) => {
  if (err) console.log(err)
  else console.log('创建成功.')
})

// 创建单个文件夹 (同步)
fs.mkdirSync('./html') 

// 创建单个文件夹 (同步)
fs.mkdirSync('./html', { recursive: true })


console.log(15, fs)
