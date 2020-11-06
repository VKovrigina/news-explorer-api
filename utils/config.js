const { JWT_SECRET = 'secret-key' } = process.env;
const MONGO_ADDRESS = 'mongodb://localhost:27017/newsExplorer';
const MONGO_TEST_ADDRESS = 'mongodb://localhost:27017/testMongo';
module.exports = { JWT_SECRET, MONGO_ADDRESS, MONGO_TEST_ADDRESS };
