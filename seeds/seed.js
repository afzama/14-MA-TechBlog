const sequelize = require('../config/connection');
const { User, Blogpost, Comments } = require('../models');

const userData = require('./user-seeds');
const blogpostData = require('./blogpost-seeds');
const commentData = require('./comment-seeds'); // Corrected import

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const user of users) {
    await Blogpost.create({
      ...blogpostData[Math.floor(Math.random() * blogpostData.length)],
      user_id: user.id,
    });
  }

  for (const blogpost of blogposts) {
    await Comments.create({
      ...commentData[Math.floor(Math.random() * commentData.length)],
      user_id: users[Math.floor(Math.random() * users.length)].id,
      blogpost_id: blogpost.id,
    });
  }

  process.exit(0);
};

seedDatabase();
