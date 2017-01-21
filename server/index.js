const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const http = require('http')
const router = require('./router')

//app config
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json({type: '*/*' }))
router(app)

//server setup
const port = process.env.PORT || 3090
const server = http.createServer(app)
server.listen(port)
console.log("listening on port: ", port)



