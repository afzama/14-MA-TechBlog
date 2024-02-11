const { User } = require('../models');
const bcrypt = require('bcrypt');

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
    const hashedUsers = await Promise.all(userData.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return {
            ...user,
            password: hashedPassword,
        };
    }));
    await User.bulkCreate(hashedUsers);
};

module.exports = { seedUsers };