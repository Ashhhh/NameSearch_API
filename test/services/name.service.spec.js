/* eslint no-underscore-dangle: 0 */

const chai = require('chai');
const sinon = require('sinon');
const faker = require('faker');
const sinonChai = require('sinon-chai');
const mongoose = require('mongoose');

chai.use(sinonChai);

const nameService = require('../../src/services/name.service');
const { Name } = require('../../src/db/models/name.model');

describe('services/name.service', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('getSearchRegex', () => {
    it('Should return a regex. Attempt a match', () => {
      const failures = [
        ['abc', 'def'],
        ['def', 'abc'],
        ['aaa', 'aab'],
        ['aaa', 'bbb aaa'] // Multiple words,  but doesnt start with the search term
      ];

      const success = [
        ['', 'abc'], // Empty string search
        ['Aab', 'aab'], // Case insensitve
        ['aab', 'Aab'], // Comparison case insensitive
        ['aab', 'aab def'] // Multiple words
      ];

      failures.forEach(([searchTerm, comparison]) => {
        const regex = nameService.getSearchRegex(searchTerm);

        chai.expect(comparison.search(regex)).to.eq(-1);
      });

      success.forEach(([searchTerm, comparison]) => {
        const regex = nameService.getSearchRegex(searchTerm);

        chai.expect(comparison.search(regex)).not.to.eq(-1);
      });
    });
  });

  describe('getSearchQuery', () => {
    it('Should return an empty object if no search term', () => {
      chai.expect(nameService.getSearchQuery()).to.eql({});
      chai.expect(nameService.getSearchQuery('')).to.eql({});
      chai.expect(nameService.getSearchQuery(' ')).to.eql({});
    });

    it('Should create a Mongoose conditions object', () => {
      const searchTerm = faker.lorem.word();

      const result = nameService.getSearchQuery(searchTerm);
      const regex = nameService.getSearchRegex(searchTerm);

      chai.expect(result).to.eql({ nameLowerCase: { $regex: regex } });
    });
  });

  describe('searchNames', () => {
    it('Should return all names and pass no parameters', async () => {
      const mockItems = [];

      for (let i = 0; i < faker.random.number(100); i += 1) {
        mockItems.push({
          _id: mongoose.Types.ObjectId()
        });
      }

      const queryStub = {
        exec: sinon.stub().resolves(mockItems)
      };
      sinon.stub(Name, 'find').returns(queryStub);

      const result = await nameService.searchNames();

      chai.expect(result).to.eql(mockItems);
      chai.expect(Name.find).to.have.been.calledWith({});
    });

    it('should search via the provided searchTerm', async () => {
      const searchTerm = faker.lorem.word();
      const searchQuery = nameService.getSearchQuery(searchTerm);

      const queryStub = {
        exec: sinon.stub()
      };
      sinon.stub(Name, 'find').returns(queryStub);

      await nameService.searchNames(searchTerm);

      chai.expect(Name.find).to.have.been.calledWith(searchQuery);
    });
  });
});
