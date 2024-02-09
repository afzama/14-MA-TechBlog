const { Comments } = require('../models');

const commentData = [
    {
        user_id: 1,
        blogpost_id: 5,
        comment_description: "I want this at my next appointment!"
    },
    {
        user_id: 2,
        blogpost_id: 4,
        comment_description: "Sounds an interesting cinematic experience!"
    },
    {
        user_id: 3,
        blogpost_id: 2,
        comment_description: "Amazing! Sign me up."
    },
    {
        user_id: 4,
        blogpost_id: 3,
        comment_description: "Sounds exciting, I want to be part of this!"
    }
]

const seedComments = async () => {
    await Comments.bulkCreate(commentData);
};

module.exports = seedComments;