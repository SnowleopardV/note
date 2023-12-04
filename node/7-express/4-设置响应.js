// 导入express
const express = require('express')

// 创建应用对象
const app = express()

// 创建路由
app.get('/home', (request, response) => {
  // http原生模块的写法
  // response.statusCode = 404
  // response.statusMessage = 'hello'
  // response.setHeader('aaaa', 'bbbb')
  // response.write('hello express\r\n')
  // response.end('hello express2')

  // express的写法
  response.status(405)
  response.set('cccc', 'dddd')
  response.send('hello this is express operate')

  // express的操作可以链式调用
  // response.status(405).set('cccc', 'dddd').send('hello this is express operate')
})

// 最后兜底规则
app.all('*', (request, response) => {
  response.statusCode = 404
  response.end('404 Not Found')
})

// 端口监听
app.listen(9000, () => {
  console.log('express 服务已经启动, 正在监听9000端口')
})
