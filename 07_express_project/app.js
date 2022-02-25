const express = require('express')
const bodyParser = require('body-parser')
const friendsController = require('./controllers/friends.controller')

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

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/friends', friendsController.getFriends)

app.post('/friends', friendsController.postFriend)

app.get('/friends/:id', friendsController.getFriendById)

app.listen(PORT, () => {
    console.log('Serever is running at port', PORT)
})
