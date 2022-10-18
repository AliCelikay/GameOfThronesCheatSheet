const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class SavedCharacters extends Model { }

SavedCharacters.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    culture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aliases: {
      type: DataTypes.STRING,
      // defaultValue: [],
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    house: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'savedCharacters',
  }
);

module.exports = SavedCharacters;
