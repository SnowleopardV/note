const qianduan = () => console.log('前端....')

const houduan = () => console.log('后端....')

console.log(exports === module.exports, exports)

// 通过修改属性的方式, 可以改到module.exports
exports.qianduan = qianduan
exports.houduan = houduan

// 如果通过直接赋值的方式, 是不会改到module.exports, 而require是读取的模块的module.exports, require的结果将是一个{}
// exports = '1111'
