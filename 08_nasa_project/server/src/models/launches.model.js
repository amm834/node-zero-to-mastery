const launches = new Map()

let latestLaunchNumber = 100

const launch = {
    flightNumber: 100,
    mission: 'Kepler Exploration X',
    rocket: 'Exploser IS1',
    launcheDate: new Date('December 30,2030'),
    destination: 'Kepler 442 B',
    customer: ['Myanmar', 'NASA'],
    upcoming: true,
    success: true,
}

launches.set(launch.flightNumber, launch)

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

module.exports = {
    getAllLaunches,
    addNewLaunch,
}
