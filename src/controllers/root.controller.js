const metadataService = require('../services/metadata.service');

/**
 * Returns basic metadata about the API
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
function getMetadata(req, res) {
  const metadata = metadataService.getMetadata();

  res.json(metadata);
}

module.exports = {
  getMetadata
};
