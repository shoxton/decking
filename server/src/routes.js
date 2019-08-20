const routes = require('express').Router();
const authMiddleware = require('./middlewares/auth');
const SessionController = require('../src/controllers/SessionController');
const UserController = require('../src/controllers/UserController');
const DeckController = require('../src/controllers/DeckController');

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/dashboard', (req, res) => {
    return res.status(200).send();
});

routes.get('/decks', DeckController.index);
routes.post('/decks', DeckController.store);

module.exports = routes;