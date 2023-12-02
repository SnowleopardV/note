const fs = require('fs')

// 异步: unlink 和 rm(14.4新增)
// 同步: unlinkSync 和 rmSync (14.4新增)

fs.unlink('./待删除的文件.txt', (err) => {
  console.log(4, err)
})

fs.rm('./待删除的文件2.txt', (err) => {
  console.log(8, err)
})


fs.unlinkSync('./待删除的文件.txt')

fs.rmSync('./待删除的文件2.txt')