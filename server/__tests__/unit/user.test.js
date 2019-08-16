const bcrypt = require('bcryptjs');
const truncate = require('../utils/truncate');

const { User } = require('../../src/app/models');

describe('User', () => {
    beforeEach(async () => {
        await truncate();
    })

    it('should encrypt password', async () => {
        const user = await User.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        });
        
        const compareHash = await bcrypt.compare(user.password, user.password_hash);

        expect(compareHash).toBe(true);
    });
});
