const http = require('http')
const url = require('url')

const server = http.createServer((request, response) => {
  //  请求的方法
  console.log(request.method)

  // 请求的url(路径和查询字符串, 需要进一步解析)
  console.log(request.url)

  if (request.method === 'POST') {
    // 方式一
    const urlObj = url.parse(request.url)
    const urlObj2 = url.parse(request.url, true)

    console.log(urlObj, urlObj2)

    // 方式二
    const urlObj3 = new URL(request.url, 'http://127.0.0.1:9000')
    // 或者 const urlObj3 = new URL('http://127.0.0.1:9000' + request.url)
    console.log(urlObj3, urlObj3.searchParams.get('content'))
  }

  // 请求的请求头
  console.log(request.headers)

  // 请求的请求体
  let body = ''

  request.on('data', (chunk) => {
    // chunk 是一个Buffer对象
    // console.log(17, chunk)

    // Buffer对象 + Buffer对象, 得到一个字符串
    body += chunk
  })

  request.on('end', () => {
    // console.log(25, body)

    response.setHeader('content-type', 'text/html;charset=utf-8')
    response.end('提交成功')
  })

  // response.setHeader('content-type', 'text/html;charset=utf-8')
  // response.end('哈哈哈哈哈哈哈哈哈哈哈哈')
})

server.listen(9000, () => {
  console.log('服务启动啦')
})
