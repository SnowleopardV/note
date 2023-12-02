const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((request, response) => {
  const body = fs.readFileSync(path.resolve(__dirname, '模板页面.html'))

  // fs.readFile 返回的是Buffer, reponse.write和response.end 入参支持传入Buffer对象, 效果和传入字符串一样
  console.log(8, body)

  response.write(body)

  response.end()
})

server.listen(9000, () => {
  console.log('服务启动成功')
})
