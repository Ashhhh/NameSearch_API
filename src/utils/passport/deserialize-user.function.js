const userService = require('../../services/user.service');

function deserializeUser(username, done) {
  userService.getUserByUsername(username)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err);
    });
}

module.exports = {
  deserializeUser
};
