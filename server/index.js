const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const router = require('./router')
const mongoose = require('mongoose')

//db connection
mongoose.connect('mongodb://localhost:auth/auth_users')

//app setup
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json({type: '*/*'}))
router(app)

//serversetup
const port = process.env.PORT || 3090
const server = http.createServer(app)

server.listen(port)
console.log('listening on port: ',port)


