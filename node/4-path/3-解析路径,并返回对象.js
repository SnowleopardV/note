const path = require('path')

let str = '/Users/wangganqing/P/2023/node/3.fs'

let str2 = '\\Users\\wangganqing\\P\\2023\\node\\3.fs' // windows下的路径表示

console.log(5, path.parse(str))
console.log(6, path.parse(str2))