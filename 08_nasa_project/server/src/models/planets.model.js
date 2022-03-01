const path = require('path')
const { parse } = require('csv-parse')
const fs = require('fs')

const habitablePlantnets = []

function isHabitable(planet) {
    return (
        planet['koi_disposition'] === 'CONFIRMED' &&
        planet['koi_insol'] > 0.36 &&
        planet['koi_insol'] < 1.11 &&
        planet['koi_prad'] < 1.6
    )
}

const dataPath = path.join(__dirname, '../../data/kepler_data.csv')
fs.createReadStream(dataPath)
    .pipe(
        parse({
            comment: '#',
            columns: true,
        })
    )
    .on('data', (data) => {
        if (isHabitable(data)) {
            habitablePlantnets.push(data)
        }
    })
    .on('error', (err) => {
        console.log(err)
    })
    .on('close', () => {
        console.log(
            habitablePlantnets.map((planet) => {
                return planet['kepler_name']
            })
        )
        console.log(
            'Total number of habitable planets',
            habitablePlantnets.length
        )
    })

module.exports = {
    planets: habitablePlantnets,
}
