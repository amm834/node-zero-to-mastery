const http = require('http')

const PORT = 3000

const server = http.createServer((req, res) => {
	res.writeHead(200, {
		'Content-Type': 'Application/json'
	})
	res.end(JSON.stringify({
		message: "Hello World!"
	}))
})

server.listen(PORT, () => {
	console.log('Server is listening on port', PORT)
})