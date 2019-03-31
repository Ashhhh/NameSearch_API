/* eslint no-underscore-dangle: 0 */

const { Name } = require('../db/models/name.model');

/**
 * Creates a regex for matching with Name.nameLowerCase
 * @param {String} searchTerm Search term to generate a regex for
 */
function getSearchRegex(searchTerm) {
  return new RegExp('^' + searchTerm.toLowerCase(), 'i');
}

/**
 * Creates an object representing Mongoose conditions for executing the search
 * @param {String} searchTerm Search term to generate conditions for
 */
function getSearchQuery(searchTerm) {
  return (searchTerm && searchTerm.trim())
    ? { nameLowerCase: { $regex: getSearchRegex(searchTerm) } } : {};
}

/**
 * Searches the database for a list of names meeting the specified criteria
 * @param {String} searchTerm Only return results which begin with this search term
 */
function searchNames(searchTerm) {
  const itemsQuery = Name.find(getSearchQuery(searchTerm));

  return itemsQuery.exec();
}

module.exports = {
  getSearchRegex,
  getSearchQuery,
  searchNames
};
