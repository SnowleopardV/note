const http = require('http')

console.log(3, http)

// 创建服务对象
const server = http.createServer((request, response) => {
  // response.end('hello http server')

  // 如果返回的是中文, 需要添加一个响应头, 不然会是乱码
  response.setHeader('content-type', 'text/html;charset=utf-8')
  response.end('你好啊')
})

// 监听端口, http服务默认是80端口
server.listen(9000, () => {
  console.log('服务已经启动')
})
