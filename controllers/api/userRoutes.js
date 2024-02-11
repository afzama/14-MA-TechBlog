const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const withAuth = require('../../utils/auth');


//login
router.post("/login", async (req, res) => {
    try {
        //find the user who is trying to login
        const foundUser = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        console.log("foundUser", foundUser)
        if (!foundUser || !bcrypt.compareSync(req.body.password, foundUser.password)) {
            res.status(401).json({ msg: "Invalid username/password" });
            return;
        }
        console.log(req.session.user)
        req.session.user = {
            id: foundUser.id,
            email: foundUser.email
        };

        // Redirect to the homepage
        res.redirect('/');

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//User logout route
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

// Create a new user
router.post('/signup', async (req, res) => {
    const signupData = req.body;
    console.log(signupData);

    try {
        // Create the user based on the request body sent over
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        // sign-in the user 
        req.session.save(() => {
            req.session.user_id = newUser.id,
                req.session.name = newUser.name,
                req.session.logged_in = true;

            res.json({
                success: true,
                user: newUser,
                message: 'You are now logged in!'
            });
        });

    } catch (err) {
        res.status(500).json(err)
    }

});

module.exports = router;