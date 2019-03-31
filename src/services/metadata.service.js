const package = require('../../package.json');

/**
 * Returns some metadata about the current API
 */
function getMetadata() {
  return {
    version: package.version,
    name: package.name
  };
}

module.exports = {
  getMetadata
};
