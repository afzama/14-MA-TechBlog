const sequelize = require('../config/connection');
const { User, Blogpost, Comment } = require('../models');

const { seedUsers } = require('./user-seeds');
const { seedBlogpost } = require('./blogpost-seeds');
const { seedComments } = require('./comment-seeds');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed existing users
  await seedUsers();

  // Seed blog posts
  const blogpostData = await seedBlogpost();
  const seedCommentsResult = await seedComments();
  const users = await User.findAll();

  for (const user of users) {
    const randomBlogpost = blogpostData[Math.floor(Math.random() * blogpostData.length)];
    await Blogpost.create({
      ...randomBlogpost,
      user_id: user.id,
      title: 'title',
      post_text: 'post_text',
    });

    // Create comments for each blog post
    const randomComments = seedCommentsResult[Math.floor(Math.random() * seedCommentsResult.length)];
    await Comment.create({
      ...randomComments,
      user_id: user.id,
      comment_text: 'comment_text',
      created_at: new Date(),
    });
  }

  // Create a random comment for a random user on a random blog post
  const randomUser = users[Math.floor(Math.random() * users.length)];
  const randomBlogpost = blogpostData[Math.floor(Math.random() * blogpostData.length)];
  const randomComment = seedCommentsResult[Math.floor(Math.random() * seedCommentsResult.length)];

  if (randomUser && randomBlogpost) {
    await Comment.create({
      ...randomComment,
      user_id: randomUser.id,
      comment_text: 'comment_text',
      created_at: new Date(),
    });
  } else {
    console.error('No users or blog posts found.');
  }

  process.exit(0);
};

seedDatabase();
