require('dotenv/config')
const http = require('http')
const app = require('./app')
const mongoose = require('mongoose')
const { loadDate, planets } = require('./src/models/planets.model')

const PORT = process.env.PORT || 8000
const MONGO_URL = process.env.MONGO_URL

const server = http.createServer(app)

mongoose.connection.once('open', () => {
    console.log('connection is ready')
})

mongoose.connection.on('error', (error) => {
    console.log(error)
})

async function startServer() {
    await mongoose.connect(MONGO_URL)
    await loadDate()

    server.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`)
    })
}

startServer()
