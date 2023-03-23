//writing api test with jest
describe('Test GET /launches', () => {
    test('It should res with 200 success', () => {
        const response = 200;
        expect(response).toBe(200);
    });
});

describe('Test POST /launch', () => {
    test('It should res with 200 success', () => {

    });
    test('It should catch missing required props', () => {});
    test('It should catch invalid dates', () => {});
});