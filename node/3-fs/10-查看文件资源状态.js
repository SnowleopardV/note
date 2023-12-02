const fs = require('fs')

// 查看文件资源状态 (异步)
fs.stat('./古诗.txt', (err, data) => {
  if (err) console.log(err)
  else console.log(data, data.isFile(), data.isDirectory)
})

// 查看文件资源状态 (同步)
fs.statSync('./古诗.txt')
