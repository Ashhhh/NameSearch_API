var JwtStrategy = require('passport-jwt').Strategy;
const { getJwt } = require('../../controllers/auth.controller');
const authService = require('../../services/auth.service');
const { JWT_KEY } = require('../../utils/config');

const jwtStrategy = new JwtStrategy({
  jwtFromRequest: getJwt,
  secretOrKey: JWT_KEY
}, (jwtPayload, done) => {
  authService.getUserFromJwt(jwtPayload)
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    })
    .catch(err => {
      done(err, false);
    });
});

module.exports = {
  jwtStrategy
};
