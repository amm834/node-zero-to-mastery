const launches = new Map()

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

module.exports = {
    launches,
}
