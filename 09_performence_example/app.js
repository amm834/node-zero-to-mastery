const express = require('express')
const cluster = require('cluster')
const os = require('os')

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

if (cluster.isMaster) {
    console.log('Master process is running at %d', process.pid)
    const NUMS_WORKER = os.cpus().length
    for (let i = 0; i < NUMS_WORKER; i++) {
        cluster.fork()
    }
} else {
    console.log('Worker process is running %d', process.pid)
    app.listen(3000)
}
