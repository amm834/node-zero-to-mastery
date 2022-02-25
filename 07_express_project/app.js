const express = require('express')
const bodyParser = require('body-parser')
const friendsRouter = require('./routes/friends.router')
const path = require('path')

const PORT = 3000
const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use('/site', express.static(path.join(__dirname, 'public')))
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

app.get('/', (req, res) => {
    return res.render('index', {
        caption: 'My lovely girl',
        title: 'Title',
    })
})

app.listen(PORT, () => {
    console.log('Serever is running at port', PORT)
})
