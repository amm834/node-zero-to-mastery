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

function loadDate() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '../../data/kepler_data.csv'))
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
                reject(err)
            })
            .on('end', () => {
                resolve()
            })
    })
}

module.exports = {
    planets: habitablePlantnets,
    loadDate,
}
