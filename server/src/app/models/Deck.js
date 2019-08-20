module.exports = (sequelize, DataTypes) => {
  const Deck = sequelize.define('Deck', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT('tiny')
  }, {});
  Deck.associate = function(models) {
    Deck.belongsToMany(models.Category, {
      through: 'DeckCategory',
      as: 'categories',
      foreignKey: 'deck_id'
    });
  };
  return Deck;
};