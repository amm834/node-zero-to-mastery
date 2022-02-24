const parse = require('csv-parse')
const fs = require('fs')

const stream = [];
fs.createReadStream('./kepler_data.csv')
	.on('data', chunk => {
		stream.push(chunk)
	})
	.on('error', err => {
		console.log(err)
	})
	.on('close', () => {
		console.log('Done')
		console.log(stream.toString())
	})