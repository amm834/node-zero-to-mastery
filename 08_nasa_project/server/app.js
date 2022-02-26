const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (req, res) => {
    res.send('hello')
})

module.exports = app
