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

// 端口监听
app.listen(9000, () => {
  console.log('express 服务已经启动, 正在监听9000端口')
})
