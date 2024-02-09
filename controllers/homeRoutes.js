const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blogpost, User, Comment } = require('../models');

router.get('/', (req, res) => {
  Blogpost.findAll({
    attributes: [
      'id',
      'title',
      "post_text",
      'created_at'      
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbblogpostData => {
      const blogposts = dbblogpostData.map(blogpost => blogpost.get({ plain: true }));
      // pass a single blogpost object into the homepage template
      res.render('homepage', { 
        blogposts,
        loggedIn: req.session.loggedIn 
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get('/blogpost/:id', (req, res) => {
  Blogpost.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'blogpost_text',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: [
          'id',
          'comment_text',
          'blogpost_id',
          'user_id',
          'created_at'
        ],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
  .then(dbblogpostData => {
    if (!dbblogpostData) {
      res.status(404).json({ message: 'No Blogpost found with this id' });
      return;
    }
    //serialize the data
    const blogpost = dbblogpostData.get({ plain: true });

    //pass data to the template
    res.render('single-blogpost', {
      blogpost, 
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;