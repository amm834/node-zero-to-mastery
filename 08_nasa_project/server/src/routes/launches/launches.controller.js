const { getAllLaunches, addNewLaunch } = require('../../models/launches.model')

function httpGetAllLaunches(req, res) {
    return res.json(getAllLaunches())
}

function httpAddNewLaunch(req, res) {
    const launch = req.body

    if (
        !launch.mission ||
        !launch.rocket ||
        !launch.launchDate ||
        !launch.target
    ) {
        return res.status(400).json({
            error: 'Missing required launch property',
        })
    }
    launch.launchDate = new Date(launch.launchDate)
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid date',
        })
    }

    return res.status(201).json(addNewLaunch(launch))
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
}
