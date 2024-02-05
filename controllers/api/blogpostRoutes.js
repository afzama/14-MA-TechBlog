const router = require('express').Router();
const bcrypt = require('bcrypt');
const { Blogpost } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new Blogpost
router.post('/blogpost', async (req, res) => {
    try {
        const newPost = await Blogpost.create({
            title: req.body.title,
            description: req.body.description,
            user_id: req.session.user_id,
        });

        res.json({
            success: true,
            data: newPost,
            message: 'New post created!',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Get an existing blogpost by the ID
router.get('/blogpost/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blogpost.findByPk(req.params.id);
        if (!blogData) {
            res.status(404).json({ success: false, message: 'No blog found with this id!' });
            return;
        }

        const blogObj = {
            id: blogData.id,
            title: blogData.title,
            description: blogData.description,
        };

        res.json({ success: true, data: blogObj });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Update a blogpost
router.put('/blogpost/:id', async (req, res) => {
    try {
        const blogData = await Blogpost.update(req.body, {
            where: { id: req.params.id },
        });

        res.json({
            success: true,
            data: blogData,
            message: 'Blog post updated!',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Delete a blogpost
router.delete('/blogpost/:id', async (req, res) => {
    try {
        const blogData = await Blogpost.destroy({
            where: { id: req.params.id },
        });

        if (!blogData) {
            res.status(404).json({ success: false, message: 'No blog found with this id!' });
            return;
        }

        res.json({ success: true, data: blogData, message: 'Blog post deleted!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: err.message });
    }
});


module.exports = router;