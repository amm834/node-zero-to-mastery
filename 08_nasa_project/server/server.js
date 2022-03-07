require('dotenv/config')
const http = require('http')
const app = require('./app')
const { loadDate, planets } = require('./src/models/planets.model')
const { openConnection } = require('./src/services/mogo')

const PORT = process.env.PORT || 8000

const server = http.createServer(app)

async function startServer() {
    await openConnection()
    await loadDate()

    server.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`)
    })
}

startServer()
