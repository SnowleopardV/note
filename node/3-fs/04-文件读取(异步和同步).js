const fs = require('fs')

//  异步读取
fs.readFile('./观书有感.txt', (err, data) => {
  if (err) {console.log('读取失败')}
	// data是一个Buffer对象
	else console.log(data, data.toString())
})

// 同步读取
const data = fs.readFileSync('./观书有感.txt')
// data是一个Buffer对象
console.log(data, data.toString())