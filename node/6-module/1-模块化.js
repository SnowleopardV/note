const tiemo = require('./module/tiemo')
const { kaochang, shougongyi } = require('./module/baitan')
const { qianduan, houduan } = require('./module/office')
const ceshi = require('./module/ceshi.abc')
const haha = require('./module')

// module.exports、exports、require是CommonJS模块化规范的内容, Nodejs实现了CommonJS模块化的规范
// js和json文件导入时可以不用写后缀,c/c++编写的node扩展文件也可以不写后缀, 注意: .js的优先级高于.json
// 如果导入的是文件夹, 则首先会检测该文件夹下package.json文件中main属性对应的文件
// 如果main属性或者package.json不存在,则检测该文件夹下的index.js和index.json, package.json中main属性的优先级高于indexjs和index.json
// 如果还没有找到, 则会报错

tiemo()
kaochang()
shougongyi()
qianduan()
houduan()
ceshi()
haha()
