const express = require('express')
const fs = require('fs')
const ejs = require('ejs') // 还有其他的模版引擎, 如pug, twing
const path = require('path')

const app = express()

const templateStr = '你好啊 <%= name %>'
const str = ejs.render(templateStr, { name: '邓紫棋' })
console.log(11, str)

// 插入变量
app.get('/', (request, response) => {
  const china = '中国'
  const weather = '今天天气不错~~~~'

  const htmlContent = fs
    .readFileSync(path.resolve(__dirname, './pages/template.html'))
    .toString()

  const html = ejs.render(htmlContent, { china, weather })
  console.log(21, html)
  response.end(html)
})

// 列表渲染
app.get('/xiyou', (request, response) => {
  const xiyou = ['唐僧', '孙悟空', '猪八戒', '沙僧']
  const htmlContent = fs
    .readFileSync(path.resolve(__dirname, './pages/xiyou.html'))
    .toString()
  const html = ejs.render(htmlContent, { xiyou })
  response.end(html)
})

// 条件渲染
app.get('/login', (request, response) => {
  const isLogin = Math.random() > 0.5
  const htmlContent = fs
    .readFileSync(path.resolve(__dirname, './pages/login.html'))
    .toString()
  const html = ejs.render(htmlContent, { isLogin })
  console.log(37, html)

  response.end(html)
})

app.listen(9000, () => console.log('Server is running....'))
