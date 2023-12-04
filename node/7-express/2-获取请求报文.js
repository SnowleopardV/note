const express = require('express')

const app = express()

app.get('/', (request, response) => {
  // 原生方法
  console.log(request.method)
  console.log(request.url)
  console.log(request.httpVersion)
  console.log(request.headers)

  // express 操作
  console.log(request.path)
  console.log(request.query)
  console.log(request.ip)
  // 获取某一个请求头
  console.log(request.get('host'))

  response.end('OK')
})

app.listen(9000)
