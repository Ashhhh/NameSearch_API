const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const { passport } = require('./utils/passport');

const authController = require('./controllers/auth.controller');
const namesController = require('./controllers/names.controller');
const rootController = require('./controllers/root.controller');

const publicRouter = express.Router();
publicRouter.use('/', swaggerUi.serve);
publicRouter.get('/', swaggerUi.setup(swaggerDocument));
publicRouter.post('/api/v1/auth/login', passport.authenticate('local'), authController.createJwt);
publicRouter.post('/api/v1/auth/register', authController.register, authController.createJwt);
publicRouter.post('/api/v1/auth/logout', authController.clearJwt);

const secureRouter = express.Router();

secureRouter.use(passport.authenticate('jwt', { session: false }));

secureRouter.get('/api/v1', rootController.getMetadata);
secureRouter.get('/api/v1/names', namesController.getNames);

module.exports = {
  publicRouter,
  secureRouter
};
