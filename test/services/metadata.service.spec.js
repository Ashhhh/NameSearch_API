const chai = require('chai');

const metadataService = require('../../src/services/metadata.service');
const package = require('../../package.json');

describe('services/metadata.service', () => {
  describe('getMetadata', () => {
    it('Should return a the API version and name', () => {
      const expected = {
        version: package.version,
        name: package.name
      };

      chai.expect(metadataService.getMetadata()).to.eql(expected);
    });
  });
});
