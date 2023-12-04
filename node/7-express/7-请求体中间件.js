const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

// create application/json parser 解析json格式请求体的中间件
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser, 解析查询字符串的请求体
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// urlencodedParser、jsonParser, 会解析请求体, 并且给request添加body属性
app.get('/login', (request, response) => {
  response.sendFile(path.resolve(__dirname, './pages/post.html'))
})

app.post('/login', urlencodedParser, (request, response) => {
  console.log(18, request.body)
  response.json('提交成功')
})

app.listen(9000, () => console.log('Server is running'))
