const User = require('./User');
const Blogpost = require('./Blogpost');

// User can have many blogposts
User.hasMany(Blogpost, {
    foreignKey: 'author_id'
})

// Blogposts can only have 1 user
Blogpost.belongsTo(User, {
    foreignKey: 'author_id'
});


module.exports = { User, Blogpost };