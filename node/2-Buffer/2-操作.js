// buffer和字符串的转换
const buf_1 = Buffer.from('hello')
console.log(buf_1)

const buf_2 = Buffer.from([104, 101, 108, 108, 111])
console.log(buf_2, buf_2.toString(), buf_2 + buf_2) // 默认utf-8的编码方式

// buffer的读写
// 单个元素的查看
console.log(buf_2[0],  buf_2[0].toString(2)) // 打印出来是1101000, 实际应该是01101000

// 单个元素的修改
buf_2[0] = 95
console.log(buf_2, buf_2.toString())

 
// 中文
const buf_3 = Buffer.from('你好') // utf-8 一个中文占3个字节
console.log(buf_3, buf_3.toString())

// Buffer的+法
const buf_4 = Buffer.from('你好')

console.log(23, typeof buf_3, typeof buf_4, typeof(buf_3 + buf_4), (buf_3 + buf_4), (buf_3 + buf_4).toString())