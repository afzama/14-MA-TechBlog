const { User } = require('../models');

const userData = [
    {
        "name": "Sally Hansen",
        "email": "hansensalon@gmail.com",
        "password": "expertnails1234!"
    },
    {
        "name": "Ross Franz",
        "email": "franz@hotmail.com",
        "password": "password12345"
    },
    {
        "name": "Emily Cooper",
        "email": "coopcoop@aol.com",
        "password": "chimey4life@!"
    },
    {
        "name": "Maria Afzal",
        "email": "mbapixel3xl@gmail.com",
        "password": "bloggersunite!5688"
    }
]

const seedUsers = async () => {
    await User.bulkCreate(userData);
};

module.exports = { seedUsers };