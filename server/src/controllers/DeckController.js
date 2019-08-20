const { Deck } = require('../app/models');

class DeckController {
    async index(req, res) {
        const decks = await Deck.findAll();

        res.status(200).json(decks);
    }

    async store(req, res) {
        const { name, description } = req.body;

        const deck = await Deck.create({name, description});

        res.status(201).json(deck);
    }
}

module.exports = new DeckController;