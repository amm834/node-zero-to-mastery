const http = require('http')

const PORT = 3000

const server = http.createServer((req, res) => {
	const path = req.url;

	res.writeHead(200, {
		'Content-Type': 'application/json'
	})
	if (path === '/messages') {
		res.statusCode = 200;
		res.write(JSON.stringify([
			{message: 'Hello World'},
			{message: 'Hi World'},
		]))
		res.end()
	} else if (path === '/') {
		res.end(JSON.stringify({
			message: 'Welcome'
		}))
	} else {
		res.statusCode = 404
		res.end(JSON.stringify({
			message: 'Not found'
		}))
	}
})

server.listen(PORT, () => {
	console.log('Server is listening on port', PORT)
})