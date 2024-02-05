const User = require('./User');
const Blogpost = require('./Blogpost');
const Comments = require('./Comment');

// User can have many blogposts
User.hasMany(Blogpost, {
    foreignKey: 'author_id'
})

// Blogposts can only have 1 user
Blogpost.belongsTo(User, {
    foreignKey: 'author_id'
});

//User can have many comments
User.hasMany(Comments, {
    foreignKey: 'user_id'
})

//Comments can only belong to 1 user
Comments.belongsTo(User, {
    foreignKey: 'user_id'
});

//Blogpost can have many comments
Blogpost.hasMany(Comments, {
    foreignKey: 'comments_id'
});

//Comment can only belong to a blogpost
Comments.belongsTo(Blogpost, {
    foreignKey: 'comments_id'
});

module.exports = { User, Blogpost, Comments };