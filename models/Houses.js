const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Houses extends Model { }

Houses.init(
  {
    url_id: {
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
      allowNull: false,
    },
    words: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    titles: {
      type: DataTypes.STRING,
      // defaultValue: [],
      allowNull: false,
    },
    seats: {
      type: DataTypes.STRING,
      // defaultValue: [],
      allowNull: false,
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
