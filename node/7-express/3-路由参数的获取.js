const express = require('express')

const app = express()

// json文件可以直接require, 不需要使用fs.readFile
const singers = require('./json/singers')
console.log(7, singers)

// 用占位符获取路由参数
// app.get('/:id1/:id2.html', (request, response) => {
//   console.log(6, request.params.id1, request.params.id2, request.params)

//   response.end(`hello ${request.params.id1 + '/' + request.params.id2}`)
// })

app.get('/:id.html', (request, response) => {
  const { id } = request.params

  const singer = singers.find((item) => item.id === Number(id))

  if (!singer) {
    response.statusCode = 404
    response.end('404 Not Found')
    return
  }

  response.end(`<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  
  <body>
    singer: ${singer.singer}
    song: ${singer.song}
  </body>
  
  </html>`)
})

app.listen(9000)
