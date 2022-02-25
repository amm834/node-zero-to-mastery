const express = require('express')

const app = express()

const PORT = 3000

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
