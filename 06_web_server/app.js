const http = require('http')

const PORT = 3000

const db = [
	{
		id: 1,
		name: 'Mg Mg'
	},
	{
		id: 2,
		name: 'Aung Aung'
	},
	{
		id: 3,
		name: 'Hla Hla'
	},
]
const server = http.createServer((req, res) => {
	const path = req.url;
	const method = req.method;

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
	} else if (method === 'POST' && path === '/messages') {
		req.on('data', data => {
			console.log(data)
		})
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