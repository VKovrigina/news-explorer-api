const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const {
  invalidEmailMessage,
  wrongEmailPasswordMessage,
  requiredNameMessage,
  requiredEmailMessage,
  uniqueEmailMessage,
  minlengthNameMessage,
  maxlengthNameMessage,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, requiredNameMessage],
    minlength: [2, minlengthNameMessage],
    maxlength: [30, maxlengthNameMessage],
  },
  email: {
    type: String,
    required: [true, requiredEmailMessage],
    unique: [true, uniqueEmailMessage],
    validate: {
      validator: (v) => isEmail(v),
      message: invalidEmailMessage,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(wrongEmailPasswordMessage));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(wrongEmailPasswordMessage));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
