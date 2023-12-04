const express = require('express')
const path = require('path')

const app = express()

// 设置模板引擎
app.set('view engine', 'ejs') // 其他的模板引擎,如pug, twing

// 设置模板文件存放位置
app.set('views', path.resolve(__dirname, './pages'))

// 创建路由
app.get('/home', (request, response) => {
  const title = '今天是个好日子'

  // render响应
  // response.render(模板文件名, 变量)
  response.render('home', { title })
})

app.listen(9000, () => console.log('server is running....'))
