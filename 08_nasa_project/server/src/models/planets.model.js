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
                    savePlanet(data)
                }
            })
            .on('error', (err) => {
                reject(err)
            })
            .on('end', async () => {
                const count = (await getAllPlanets()).length
                console.log(`Total planets ${count}`)
                resolve()
            })
    })
}

async function getAllPlanets() {
    return await planets.find({})
}

async function savePlanet(planet) {
    try {
        await planets.updateOne(
            {
                keplerName: planet.kepler_name,
            },
            {
                keplerName: planet.kepler_name,
            },
            {
                upsert: true,
            }
        )
    } catch (err) {
        console.log(`Cannot save planets ${err}`)
    }
}

module.exports = {
    loadDate,
    getAllPlanets,
}
