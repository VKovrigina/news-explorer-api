const BadRequestError = require('../errors/BadRequestError');
const { requiredPasswordMessage } = require('../utils/constants');

const checkPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || !password.trim() || password.trim().length < 5) {
    throw new BadRequestError(requiredPasswordMessage);
  } else {
    next();
  }
};

module.exports = checkPassword;
