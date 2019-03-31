const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AUTH_SALT_ROUNDS, JWT_KEY } = require('../utils/config');

/**
 * Encrypts a password suitable for database entry
 * @param {String} password Desired password
 * @returns {Promise} Promise that resolves with the encrypted password result
 */
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(AUTH_SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
}

/**
 *
 * @param {String} candidatePassword Attempted password
 * @param {String} hash Hashed password (found in the DB) to attempt to compare to
 * @returns {Promise} Promise that resolves with the boolean result of the comparison.
 */
function comparePassword(candidatePassword, hash) {
  return bcrypt.compare(candidatePassword, hash);
}

/**
 * Creates a JWT string from a user
 * @param {User} user Mongoose User model
 */
function signUserJwt(user) {
  const jwtToken = jwt.sign({ user }, JWT_KEY);

  return jwtToken;
}

module.exports = {
  hashPassword,
  comparePassword,
  signUserJwt
};
