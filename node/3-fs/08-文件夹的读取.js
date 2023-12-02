const fs = require('fs')

console.log(3, fs)

// 文件夹读取 (异步)
fs.readdir('./', (err, data) => {
  if (err) return console.log(err)
  console.log(data)
})

// 文件夹的读取 (同步)
fs.readdirSync('./')
