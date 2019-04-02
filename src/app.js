require('./db/connection');
const express = require('express');
const cors = require('cors');
const { PORT, COOKIE_KEY } = require('./utils/config');
const { publicRouter, secureRouter } = require('./routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { logger } = require('./utils/logger');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser(COOKIE_KEY));
app.use(publicRouter);
app.use(secureRouter);

app.listen(PORT, () => {
  logger.log({
    level: 'info',
    message: `Started on port: ${PORT}`
  });
});

module.exports = {
  app
};
