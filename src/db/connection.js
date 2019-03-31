const mongoose = require('mongoose');
const { MONGO_URI, MONGO_POOLSIZE } = require('../utils/config');

const connection = mongoose.connect(MONGO_URI, { poolSize: MONGO_POOLSIZE });

module.exports = {
  connection
};
