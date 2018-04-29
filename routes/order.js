var express = require('express')
var router = express.Router()
var globals = require('./globals')
var dateFormat = require('dateformat')

// edit existing order
router.get('/new/:orderId', (req, res, next) => {
  let orderId
  let orders = globals.orders;
  let order

  orderId = req.params.orderId
  for (o of orders) {
    if (o.orderId == orderId) {
      order = o
      break;
    }
  }

  res.render('place_order', {
    header: globals.header,
    footer: globals.footer,
    order: order
  })
})

// new order
router.get('/new', (req, res, next) => {
  let orders = globals.orders
  let now = new Date()
  let order = {
    orderId: now.getTime()
  }
  orders.push(order);

  res.render('place_order', {
    header: globals.header,
    footer: globals.footer,
    order: order
  })
})

// save order
router.post('/save', (req, res, next) => {
  let order = req.body
  let orders = globals.orders

  for (o of orders) {
    if (o.orderId == order.orderId) {
      Object.assign(o, order)
      break;
    }
  }

  res.send(order.orderId)
})

// view specific order
router.get('/view/:orderId', (req, res, next) => {
  let orderId = req.params.orderId
  let orders = globals.orders
  let order
  for (o of orders) {
    if (o.orderId == orderId) {
      order = o
      break;
    }
  }

  res.render('view_order', {
    header: globals.header,
    footer: globals.footer,
    order: order
  })

})

// view all orders
router.get('/view', (req, res, next) => {
  res.render('my_orders', {
    header: globals.header,
    footer: globals.footer,
    orders: globals.orders.filter(order => {
      return order.direction != undefined && order.direction != null
    }),
    dateFormat: dateFormat
  })
})

module.exports = router