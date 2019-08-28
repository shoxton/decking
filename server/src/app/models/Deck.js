module.exports = (sequelize, DataTypes) => {

    const Deck = sequelize.define('Deck', {

        name: DataTypes.STRING,
        description: DataTypes.TEXT('tiny'),
        user_id: DataTypes.INTEGER

    }, {});

    Deck.associate = function(models) {

        Deck.belongsToMany(models.Category, {

            through: 'DeckCategory',
            foreignKey: 'deck_id',
            as: 'categories'

        });

        Deck.belongsTo(models.User, {foreignKey: 'user_id', as: 'author'});

    };

    return Deck;
};