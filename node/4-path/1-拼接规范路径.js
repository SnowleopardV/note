const path = require('path')

// path.resolve 第一参数为绝对路径, 后续参数为相对路径
console.log(path.resolve(__dirname, './index.html'))
console.log(path.resolve(__dirname, 'index.html', 'hha.txt'))
console.log(path.resolve(__dirname, '/index.html', 'hha.txt'))