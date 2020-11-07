const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const { limiter } = require('./utils/constants');
const handlerErrors = require('./middlewares/handlerErrors');

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(limiter);
app.use(cookieParser());
app.use(router);
app.use(handlerErrors);

module.exports = app;
