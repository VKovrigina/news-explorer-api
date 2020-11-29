const router = require('express').Router();
const checkPassword = require('../middlewares/checkPassword');
const { createUser, login, logout } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError.js');
const auth = require('../middlewares/auth');
const { notFoundRouteMessage } = require('../utils/constants');
const { usersRouter } = require('./users');
const { articlesRouter } = require('./articles');
const { validateCreateUser, validateLogin } = require('../middlewares/requestValidation');

router.post('/signin', checkPassword, validateLogin, login);
router.post('/signup', checkPassword, validateCreateUser, createUser);
router.use(auth);
router.get('/logout', logout);
router.use('/users', usersRouter);
router.use('/articles', articlesRouter);
router.all('*', () => {
  throw new NotFoundError(notFoundRouteMessage);
});

module.exports = router;
