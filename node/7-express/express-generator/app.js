var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan') // 日志相关的工具

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// 中间件
app.use(logger('dev')) // 日志中间件
app.use(express.json()) // 请求体中间件
app.use(express.urlencoded({ extended: false })) // 请求体中间件
app.use(cookieParser()) // 解析cookie的中间件
app.use(express.static(path.join(__dirname, 'public'))) // 静态资源中间件

app.use('/', indexRouter) // 设置路由的时候, 是可以设置路由前缀的
app.use('/users', usersRouter)

// catch 404 and forward to error handler 404错误处理
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
