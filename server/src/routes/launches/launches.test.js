const request = require('supertest');
const app = require('../../app');

//writing api test with jest
describe('Test GET /launches', () => {
    test('It should res with 200 success', async () => {
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200)
    });
});

describe('Test POST /launch', () => {
    const completeLaunchData = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
        launchDate: 'January 4, 2028'
    }

    const launchDataWithoutDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f'
    }

    const launchDataWithInvalidDate = {
        mission: 'USS Enterprise',
        rocket: 'NCC 1701-D',
        target: 'Kepler-186 f',
        launchDate: 'Zoot'
    }

    test('It should res with 201 created', async () => {
        let currentFlightNum = 100;
        //the request fn is from the supertest lib
        const response = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201)
        
        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();
        expect(responseDate).toBe(requestDate);
        expect(response.body.success).toBeTruthy();
        expect(response.body.upcoming).toBeTruthy();
        expect(response.body.customers).toEqual([ 'ZTM', 'NASA' ]);

        expect(response.body.flightNumber).toBe(currentFlightNum + 1);
        currentFlightNum = response.body.flightNumber;

        //jest
        expect(response.body).toMatchObject(launchDataWithoutDate);

    });
    test('It should catch missing required props', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);

        expect(response.body).toStrictEqual({
            error: "Missing required launch property"
        })
    });
    test('It should catch invalid dates', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400);
            
        expect(response.body).toStrictEqual({
            error: "Invalid launch date"
        })
    });
});