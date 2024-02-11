const { Blogpost } = require('../models');

const blogpostData = [
    {
        id: 21,
        title: "Trendy updates to classic designs!",
        post_text: "According to celebrity manicurist Deborah Lippmann, there's been an experimental upgrade to the manicure called the floating French design.",
        user_id: 1,
        created_at: '2024-02-09 07:18:05'
    },
    {
        id: 28,
        title: "Inspiration for Bologna and Cheese",
        post_text: "Control is a need to manage the outcome due to inner conflicts you are unable to resolve.",
        user_id: 2,
        created_at: '2024-01-28 02:12:36'
    },
    {
        id: 36,
        title: "Travel hacks if you have good credit!",
        post_text: "My girlfriend works for American Express, and she hooked me up with the black platinum card and it gets me into VIP lounges and cash back from my trips.",
        user_id: 3,
        created_at: '2024-01-19 12:05:11',
    },
    {
        id: 39,
        title: "Entreprenurship is just creativity.",
        post_text: "Starting a new small business is fun, it gets the juices flowing to build from scratch!",
        user_id: 4,
        created_at: '2024-01-13 08:42:36',
    }
]

const seedBlogpost = async () => {
    const createdBlogposts = await Blogpost.bulkCreate(blogpostData);
    return createdBlogposts;
};

module.exports = { blogpostData, seedBlogpost };