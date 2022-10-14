const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Book extends Model {}

Book.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isbn: {
            type: DataTypes.
        }
    }
)