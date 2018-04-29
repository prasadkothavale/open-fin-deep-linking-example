var express = require('express')
var router = express.Router()
var globals = require('./globals')

router.get('/', (req, res, next) => {
  res.render('index', {
      header: globals.header,
      footer: globals.footer
  })
})

module.exports = router