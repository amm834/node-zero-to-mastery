const launches = require('../models/launches.schema')

let latestLaunchNumber = 100

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Exploser IS1',
    launcheDate: new Date('December 30,2030'),
    target: 'Kepler 442 B',
    customer: ['Myanmar', 'NASA'],
    upcoming: true,
    success: true,
}

async function saveLaunch(launch) {
    await launches.updateOne(
        {
            flightNumber: launch.flightNumber,
        },
        launch,
        {
            upsert: true,
        }
    )
}

saveLaunch(launch)

function existsLaunchWithId(launchId) {
    return launches.has(launchId)
}

function getAllLaunches() {
    return Array.from(launches.values())
}

function addNewLaunch(launch) {
    latestLaunchNumber++
    launches.set(
        latestLaunchNumber,
        Object.assign(launch, {
            upcoming: true,
            success: true,
            flightNumber: latestLaunchNumber,
            customer: ['Myanmar', 'NASA'],
        })
    )
    return launch
}

function abortLaunchWithId(launchId) {
    const aborted = launches.get(launchId)
    aborted.success = false
    aborted.upcoming = false

    return aborted
}

module.exports = {
    getAllLaunches,
    addNewLaunch,
    existsLaunchWithId,
    abortLaunchWithId,
}
