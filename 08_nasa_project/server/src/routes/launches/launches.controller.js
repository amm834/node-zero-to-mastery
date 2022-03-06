const {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchWithId,
    scheduleNewLaunch,
} = require('../../models/launches.model')

async function httpGetAllLaunches(req, res) {
    const launches = await getAllLaunches()
    return res.json(launches)
}

async function httpAddNewLaunch(req, res) {
    const launch = req.body

    if (
        !launch.mission ||
        !launch.rocket ||
        !launch.launchDate ||
        !launch.target
    ) {
        return res.status(400).json({
            error: 'Required launch property',
        })
    }
    launch.launchDate = new Date(launch.launchDate)
    if (isNaN(launch.launchDate)) {
        return res.status(400).json({
            error: 'Invalid date',
        })
    }
    await scheduleNewLaunch(launch)
    return res.status(201).json(launch)
}

function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id)

    if (!existsLaunchWithId(launchId)) {
        return res.status(404).json({
            error: 'Fail to abort mission',
        })
    }
    const aborted = abortLaunchWithId(launchId)
    if (!aborted) {
        return res.status(400).json({
            error: 'Fail to abort missioin',
        })
    } else {
        return res.status(200).json({
            ok: true,
        })
    }
}

module.exports = {
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch,
}
