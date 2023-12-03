const uniq = require('uniq')
const arr = [1, 2, 1, 6, 4, 2, 1, 3, 4, 5, 6, 3, 2]

// 等价于 uniq = require('./node_modules/uniq')
// 因为./node_modules/uniq中package.json的main属性指向uniq.js, 所以也等价于uniq = require('./node_modules/uniq/uniq')

console.log(uniq(arr))
