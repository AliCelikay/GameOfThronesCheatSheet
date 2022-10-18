const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Houses extends Model {}

Houses.init(
  {
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coatOfArms: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    words: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    titles: {
      type: DataTypes.STRING,
      // defaultValue: [],
      allowNull: true,
    },
    seats: {
      type: DataTypes.STRING,
      // defaultValue: [],
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
    modelName: 'houses',
  }
);

module.exports = Houses;
