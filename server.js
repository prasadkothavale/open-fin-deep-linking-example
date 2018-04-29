const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var bodyParser = require('body-parser');


var index = require('./routes/index')
var order = require('./routes/order')

var app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.listen(PORT, () => console.log(`Listening on ${PORT}`))
app.use(bodyParser.json());

app.use('/', index)
app.use('/order', order)