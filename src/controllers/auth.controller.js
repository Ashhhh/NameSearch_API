const authService = require('../services/auth.service');
const userService = require('../services/user.service');
const registrationService = require('../services/registration.service');

/**
 * Set and return a JWT after a successful passport authentication
 * @param {Express.Request} req Express Request
 * @param {Express.Response} res Express Response
 */
async function createJwt(req, res) {
  const jwt = authService.signUserJwt(req.user);

  res.cookie('jwt', jwt, {
    httpOnly: true,
    sameSite: true,
    signed: true,
    secure: true
  });

  return res.json({ jwt });
}

/**
 * Register a new user and assign it to req.user for passport authentication
 * @param {Express.Request} req Express Request
 * @param {Express.Response} res Express Response
 */
async function register(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (await userService.getUserByUsername(username)) {
    res.status(403).json({ message: 'User already exists with that username' });
    return;
  }

  const newUser = await registrationService.createUser(username, password);
  req.user = newUser;
}

module.exports = {
  createJwt,
  register
};
