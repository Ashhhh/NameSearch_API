const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtCookieComboStrategy = require('passport-jwt-cookiecombo');
const userService = require('../services/user.service');
const { JWT_KEY } = require('./config');

async function localStrategyFunc(username, password) {
  const user = await userService.getUserByUsername(username);

  if (!user) {
    return false;
  }

  const comparison = await userService.comparePassword(password, user.password);

  return comparison;
}

passport.use(new LocalStrategy((username, password, done) => {
  return localStrategyFunc(username, password)
    .then(user => {
      if (!user) {
        done(null, user);
      } else {
        done(null, false, { message: 'Username or Password is incorrect' });
      }
    })
    .catch(err => {
      done(err);
    });
}));

passport.use(new JwtCookieComboStrategy({
  secretOrPublicKey: JWT_KEY
}, (payload, done) => {
  return done(null, payload.username);
}));

function serializeUserFunct(user, done) {
  done(null, user.username);
}

// Could be async if we wanted it to
passport.serializeUser(serializeUserFunct);

async function deserializeUserFunct(username) {
  const user = await userService.getUserById(username);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

// ASYNC ALL THE THINGS!!
passport.deserializeUser(async (email, done) => {
  return deserializeUserFunct(email)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err);
    });
});

module.exports = {
  passport,
  __localStrategyFunc: localStrategyFunc,
  __serializeUserFunct: serializeUserFunct,
  __deserializeUserFunct: deserializeUserFunct
};
