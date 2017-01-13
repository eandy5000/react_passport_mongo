const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const router = require('./router')

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


