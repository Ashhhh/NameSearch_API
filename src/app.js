require('./db/connection');
const express = require('express');
const config = require('./utils/config');
const routes = require('./routes');
const { logger } = require('./utils/logger');

const app = express();

app.use(routes);

app.listen(config.PORT, () => {
  logger.log({
    level: 'info',
    message: `Started on port: ${config.PORT}`
  });
});

module.exports = {
  app
};
