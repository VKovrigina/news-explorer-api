const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  uniqueEmailMessage,
  createUserMessage,
  loginMessage,
  loginErrorMesaage,
} = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');

module.exports.createUser = (req, res, next) => {
  const {
    name: userName,
    email: userEmail,
    password: userPassword,
  } = req.body;
  bcrypt.hash(userPassword, 10)
    .then((hash) => User.create({
      name: userName,
      email: userEmail,
      password: hash,
    }))
    .then(() => res
      .status(200)
      .send({ message: createUserMessage }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`);
      }
      if (err.code === 11000 && err.name === 'MongoError') {
        throw new ConflictError(uniqueEmailMessage);
      }
      throw err;
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '1d' },
      );
      res
        .status(200)
        .cookie('token', token, {
          httpOnly: true,
        })
        .send({ message: loginMessage })
        .end();
    })
    .catch(() => {
      next(new UnauthorizedError(loginErrorMesaage));
    });
};
