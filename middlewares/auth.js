const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV, JWT_SECRET_DEV } = require('../utils/config');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { loginErrorMesaage } = require('../utils/constants');

module.exports = (req, res, next) => {
  if (!req.cookies) {
    throw new UnauthorizedError(loginErrorMesaage);
  }
  if (!req.cookies.token) {
    throw new UnauthorizedError(loginErrorMesaage);
  }

  const { token } = req.cookies;

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    throw new UnauthorizedError(loginErrorMesaage);
  }

  req.user = payload;

  next();
};
