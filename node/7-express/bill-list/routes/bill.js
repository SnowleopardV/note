var express = require('express')
var router = express.Router()
const path = require('path')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const shortId = require('shortid')

const adapter = new FileSync(path.resolve(__dirname, '../db/db.json'))
const db = low(adapter)

/* GET users listing. */
router.get('/list', function (req, res, next) {
  const bills = db.get('bills').value()
  console.log(14, bills)
  res.render('list', { bills })
})

router.get('/billList', function (req, res, next) {
  const bills = db.get('bills').value()
  console.log(14, bills)
  res.send(bills)
})

router.get('/add', function (req, res, next) {
  res.render('add')
})

router.post('/add', function (req, res, next) {
  const bill = {
    ...req.body,
    id: shortId.generate(),
  }

  db.get('bills').unshift(bill).write()
  res.render('status', { message: '添加' })
})

router.get('/delete/:id', (request, response) => {
  const id = request.params.id

  db.get('bills').remove({ id }).write()

  response.render('status', { message: '删除' })
})

router.use(express.static(path.resolve(__dirname, '../public')))

module.exports = router
