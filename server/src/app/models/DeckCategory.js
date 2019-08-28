module.exports = (sequelize, DataTypes) => {

    const DeckCategory = sequelize.define('DeckCategory', {

        deck_id: DataTypes.INTEGER,
        category_id: DataTypes.INTEGER,

    }, {});

    DeckCategory.associate = function(models) {

        DeckCategory.belongsTo(models.Deck, {foreignKey: 'deck_id'});
        DeckCategory.belongsTo(models.Category, {foreignKey: 'category_id'});

    };

    return DeckCategory;
};