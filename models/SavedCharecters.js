const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class SavedCharacters extends Model { }

SavedCharacters.init(
  {
    url_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    culture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mother: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    father: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    aliases: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      // Ask instructors for array help
    },
    allegiances: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    spouse: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    user_notes: {
      type: DataTypes.STRING,
      allowNull: true,
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
