const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, Blogpost, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//User login route
router.post('/login', async (req, res) => {
    console.log("POST request hit!")
    try {

        // get the response body (the object we created)back from the login.js form when submitted
        console.log("Request body from userRoutes:", req.body);
        // check first to see if the users email is in our db - if it is then proceed to the password, if not then throw an error
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        console.log(userData);

        // using if(userData) - meaning we are checking to see if we get anything back, then we are going to check for the password, otherwise we will throw an error saying that user does not exist.
        if (userData) {
            console.log("That user is in the DB - checking for the password now")

            // checking for password through the bcrypt
            const match = await bcrypt.compare(req.body.password, userData.password);
            if (match) {
                req.session.save(() => {
                    req.session.user_id = userData.id;
                    req.session.name = userData.name;
                    req.session.logged_in = true;

                    res.json({
                        success: true,
                        user: userData,
                        message: 'You are now logged in!'
                    });
                });
                console.log(req.session.logged_in)
            } else {
                return res.status(400).json("Password was incorrect!")
            }
        } else {
            return res.status(400), json("That user does not exist in our DB - please create an account to access these features.")
        }
    } catch (err) {
        res.status(500).json(err)
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