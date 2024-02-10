const { Comment } = require('../models');

const commentData = [
    {
        description: "I want this at my next appointment!",
        date_created: '2024-02-09 08:16:24',
        user_id: 1,
        blogpost_id: 21,
    },
    {
        description: "Sounds an interesting cinematic experience!",
        date_created: '2024-01-28 04:03:44',
        user_id: 2,
        blogpost_id: 28,
    },
    {
        description: "Amazing! Sign me up.",
        date_created: '2024-01-19 12:23:56',
        user_id: 3,
        blogpost_id: 36,
    },
    {
        description: "Sounds exciting, I want to be part of this!",
        date_created: '2024-01-13 18:48:36',
        user_id: 4,
        blogpost_id: 39,
    }
]

const seedComments = async () => {
    const createdComments = await Comment.bulkCreate(commentData);
    return createdComments;
};

module.exports = { commentData, seedComments };