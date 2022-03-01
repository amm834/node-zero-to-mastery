const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const planetRouter = require('./src/routes/planets.router')

const app = express()
app.use(
    cors({
        origin: 'http://localhost:3000',
    })
)
app.use(express.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use(planetRouter)
app.get('/', (req, res) => {
    return res.end('hi')
})

module.exports = app
