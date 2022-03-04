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

    const requestWithInvalidDate = {
        mission: 'Demo Mission',
        rocket: 'Apolo',
        target: 'Kepler B2',
        launchDate: 'boo',
    }

    test('It should respond with 201 status', async () => {
        const response = await request(app)
            .post('/launches')
            .send(requestData)
            .expect('Content-Type', /json/)
            .expect(201)

        const requestLaunchDate = new Date(requestData.launchDate).valueOf()
        const responseLaunchDate = new Date(response.body.launchDate).valueOf()

        expect(responseLaunchDate).toBe(requestLaunchDate)
        expect(response.body).toMatchObject(requestDataWithoutDate)
    })

    test('It should catch Required launch property', async () => {
        const response = await request(app)
            .post('/launches')
            .send(requestDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400)

        expect(response.body).toStrictEqual({
            error: 'Required launch property',
        })
    })

    test('It should cath Invalid date', async () => {
        const response = await request(app)
            .post('/launches')
            .send(requestWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400)
        expect(response.body).toStrictEqual({
            error: 'Invalid date',
        })
    })
})
