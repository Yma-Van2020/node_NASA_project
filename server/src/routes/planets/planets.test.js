const app = require('../../app');
const request = require("supertest")
const { mongoConnect, mongoDisconnect } = require('../../services/mongo')

describe('Planets API', () => {
    beforeAll(async () => {
        await mongoConnect();
    });

    afterAll(async () => {
        await mongoDisconnect();
    })
    
    describe('Test for GET /planets', () => {
        test('It should return a 200 success', async() => {
            const response = await request(app)
                .get('/planets')
                .expect(200)
                .expect("Content-Type", /json/)
        })
    })
})
