module.exports = (sequelize, DataTypes) => {
    const DeckCategory = sequelize.define('DeckCategory', {
      deck_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: 'Deck',
              key: 'id'
          }
      },
      category_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
              model: 'Category',
              key: 'id'
          }
      }
    }, {});

    return DeckCategory;
  };