
const { User } = require('../db/models/user.model');
const authService = require('./auth.service');

/**
 * Creates a new user for logging into the system
 * @param {String} username Desired username
 * @param {String} password Desired password
 * @returns {Promise} Newly created User as a Mongoose model
 */
async function createUser(username, password) {
  const hashedPassword = await authService.hashPassword(password);

  const user = await User.create({ username, password: hashedPassword });

  return user;
}

module.exports = {
  createUser
};
