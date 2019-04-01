const chai = require('chai');
const sinon = require('sinon');
const faker = require('faker');
const mongoose = require('mongoose');

const userService = require('../../src/services/user.service');
const { User } = require('../../src/db/models/user.model');

describe('services/user.service', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('getUserByUsername', () => {
    it('Should attempt to search the User model via the username field', async () => {
      const mockUsername = faker.internet.userName();
      const mockUser = {
        ObjectId: faker.random.alphaNumeric(12),
        username: mockUsername,
        password: faker.random.alphaNumeric(12)
      };

      const mockDocumentQuery = {
        exec: sinon.stub().resolves(mockUser)
      };
      sinon.stub(User, 'findOne').returns(mockDocumentQuery);

      const result = await userService.getUserByUsername(mockUsername);

      chai.expect(User.findOne.calledWith({ username: mockUsername }));
      chai.expect(result).to.eql(mockUser);
    });
  });

  describe('getUserByUsername', () => {
    it('Should attempt to search the User model via its username ', async () => {
      const mockUsername = faker.internet.userName();
      const mockUser = {
        ObjectId: mongoose.Types.ObjectId(),
        username: mockUsername,
        password: faker.random.alphaNumeric(12)
      };

      const mockDocumentQuery = {
        exec: sinon.stub().resolves(mockUser)
      };
      sinon.stub(User, 'findOne').returns(mockDocumentQuery);

      const result = await userService.getUserByUsername(mockUsername);

      chai.expect(User.findOne).to.have.been.calledWith({ username: mockUsername });
      chai.expect(result).to.eql(mockUser);
    });
  });
});
