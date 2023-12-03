const http = require('http')
const fs = require('fs')
const path = require('path')

const mimes = {
  html: 'text/html',
  css: 'text/css',
  js: 'text/javascript',
  png: 'image/png',
  jpg: 'image/jpeg',
  gif: 'image/gif',
  mp4: 'video/mp4',
  mp3: 'audio/mpeg',
  json: 'application/json',
}

const server = http.createServer((request, response) => {
  let { pathname } = new URL(request.url, 'http://127.0.0.1')

  // let body = ''

  // if (pathname === '/')
  //   body = fs.readFileSync(path.resolve(__dirname, './net/index.html'))
  // else if (pathname === '/index.css')
  //   body = fs.readFileSync(path.resolve(__dirname, './net/index.css'))
  // else if (pathname === '/index.js')
  //   body = fs.readFileSync(path.resolve(__dirname, './net/index.js'))
  // else {
  //   response.statusCode = 404
  //   body = '<h1>404 Not Found</h1>'
  // }

  // fs.readFile 返回的是Buffer, reponse.write和response.end 入参支持传入Buffer对象, 效果和传入字符串一样
  // response.write(body)
  // response.end()

  if (pathname === '/') pathname = '/index.html'

  const root = path.resolve(__dirname, './net')
  // path.resolve(__dirname, './net) 称为静态资源目录,也叫网站的根目录

  const filePath = root + pathname

  const ext = path.extname(filePath).slice(1)

  if (ext === 'html' && request.method !== 'GET') {
    response.statusCode = 405
    response.write('<h1>405 Method Not Allowed</h1>')
    response.end()
    return
  }

  let mime = mimes[ext] || 'application/octet-stream'
  mime = ext === 'html' ? mime + ';charset=utf-8' : mime
  // 对于未知的资源类型, 可以选择application/octet-stream类型,浏览器遇到该类型, 会对响应体内容进行独立存储, 也就是我们常见的下载效果
  // 为了解决中文乱码问题, 可以在mime加上charset=utf-8, 注意: 这个charset的优先级是比html文件中的<meta charset="UTF-8">优先级要高
  // 其他资源都将以html的字符集来解析,所以不需要每一个资源都需要设置charset=utf-8
  response.setHeader('content-type', mime)

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(54, err)
      let statusCode = 200
      let content = ''
      // 错误处理
      switch (err.code) {
        case 'ENOENT': {
          statusCode = 404
          content = '<h1>404 Not Found</h1>'
          break
        }
        case 'EPERM': {
          statusCode = 403
          content = '<h1>403 Forbidden</h1>'
          break
        }
        default: {
          statusCode = 500
          content = '<h1>Internetal Server Error</h1>'
          break
        }
      }
      response.statusCode = statusCode
      response.write(content)
    } else {
      // console.log(40, data)
      response.write(data)
    }
    response.end()
  })
})

server.listen(9000, () => {
  console.log('服务启动成功')
})
