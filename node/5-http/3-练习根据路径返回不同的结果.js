const http = require('http')

const server = http.createServer((request, response) => {
  const url = new URL(request.url, 'http://127.0.0.1:9000')

  const pathname = url.pathname

  const result =
    pathname === '/login'
      ? '登录页面'
      : pathname === '/register'
      ? '注册页面'
      : '其他页面'

  response.setHeader('content-type', 'text/html;charset=utf-8')
  response.end(result)
})

server.listen(9000, () => {
//   console.log('服务启动啦')
})
