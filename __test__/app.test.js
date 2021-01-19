const supertest = require('supertest')
const app = require('../src/server/app')

test('/test GET response should be successful', async () => {
    const getRequest = await supertest(app).get('/test');
    expect(getRequest.statusCode).toEqual(200);
})