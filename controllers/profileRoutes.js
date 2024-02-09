const router = require('express').Router();
const { User, Blogpost, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all Blogposts
router.get('/', withAuth, (req, res) => {
  Blogpost.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: ['id', 'title', 'post_text', 'created_at'],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
  .then(dbBlogpostData => {
    //serialize the data before passing to the template
    const Blogposts = dbBlogpostData.map(Blogpost => Blogpost.get({ plain: true }));
    res.render('dashboard', { Blogposts, loggedIn: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

//get a single Blogpost
router.get('/edit/:id', withAuth, (req, res) => {
  Blogpost.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'title', 'Blogpost_text', 'created_at'],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'Blogpost_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
    .then(dbBlogpostData => {
      if (!dbBlogpostData) {
        res.status(404).json({ message: 'No Blogpost found with this id' });
        return;
      }
      //serialize the data
      const Blogpost = dbBlogpostData.get({ plain: true });
      // pass to the template
      res.render('edit-Blogpost', {
        Blogpost,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/new', (req, res) => {
  res.render('new-Blogpost');
});


module.exports = router;