const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((request, response) => {
  const { pathname } = new URL(request.url, 'http://127.0.0.1')

  let body = ''
  if (pathname === '/')
    body = fs.readFileSync(path.resolve(__dirname, './net/index.html'))
  else if (pathname === '/index.css')
    body = fs.readFileSync(path.resolve(__dirname, './net/index.css'))
  else if (pathname === '/index.js')
    body = fs.readFileSync(path.resolve(__dirname, './net/index.js'))
  else {
    response.statusCode = 404
    body = '<h1>404 Not Found</h1>'
  }

  // fs.readFile 返回的是Buffer, reponse.write和response.end 入参支持传入Buffer对象, 效果和传入字符串一样
  response.write(body)

  response.end()
})

server.listen(9000, () => {
  console.log('服务启动成功')
})
