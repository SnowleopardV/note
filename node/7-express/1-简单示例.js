// 导入express
const express = require('express')

// 创建应用对象
const app = express()

// 创建路由
app.get('/home', (request, response) => {
  response.end('hello express')
})
// express会自动处理异常场景
// 如匹配不上的场景, 返回statusCode 404, 内容 Cannot GET **

app.post('/login', (request, response) => {
  response.setHeader('content-type', 'text/html;charset=utf-8')
  response.end('登录成功')
})

// 任意请求方式都将被接收
app.all('/hello', (request, response) => {
  response.end('hello, how are you')
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
