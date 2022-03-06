const launches = require('../models/launches.schema')
const planets = require('../models/planets.schema')

let latestLaunchNumber = 100

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Exploser IS1',
    launcheDate: new Date('December 30,2030'),
    target: 'Kepler-1649 b',
    customer: ['Myanmar', 'NASA'],
    upcoming: true,
    success: true,
}

async function saveLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.target,
    })
    if (!planet) {
        throw new Error('No planet with that name')
    }
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

async function getAllLaunches() {
    return await launches.find(
        {},
        {
            _id: 0,
            __v: 0,
        }
    )
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
