const app = require('../../app');
const request = require("supertest")

describe('Test for GET /planets', () => {
    test('It should return a 200 success', async() => {
        const response = await request(app)
            .get('/planets')
            .expect(200)
            .expect("Content-Type", /json/)
    })
})