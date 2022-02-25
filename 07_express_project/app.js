const express = require('express')
const bodyParser = require('body-parser')

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

const friends = [
    {
        id: 1,
        name: 'Mg Mg',
    },
    {
        id: 2,
        name: 'Aung Aung',
    },
]

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/friends', (req, res) => {
    res.json(friends)
})

app.post('/friends', (req, res) => {
    if (!req.body.name) {
        return res.status(400).json({
            error: 'Faid to create a new friend',
        })
    }

    const newFriend = {
        id: friends.length + 1,
        name: req.body.name,
    }

    friends.push(newFriend)
    res.json(newFriend)
})

app.get('/friends/:id', (req, res) => {
    const id = req.params.id
    const friend = friends[id]
    if (friend) {
        res.json(friend)
    } else {
        res.status(404).json({
            error: 'Friend not found',
        })
    }
})

app.listen(PORT, () => {
    console.log('Serever is running at port', PORT)
})
