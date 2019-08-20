const truncate = require('../utils/truncate');
const request = require('supertest');
const faker = require('faker');

const factory = require('../factories');

const app = require('../../src/app');
const { Deck, Category, DeckCategory } = require('../../src/app/models');

describe('deck routes', () => {
    beforeEach(async () => {
        await truncate();
    })

    it('should ensure a deck is created and persisted', async () => {
        const deck = await Deck.create({
            name: "HarryPotter",
            description: faker.lorem.paragraph()
        });

        const response = await Deck.findOne({where: {id: deck.id}})

        expect(response.name).toEqual(deck.name);
    });

    it('should have a route', async () => {
        const user = await factory.create('User');

        const response = await request(app)
            .get('/decks')

            ///
            .set('Authorization', `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(200);
    });

    it('should return an array of decks', async () => {
        const user = await factory.create('User');
        await factory.create('Deck', {
            name: 'Super Cars'
        });

        const response = await request(app)
            .get('/decks')
            ///
            .set('Authorization', `Bearer ${user.generateToken()}`);

        expect(response.body[0]).toHaveProperty('name', 'Super Cars');
    });
    
    
    it('should store a new deck at database and return it', async () => {
        const user = await factory.create('User');

        const response = await request(app)
            .post('/decks')
            .send({
                name: "Tuned cars",
                description: faker.lorem.paragraph()
            })
            .set('Authorization', `Bearer ${user.generateToken()}`);

        expect(response.status).toBe(201)
    });
    
});
