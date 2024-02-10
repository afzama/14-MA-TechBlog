const { Comment } = require('../models');

const commentsData = [
    {
        user_id: 1,
        id: 5,
        description: "I want this at my next appointment!",
        date_created: '2024-02-09 08:16:24',
    },
    {
        user_id: 2,
        id: 4,
        description: "Sounds an interesting cinematic experience!",
        date_created: '2024-01-28 04:03:44',
    },
    {
        user_id: 3,
        id: 2,
        description: "Amazing! Sign me up.",
        date_created: '2024-01-19 12:23:56',
    },
    {
        user_id: 4,
        id: 3,
        description: "Sounds exciting, I want to be part of this!",
        date_created: '2024-01-02 18:48:36',
    }
]

const seedComments = async () => {
    await Comment.bulkCreate(commentsData)
        .then(() => {
            console.log('Comments inserted successfully.');
        })
        .catch((error) => {
            console.error('Error inserting comments:', error);
        });
};

module.exports = seedComments;