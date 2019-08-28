const { Deck, Category, DeckCategory } = require('../app/models');

class DeckController {
    async index(req, res) {
        const decks = await Deck.findAll();

        res.status(200).json(decks);
    }

    async store(req, res) {
        try {
            const { name, description, categories } = req.body;
    
            const deck = await Deck.create({name, description, user_id: req.userId});
    
            categories.forEach(async category => {
                const [cat, created] = await Category.findOrCreate({where: {name: category}});
                deck.addCategory(cat);
            })
            
            const response = await Deck.findByPk(deck.id, {include: [{
                model: Category,
                as: "categories"
            }]})
    
            res.status(201).json(response);
        } catch (error) {
            res.status(400).json(error)
        }
    }
}

module.exports = new DeckController;