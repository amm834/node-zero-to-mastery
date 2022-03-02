require('dotenv/config')
const http = require('http')
const { loadDate, planets } = require('./src/models/planets.model')

const PORT = process.env.PORT || 8000

const app = require('./app')
const server = http.createServer(app)

async function startServer() {
    await loadDate()

    server.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`)
    })
}

startServer()
