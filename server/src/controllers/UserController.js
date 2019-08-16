const { User } = require('../app/models');

class UserController {
    async store(req, res) {
        try {
            const user = await User.create(req.body);

            return res.status(201).send({user});
        } catch (error) {
            return res.status(422).json(error)
        }
    }
}

module.exports = new UserController;