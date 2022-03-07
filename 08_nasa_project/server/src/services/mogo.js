require('dotenv/config')
const mongoose = require('mongoose')

const MONGO_URL = process.env.MONGO_URL

mongoose.connection.once('open', () => {
    console.log('connection is ready')
})

mongoose.connection.on('error', (error) => {
    console.log(error)
})
module.exports = async () => {
    await mongoose.connect(MONGO_URL)
}
