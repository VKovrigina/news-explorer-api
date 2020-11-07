const mongoose = require('mongoose');
const app = require('./app.js');
const { MONGO_ADDRESS } = require('./utils/config');

const { PORT = 3000 } = process.env;

mongoose.connect(MONGO_ADDRESS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(PORT);
