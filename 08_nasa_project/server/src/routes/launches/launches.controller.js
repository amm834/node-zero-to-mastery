const {
    getAllLaunches: httpGetAllLaunches,
} = require('../../models/launches.model')

function httpGetAllLaunches(req, res) {
    return res.json(httpGetAllLaunches())
}

module.exports = {
    httpGetAllLaunches,
}
