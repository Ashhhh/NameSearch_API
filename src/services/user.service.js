const { User } = require('../db/models/user.model');

/**
 * Finds a single user in the database via their username
 * @param {String} username Username of user
 * @returns {Promise} Promise that resolves with the found user or undefined if a user was not found
 */
function getUserByUsername(username) {
  return User.findOne({ username }).exec();
}

module.exports = {
  getUserByUsername
};
