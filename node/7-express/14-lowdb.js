const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('./db/db.json')
const db = low(adapter)

// 数据库的初始化
db.defaults({ posts: [], user: {} }).write()

// 写入数据
db.get('posts').push({ id: 1, title: '今天天气不错啊' }).write()
db.get('posts').push({ id: 1, title: '今天天气不错啊' }).write()
db.get('posts').push({ id: 2, title: '今天天气不错啊' }).write()
db.get('posts').push({ id: 3, title: '今天天气不错啊' }).write()

db.set('user.name', '老王').write()
db.set('user.age', 20).write()
db.set('user.sex', 'male').write()

// 获取数据
console.log(db.get('posts').value())
console.log(db.get('user').value())
// 获取单条数据
console.log(23, db.get('posts').find({ id: 1 }).value())
console.log(24, db.get('user.age').value(), db.get('user.name').value())

// 删除数据
db.get('posts').remove({ id: 1 }).write()
const result = db.get('posts').remove({ id: 2 }).write()
console.log(db.get('posts').value(), result)
db.unset('user.sex').write()
console.log(db.get('user').value())

// 更新数据
db.get('posts').find({ id: 3 }).assign({ title: '下大雨了' }).write()
db.set('user.age', 1000).write()
