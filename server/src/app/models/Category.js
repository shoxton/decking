module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define('Category', {

        name: DataTypes.STRING

    }, {});

    Category.associate = function(models) {

        Category.belongsToMany(models.Deck, {

            through: 'DeckCategory',
            foreignKey: 'category_id',
            as: 'decks'
            
        });

    };

    return Category;
};