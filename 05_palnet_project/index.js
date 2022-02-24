const {parse} = require('csv-parse')
const fs = require('fs')


const stream = [];
fs.createReadStream('./kepler_data.csv')
	.pipe(parse({
		comment: '#',
		columns: true
	}))
	.on('data', data => {
		stream.push(data)
	})
	.on('error', err => {
		console.log(err)
	})
	.on('close', () => {
		console.log('Done')
		console.log(stream)
	})