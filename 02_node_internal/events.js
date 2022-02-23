const EventEmitter = require('events')

const channel = new EventEmitter()

// Observer #1
channel.on('upload', (videoName) => {
	console.log('Thank you, for ', videoName)
})

// Observer #2
channel.on('upload', () => {
	console.log('Thank sir!')
})

channel.emit('upload', 'Node Fundamental')
channel.emit('upload', 'PHP Fundamental')