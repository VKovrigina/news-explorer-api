const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const { limiter } = require('./utils/constants');
const handlerErrors = require('./middlewares/handlerErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handlerErrors);

module.exports = app;
