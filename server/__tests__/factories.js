const faker = require('faker');
const { factory } = require('factory-girl');
const { User, Deck } = require('../src/app/models');

factory.define('User', User, {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
});

factory.define('Deck', Deck, {
    name: faker.name.findName(),
    description: faker.lorem.paragraph()
});

module.exports = factory;