const winston = require('winston');

/**
 * Note: In a real app, we would most definitely log this to sentry or another external method
 */
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

module.exports = {
  logger
};
