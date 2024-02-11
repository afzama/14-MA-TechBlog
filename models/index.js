const User = require('./User');
const Blogpost = require('./Blogpost');
const Comment = require('./Comment');

// User can have many blogposts
User.hasMany(Blogpost, {
    foreignKey: 'user_id'
});

// Blogpost can only have 1 user
Blogpost.belongsTo(User, {
    foreignKey: 'user_id'
});

// User can have many comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

// Comments can only belong to 1 user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// Blogpost can have many comments
Blogpost.hasMany(Comment, {
    foreignKey: 'blogpost_id'
});

// Comment can only belong to a blogpost
Comment.belongsTo(Blogpost, {
    foreignKey: 'blogpost_id'
});

module.exports = { User, Blogpost, Comment };
