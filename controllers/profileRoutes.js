const router = require('express').Router();
const { User, Blogpost, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Request to GET all blogs by the user
router.get('/:id', withAuth, async (req, res) => {
    console.log("GET request for the profile page by author_id!");

    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: [
                {
                  model: Blogpost,
                  attributes: ['title', 'description'],
                },
            ],
        });

        const user = userData.get({ plain: true });
        console.log(user);
        console.log("hello?");

        res.render('user profile', { user });

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// New blogpost POST Route
router.post('/:id', withAuth, async (req, res) => {
    console.log("POST route to create a new blog was hit!");

    try {
        const newPost = await Blogpost.create({
            title: req.body.title,
            description: req.body.description,
            // Add any other necessary fields
            user_id: req.session.user_id, // Associate the post with the logged-in user
        });

        res.status(200).json("A new post should be added!");
        // res.status(200).json(newPost);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
