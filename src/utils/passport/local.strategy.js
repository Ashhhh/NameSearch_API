const authService = require('../../services/auth.service');
const LocalStrategy = require('passport-local').Strategy;

const localStrategy = new LocalStrategy((username, password, done) => {
  return authService.login(username, password)
    .then(user => {
      if (user) {
        done(null, user);
      } else {
        done(null, false, { message: 'Username or Password is incorrect' });
      }
    })
    .catch(err => {
      done(err);
    });
});

module.exports = {
  localStrategy
};
