const fs = require('fs')

// 文件的重命名 异步
fs.rename('./观书有感.txt', './古诗.txt', (err) => {
  console.log(5, err)
})


// 文件的移动 异步
fs.rename('./座右铭.txt', './txt/座右铭.txt', err => {
  console.log(11, err)
})


// fs.renameSync  同步
