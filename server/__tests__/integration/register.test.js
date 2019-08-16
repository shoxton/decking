const truncate = require('../utils/truncate');

const faker = require('faker');
const request = require('supertest');

const app = require('../../src/app');

describe('Registration', () => {
    beforeEach(async () => {
        await truncate();
    })

    it('should create new user with provided data', async () => {
        const response = await request(app)
        .post('/users')
        .send({
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        })

        expect(response.status).toBe(201);
    });

    it('should not create a new user without providing data', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: null,
                email: null,
                password: null
            })

        expect(response.status).toBe(422);
    });

    it('should not create new user providing invalid data', async () => {
        const response = await request(app)
            .post('/users')
            .send({
                name: faker.name.findName(),
                email: 'myinvalidemail',
                password: faker.internet.password()
            })

        expect(response.status).toBe(400)
    });
    
    
});
