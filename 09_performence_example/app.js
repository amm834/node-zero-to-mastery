const express = require('express')

const app = express()

function timer(duration) {
    const startTime = Date.now()

    while (Date.now() - startTime < duration) {
        // event loop is here
    }
}

app.get('/', (req, res) => {
    return res.send('Hi there')
})

app.get('/timer', (req, res) => {
    timer(3000)
    return res.send('Wating ...')
})

app.listen(3000)
