const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create a new comment for a specific blog post
router.post('/blogpost/:blogpostId/comment', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      user_id: req.session.user_id,
      blogpost_id: req.params.blogpostId,
    });

    res.json({
      success: true,
      comment: newComment,
      message: 'New comment created!',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get comments for a specific blog post
router.get('/blogpost/:blogpostId/comments', withAuth, async (req, res) => {
  try {
    const comment = await Comment.findAll({
      where: {
        blogpost_id: req.params.blogpostId,
      },
    });

    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// UPDATE comment
router.put('/comment/:commentId', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.commentId,
        user_id: req.session.user_id,
      },
    });

    if (!commentData[0]) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.json({
      success: true,
      data: commentData,
      message: 'Comment updated!',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE comment
router.delete('/comment/:commentId', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.commentId,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Comment deleted!' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
