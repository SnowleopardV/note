const path = require('path')
const fs = require('fs')

const caches = {}

const requireSelf = (file) => {
  // 第1步, 将相对路径转换为绝对路径, 定位目标文件
  const absolutePath = path.resolve(__dirname, file)

  // 第2步, 检测缓存
  if (caches[absolutePath]) return caches[absolutePath]

  // 第3步, 读取目标文件内容
  const code = fs.readFileSync(absolutePath).toString()

  // 第4步, 包裹为一个函数并执行(自执行函数), 通过argeument.callee.toString() 查看自执行函数
  const module = {}
  const exports = (module.exports = {})

  ;(function (exports, require, module, __filename, __dirname) {
    eval(code)
  })(exports, requireSelf, module, __filename, __dirname)

  // 第5步, 缓存模块的值
  caches[absolutePath] = module.exports // 便于理解

  // 第6步, 返回module.exports的值
  return module.exports
}

const person = requireSelf('./module/person.js')

console.log(27, person)
