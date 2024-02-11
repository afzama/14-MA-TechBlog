const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const withAuth = require('../../utils/auth');


//login
router.post("/login", (req, res) => {
    //1. find the user who is trying to login
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(foundUser => {
        console.log("Found User:", foundUser);
        if (!foundUser) {
            res.status(401).json({ msg: "Invalid username/password" })
        } else {
            if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
                res.status(401).json({ msg: "Invalid username/password" })
            } else {
                req.session.user = {
                    id: foundUser.id,
                    email: foundUser.email
                }
                res.json(foundUser)
            }
        }
    })
})

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