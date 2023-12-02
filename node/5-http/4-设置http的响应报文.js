const http = require('http')

const server = http.createServer((request, response) => {

// 设置响应状态
  response.statusCode = 200
  response.statusCode = 203
  response.statusCode = 404

  // 设置响应状态描述
  response.statusMessage = 'Are you OK?'

  // 设置响应头
  response.setHeader('aaaaa', 'bbbbb')
  response.setHeader('Server', 'Nodejs')

  // 同名的响应头
  response.setHeader('test', ['a', 'b', 'c'])

  response.write('are you OK?\r\n')
  response.write('are you OK?\r\n')
  response.write('are you OK?\r\n')
   
  response.end()
})

server.listen(9000, () => {
  console.log('服务启动成功')
})
