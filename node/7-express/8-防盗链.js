// 中间件
const express = require('express')
const fs = require('fs')
const { hostname } = require('os')
const path = require('path')

const app = express()

const antiTheftChain = (request, response, next) => {
  const referer = request.get('referer')

  if (referer) {
    const { hostname: host } = new URL(referer)

    console.log(14, hostname)
    if (host !== '127.0.0.1') {
      response.status(404)
      response.send('<h1>404 Not Found</h1>')
      return
    }
  }

  next()
}

app.use(antiTheftChain)

app.use(express.static(path.resolve(__dirname, '../5-http/net')))

app.listen(9000, () => {
  console.log('服务启动成功')
})
