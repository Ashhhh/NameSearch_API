function serializeUser(user, done) {
  done(null, user.username);
}

module.exports = {
  serializeUser
};
