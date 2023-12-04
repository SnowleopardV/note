const express = require('express')

const router = express.Router()

// 这里也可以使用中间件
// router.use(<middle>)

router.get('/admin', (request, response) => {
  response.send('管理员页面')
})

router.get('/setting', (request, response) => {
  response.send('设置页面')
})

module.exports = router
