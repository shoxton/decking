const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Name cannot be empty"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Email cannot be empty"
                },
                isEmail: {
                    msg: "Invalid email"
                }
            }
        },
        password: {
            type: DataTypes.VIRTUAL,
            validate: {
                notEmpty: {
                    msg: "Password cannot be empty"
                }
            }
        },
        password_hash: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: "Password hash cannot be empty"
                }
            }
        }
    }, {
        hooks: {
            beforeSave: async user => {
                if(user.password) {
                    user.password_hash = await bcrypt.hash(user.password, 8);
                }
            }
        }
    })

    User.prototype.checkPassword = async function(password) {
        return await bcrypt.compare(password, this.password_hash);
    }

    User.prototype.generateToken = function() {
        return jwt.sign({id: this.id}, process.env.APP_SECRET);
    }

    return User;
}