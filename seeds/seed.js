const sequelize = require('../config/connection');
const { User, Blogpost, Comments } = require('../models');

const { seedUsers } = require('./user-seeds');
const { seedBlogpost } = require('./blogpost-seeds');
const seedComments = require('./comment-seeds');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Function to seed existing users
  const seedExistingUsers = async () => {
    await seedUsers();
  };
  // Seed existing users
  await seedExistingUsers();
  // console.log('Users:', users);

  //Seed blog posts
  const blogpostData = await seedBlogpost();
  await seedComments();
  const users = await User.findAll();
  if (users && users.length > 0) {
    for (const user of users) {
      await Blogpost.create({
        ...blogpostData[Math.floor(Math.random() * blogpostData.length)],
        user_id: user.id,
      });

      // You can also create additional new blog posts here if needed
      // await Blogpost.create({
      //   title: "New Blog Post Title",
      //   description: "New Blog Post Description",
      //   date_created: new Date(),
      //   user_id: user.id,
      // });
    }
  }

  for (const blogpost of blogpostData) {
    await Comments.create({
      ...seedComments[Math.floor(Math.random() * seedComments.length)],
      user_id: users[Math.floor(Math.random() * users.length)].id,
      blogpost_id: blogpost.id,
    });
  }


  const randomUser = users[Math.floor(Math.random() * users.length)];
  if (randomUser) {
    await Comments.create({
      ...seedComments[Math.floor(Math.random() * seedComments.length)],
      user_id: randomUser.id,
      blogpost_id: Blogpost.id,
    });
  } else {
    console.error('No users found.');
  }
  process.exit(0);
};

seedDatabase();