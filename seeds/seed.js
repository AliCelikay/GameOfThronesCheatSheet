const sequelize = require('../config/connection');
const { User, Houses } = require('../models');

const userData = require('./userData.json');
const housesData = require('./housesData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const house of housesData) {
    await Houses.create({
      ...house,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
