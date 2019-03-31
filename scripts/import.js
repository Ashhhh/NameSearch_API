require('../src/db/connection');
const names = require('./names.json');
const { Name } = require('../src/db/models/name.model');
const { logger } = require('../src/utils/logger');

const importNames = names.map(row => {
  return {
    name: row.name,
    nameLowerCase: row.name.toLowerCase()
  };
});

Name.collection.insert(importNames, (err) => {
  if (err) {
    logger.log({
      level: 'crit',
      message: err.message
    });
    return;
  }

  logger.log({
    level: 'info',
    message: `${importNames.length} names successfully imported`
  });
});
