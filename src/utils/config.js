const { MissingEnvironmentVariableError } = require('../errors');

const requiredEnvironmentVariables = ['JWT_KEY', 'MONGO_HOST', 'MONGO_PORT', 'MONGO_DBNAME'];
const missingEnvironmentVariables = requiredEnvironmentVariables.filter(key => !process.env[key]);

if (process.env.NODE_ENV !== 'test' && missingEnvironmentVariables.length !== 0) {
  throw new MissingEnvironmentVariableError(missingEnvironmentVariables.join(', '));
}

// Port for the API to listen on
const PORT = process.env.PORT || 3000;

// Authentication
const JWT_KEY = process.env.JWT_KEY;
const AUTH_SALT_ROUNDS = 10;

// MongoDB Connectivity
const MONGO_HOST = process.env.MONGO_HOST;
const MONGO_PORT = parseInt(process.env.MONGO_PORT, 10);
const MONGO_DBNAME = process.env.MONGO_DBNAME;
const MONGO_URI = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`;
const MONGO_POOLSIZE = parseInt(process.env.MONGO_POOLSIZE, 10) || 4;

// Pagination
const PAGINATION_DEFAULT_LIMIT = 10;

module.exports = {
  PORT,

  JWT_KEY,
  AUTH_SALT_ROUNDS,

  MONGO_HOST,
  MONGO_PORT,
  MONGO_DBNAME,
  MONGO_URI,
  MONGO_POOLSIZE,

  PAGINATION_DEFAULT_LIMIT
};
