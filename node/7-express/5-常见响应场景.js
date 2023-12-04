// 导入express
const express = require('express')
const path = require('path')

// 创建应用对象
const app = express()

// 创建路由
app.get('/redirect', (request, response) => {
  // 重定向
  response.redirect('https://www.baidu.com')
})

app.get('/download', (request, response) => {
  // 下载文件
  response.download(__dirname + '/' + 'package.json')
})

app.get('/home', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../5-http/net/index.html'))
})

app.get('/json', (request, response) => {
  response.json({
    name: 'jack',
    age: 100,
    sex: 'male',
  })
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
