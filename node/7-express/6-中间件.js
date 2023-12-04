// 中间件
const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

// 静态资源中间件
// 路径为/将默认去找index.html
app.use(express.static(path.resolve(__dirname, '../5-http/net')))

// 声明全局中间件
// 需要每一次的访问, 都添加访问日志
const recordLogMiddle = (request, response, next) => {
  fs.appendFileSync(
    path.resolve(__dirname, './log.txt'),
    `${new Date().toString()} ${request.ip} ${request.url}\r\n`
  )
  // 需要执行下一步
  next()
}

// 使用全局中间件
app.use(recordLogMiddle)

// 声明路由中间件
// 如果查询条件code==='521', 走正常逻辑, 否则走异常逻辑
const checkSignal = (request, response, next) => {
  const { code } = request.query

  if (code !== '521') response.send('暗号错误')
  else next()
}

app.get('/home', (request, response) => {
  response.send('前台首页')
})

// 使用路由中间件
app.get('/admin', checkSignal, (request, response) => {
  response.send('后台首页')
})

// 使用路由中间件
app.get('/setting', checkSignal, (request, response) => {
  response.send('设置页面')
})

app.listen(9000, () => {
  console.log('服务启动成功')
})
