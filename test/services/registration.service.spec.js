const chai = require('chai');
const sinon = require('sinon');
const faker = require('faker');

const registrationService = require('../../src/services/registration.service');
const { User } = require('../../src/db/models/user.model');
const authService = require('../../src/services/auth.service');

describe('services/registration.service', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('createUser', () => {
    it('should create a new user with the desired username and a hashed password', async () => {
      const username = faker.internet.userName();
      const password = faker.internet.password();

      const hashedPassword = await authService.hashPassword(password);

      sinon.stub(authService, 'hashPassword').resolves(hashedPassword);

      const mockSavedUser = {
        _id: '01234567',
        username,
        password: hashedPassword
      };

      sinon.stub(User, 'create').resolves(mockSavedUser);

      const result = await registrationService.createUser(username, password);

      chai.expect(User.create.called);
      chai.expect(User.create.calledWith({ username, password: hashedPassword }));
      chai.expect(result).to.eql(mockSavedUser);
    });
  });
});
