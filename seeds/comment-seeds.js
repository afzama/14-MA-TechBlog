const { Comment } = require('../models');

const commentData = [
    {
        comment_text: "I want this at my next appointment!",
        created_at: '2024-02-09 08:16:24',
        user_id: 1,
        blogpost_id: 21,
    },
    {
        comment_text: "Sounds an interesting cinematic experience!",
        created_at: '2024-01-28 04:03:44',
        user_id: 2,
        blogpost_id: 28,
    },
    {
        comment_text: "Amazing! Sign me up.",
        created_at: '2024-01-19 12:23:56',
        user_id: 3,
        blogpost_id: 36,
    },
    {
        comment_text: "Sounds exciting, I want to be part of this!",
        created_at: '2024-01-13 18:48:36',
        user_id: 4,
        blogpost_id: 39,
    }
]

const seedComments = async () => {
    const createdComments = await Comment.bulkCreate(commentData);
    return createdComments;
};

module.exports = { commentData, seedComments };