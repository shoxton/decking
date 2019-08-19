module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    Category.belongsToMany(models.Deck, {
      through: 'deck_categories',
      as: 'decks',
      foreignKey: 'category_id'
    });
  };
  return Category;
};