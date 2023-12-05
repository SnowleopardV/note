const express = require('express')
const path = require('path')
const formidable = require('formidable')

// console.log(5, formidable, typeof formidable)

const app = express()

// 设置模板引擎
app.set('view engine', 'ejs') // 其他的模板引擎,如pug, twing

// 设置模板文件存放位置
app.set('views', path.resolve(__dirname, './pages'))

// 创建路由
app.get('/portrait', (request, response) => {
  const title = '个人资料'
  response.render('portrait', { title })
})

app.post('/portrait', (request, response, next) => {
  const form = formidable({
    multiples: true,
    // 设置上传文件的保存目录
    uploadDir: path.resolve(__dirname, './images/'),
    // 保存文件后缀
    keepExtensions: true,
  })

  form.parse(request, (error, fields, files) => {
    if (error) {
      next(error)
    }
    response.json({ fields, files })
    // text radio select checkbox的字段放在fields里面
    // 文件放在files里面
  })

  // response.send('提交成功')
})

app.listen(9000, () => console.log('server is running....'))
