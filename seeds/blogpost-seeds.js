const { Blogpost } = require('../models');

const blogpostData = [
    {
        title: "Trendy updates to classic designs!",
        content: "According to celebrity manicurist Deborah Lippmann, there's been an experimental upgrade to the manicure called the floating French design.",
        user_id: 1,
        date_created: '2024-02-09 07:18:05'
    },
    {
        title: "Inspiration for Bologna and Cheese",
        content: "Control is a need to manage the outcome due to inner conflicts you are unable to resolve.",
        user_id: 2,
        date_created: '2024-02-01 02:12:36'
    },
    {
        title: "Travel hacks if you have good credit!",
        content: "My girlfriend works for American Express, and she hooked me up with the black platinum card and it gets me into VIP lounges and cash back from my trips.",
        user_id: 3,
        date_created: '2024-01-26 12:05:11'
    },
    {
        title: "Entreprenurship is just creativity.",
        content: "Starting a new small business is fun, it gets the juices flowing to build from scratch!",
        user_id: 4,
        date_created: '2024-01-13 08:42:36'
    }
]

const seedBlogpost = async () => {
    const createdBlogposts = await Blogpost.bulkCreate(blogpostData);
    return createdBlogposts;
};

module.exports = { blogpostData, seedBlogpost };