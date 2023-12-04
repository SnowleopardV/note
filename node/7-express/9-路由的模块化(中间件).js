const express = require('express')
const homeRouter = require('./route/homeRouter')
const adminRouter = require('./route/adminRouter')

const app = express()

// 使用app.use来使用路由模块
app.use(homeRouter)
app.use(adminRouter)

app.listen(9000, () => {
  console.log('服务启动成功')
})
