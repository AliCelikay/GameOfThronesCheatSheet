const User = require('./User');
const Character = require('./SavedCharacters');
const Houses = require('./Houses');

// A user can save many characters
User.hasMany(Character, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// a saved character belongs to 1 user
Character.belongsTo(User, {
  foreignKey: 'user_id'
});

// A user can save many houses
User.hasMany(Houses, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// A saved house belongs to 1 user
Houses.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Character, Houses };
