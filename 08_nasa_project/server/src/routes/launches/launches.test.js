const request = require('supertest')
const app = require('../../../app')

describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200)
        // expect(response.statusCode).toBe(200)
    })
})

describe('Test POST /launches', () => {
    test('It should respond with 201 status', async () => {
        const requestData = {
            mission: 'Demo Mission',
            rocket: 'Apolo',
            target: 'Kepler B2',
            launchDate: 'May 18,2030',
        }
        const requestDataWithoutDate = {
            mission: 'Demo Mission',
            rocket: 'Apolo',
            target: 'Kepler B2',
        }

        const response = await request(app)
            .post('/launches')
            .send(requestData)
            .expect('Content-Type', /json/)
            .expect(201)

        const requestLaunchDate = new Date(requestData.launchDate).valueOf()
        const responseLaunchDate = new Date(response.body.launchDate).valueOf()

        expect(responseLaunchDate).toBe(requestLaunchDate)
    })
})
