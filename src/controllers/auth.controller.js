const authService = require('../services/auth.service');
const userService = require('../services/user.service');
const registrationService = require('../services/registration.service');

/**
 * Set and return a JWT after a successful passport authentication
 * @param {Express.Request} req Express Request
 * @param {Object} req.user Mongoose user model
 * @param {Express.Response} res Express Response
 */
async function createJwt(req, res) {
  const jwt = authService.createJwtFromUser(req.user);
  const production = process.env.NODE_ENV === 'production';

  res.cookie('jwt', jwt, {
    httpOnly: true,
    sameSite: production,
    signed: true,
    secure: production
  });

  return res.json({ jwt });
}

/**
 * Get a JWT from the express request
 * @param {*} req Express Request
 * @returns {String} JWT Token
 */
function getJwt(req) {
  if (req) {
    let headerJwt = req.header('Authorization');

    if (headerJwt) {
      headerJwt = headerJwt.replace('Bearer ', '');
    }

    const cookieJwt = req.cookies.jwt;

    return headerJwt || cookieJwt;
  }

  return null;
}

/**
 * Register a new user and assign it to req.user for passport authentication
 * @param {Express.Request} req Express Request
 * @param {Express.Response} res Express Response
 */
async function register(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  if (await userService.getUserByUsername(username)) {
    res.status(403).json({ message: 'User already exists with that username' });
    return;
  }

  const newUser = await registrationService.createUser(username, password);
  req.user = newUser;
  next();
}

/**
 * Logs the user out
 * @param {Express.Request} req Express Request
 * @param {Express.Response} res Express Response
 */
async function clearJwt(req, res) {
  req.logout();
  res.clearCookie('jwt');
  res.status(200).send();
}

module.exports = {
  createJwt,
  getJwt,
  clearJwt,
  register
};
