const http = require('https')
const express = require('express')
const fs = require('fs')
const helmet = require('helmet')

const app = express()
app.use(helmet())

// TO generate new ssl key: openssl req -x509 -newkey rsa:4096 -nodes -keyout key.pem -out cert.pem -days 365
app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>')
})

http.createServer(
    {
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem'),
    },
    app
).listen(3000)
