const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { limiter } = require('./utils/constants');
const { MONGO_ADDRESS } = require('./utils/config');

const app = express();

mongoose.connect(MONGO_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(limiter);

module.exports = app;
