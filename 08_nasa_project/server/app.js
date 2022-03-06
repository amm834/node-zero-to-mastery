const path = require('path')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const planetRouter = require('./src/routes/planets/planets.router')
const launchesRouter = require('./src/routes/launches/launches.router')

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
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
// app.use(morgan('combined'))

app.use('/planets', planetRouter)
app.use('/launches', launchesRouter)

app.get('/*', (req, res) => {
    return res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

module.exports = app
