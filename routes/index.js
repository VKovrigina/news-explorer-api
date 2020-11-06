const router = require('express').Router();
const checkPassword = require('../middlewares/checkPassword');
const { createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError.js');
const auth = require('../middlewares/auth');
const { notFoundRouteMessage } = require('../utils/constants');
const { usersRouter } = require('./users');
const { articlesRouter } = require('./articles');

router.post('/signin', checkPassword, login);
router.post('/signup', checkPassword, createUser);
router.use(auth);
router.use('/users', usersRouter);
router.use('/articles', articlesRouter);
router.all('*', () => {
  throw new NotFoundError(notFoundRouteMessage);
});

module.exports = router;
