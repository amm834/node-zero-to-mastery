const { Worker, isMainThread, workerData } = require('worker_threads')

if (isMainThread) {
    console.log('Main process %d', process.pid)
    new Worker(__filename, {
        workerData: [1, 2, 3],
    })
    new Worker(__filename, {
        workerData: [4, 5, 6],
    })
} else {
    console.log('Worker with %d', process.pid)
    console.log(workerData)
}
