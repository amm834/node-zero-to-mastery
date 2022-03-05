const path = require('path')
const { parse } = require('csv-parse')
const fs = require('fs')
const planets = require('./planets.schema')

const habitablePlantnets = []

function isHabitable(planet) {
    return (
        planet['koi_disposition'] === 'CONFIRMED' &&
        planet['koi_insol'] > 0.36 &&
        planet['koi_insol'] < 1.11 &&
        planet['koi_prad'] < 1.6
    )
}

function loadDate() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '../../data/kepler_data.csv'))
            .pipe(
                parse({
                    comment: '#',
                    columns: true,
                })
            )
            .on('data', async (data) => {
                if (isHabitable(data)) {
                    await planets.create({
                        keplerName: data.kepler_name,
                    })
                }
            })
            .on('error', (err) => {
                reject(err)
            })
            .on('end', () => {
                resolve()
            })
    })
}

function getAllPlanets() {
    return habitablePlantnets
}

module.exports = {
    loadDate,
    getAllPlanets,
}
