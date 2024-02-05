const { Blogpost } = require('../models');

const blogpostData = [
    {
        title: "Trendy updates to classic designs!",
        description: "According to celebrity manicurist Deborah Lippmann, there's been an experimental upgrade to the manicure called the floating French design.",
        user_id: 1
    },
    {
        title: "Inspiration for Bologna and Cheese",
        description: "Control is a need to manage the outcome due to inner conflicts you are unable to resolve.",
        user_id: 2
    },
    {
        title: "Travel hacks if you have good credit!",
        description: "My girlfriend works for American Express, and she hooked me up with the black platinum card and it gets me into VIP lounges and cash back from my trips.",
        user_id: 3
    },
    {
        title: "Entreprenurship is just creativity.",
        description: "Starting a new small business is fun, it gets the juices flowing to build from scratch!",
        user_id: 4
    }
]

const seedBlogpost = async () => {
    const createdBlogposts = await Blogpost.bulkCreate(blogpostData);
    return createdBlogposts;
};

module.exports = { blogpostData, seedBlogpost };