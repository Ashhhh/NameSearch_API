const nameService = require('../services/name.service');

/**
 * Returns a list of names. You can use search in the query parameters to filter the list
 * @param {Express.Request} req
 * @param {String} req.query.search Search term
 * @param {Express.Response} res
 */
async function getNames(req, res) {
  const searchTerm = req.query.search;

  const names = await nameService.searchNames(searchTerm);

  res.json(names);
}

module.exports = {
  getNames
};
