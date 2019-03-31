const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const { passport } = require('./utils/passport');

const authController = require('./controllers/auth.controller');
const namesController = require('./controllers/names.controller');
const rootController = require('./controllers/root.controller');

const router = express.Router();

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument));

router.get('/api/v1', rootController.getMetadata);
router.get('/api/v1/auth/login', passport.authenticate('local'), authController.createJwt);
router.get('/api/v1/auth/register', authController.register, authController.createJwt);
router.get('/api/v1/names', namesController.getNames);

module.exports = router;