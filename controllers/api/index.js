const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./blogpostRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/user', userRoutes);
router.use('/blogpost', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;