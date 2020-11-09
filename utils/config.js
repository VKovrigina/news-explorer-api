const { JWT_SECRET, NODE_ENV, MONGO_ADDRESS } = process.env;
const MONGO_TEST_ADDRESS = 'mongodb://localhost:27017/testMongo';
const JWT_SECRET_DEV = 'secret-key';
const MONGO_ADDRESS_DEV = 'mongodb://localhost:27017/newsExplorer';
module.exports = {
  JWT_SECRET,
  MONGO_ADDRESS,
  MONGO_TEST_ADDRESS,
  JWT_SECRET_DEV,
  MONGO_ADDRESS_DEV,
  NODE_ENV,
};
