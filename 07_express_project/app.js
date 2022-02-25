const express = require('express')
const bodyParser = require('body-parser')
const friendsRouter = require('./routes/friends.router')

const PORT = 3000
const app = express()

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use((req, res, next) => {
    const prev = Date.now()
    next()
    const delta = Date.now() - prev
    console.log(`${req.method} ${req.url} ${delta}ms`)
})

app.use(friendsRouter)

app.listen(PORT, () => {
    console.log('Serever is running at port', PORT)
})
