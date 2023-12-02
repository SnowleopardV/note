const fs = require('fs')

// 删除文件夹 异步
fs.rmdir('./html', (err) => {
  if (err) console.log(err)
  else console.log('删除成功')
})

// 递归删除 异步 (不推荐)
// fs.rmdir('./a', { recursive: true }, (err) => {
//   if (err) console.log(err)
//   else console.log('删除成功')
// })

// 递归删除 异步 (推荐)
fs.rm('./a', { recursive: true }, (err) => {
  if (err) console.log(err)
  else console.log('删除成功')
})

// 删除文件夹 同步
fs.rmdirSync('./html2')
