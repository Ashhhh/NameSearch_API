const passport = require('passport');

const { serializeUser } = require('./serialize-user.function');
const { deserializeUser } = require('./deserialize-user.function');

const { jwtStrategy } = require('./jwt.strategy');
const { localStrategy } = require('./local.strategy');

passport.use(localStrategy);
passport.use(jwtStrategy);

passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

module.exports = {
  passport
};
