const mongoose = require('mongoose');
const app = require('./app.js');
const { MONGO_ADDRESS, MONGO_ADDRESS_DEV, NODE_ENV } = require('./utils/config');

const { PORT = 3000 } = process.env;

mongoose.connect(NODE_ENV === 'production' ? MONGO_ADDRESS : MONGO_ADDRESS_DEV, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(PORT);
