const sinon = require('sinon');
const chai = require('chai');

const rootController = require('../../src/controllers/root.controller');

describe('controllers/root.controller', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('getMetadata', () => {
    it('Should return the version and name', () => {
      const req = {};
      const res = {
        json: sinon.spy()
      };

      rootController.getMetadata(req, res);

      chai.expect(res.json.args[0][0]).to.have.all.keys('version', 'name');
    });
  });
});
