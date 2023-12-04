const express = require('express')

// 创建路由对象
const router = express.Router()

// 这里也可以使用中间件
// router.use(<middle>)

// 路由
router.get('/home', (request, response) => {
  response.send('首页')
})

router.get('/list', (request, response) => {
  response.send('商品列表')
})

router.get('/detail', (request, response) => {
  response.send('商品详情')
})

module.exports = router
