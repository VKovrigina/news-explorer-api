const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const NotFoundError = require('./errors/NotFoundError.js');
const { createUser, login } = require('./controllers/users');
const { limiter } = require('./utils/constants');
const { MONGO_ADDRESS } = require('./utils/config');

const { errorServerMessage, notFoundRouteMessage } = require('./utils/constants');

const app = express();

mongoose.connect(MONGO_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(cors());

app.use(helmet());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(limiter);

app.post('/signin', login);

app.post('/signup', createUser);

app.all('*', () => {
  throw new NotFoundError(notFoundRouteMessage);
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? errorServerMessage
        : message,
    });

  next();
});

module.exports = app;
