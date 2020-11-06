const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../utils/config');
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
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError(loginErrorMesaage);
  }

  req.user = payload;

  next();
};
