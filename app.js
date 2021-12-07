var createError = require('http-errors')
var express = require('express')
var path = require('path')
var fs = require('fs')
var session = require("express-session")
const enc = require("./encryptKeys.js")

const aeskey = enc.getNewKey()
const privkey = fs.readFileSync("server.priv")
const aeskeyEnc = enc.rsaEncrypt(privkey, aeskey)

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname))
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {}
}))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/key', function(req, res) {
  return res.json({ status: 'ok', key: aeskeyEnc})
})

app.get('/data', function(req, res) {
  return res.json({ status: 'ok', data: enc.aesEncrypt(aeskey, 'hello')})
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(4040);

module.exports = app
