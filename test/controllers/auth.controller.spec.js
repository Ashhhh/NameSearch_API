const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const faker = require('faker');

chai.use(sinonChai);

const config = require('../../src/utils/config');
const authController = require('../../src/controllers/auth.controller');
const authService = require('../../src/services/auth.service');
const userService = require('../../src/services/user.service');
const registrationService = require('../../src/services/registration.service');

config.JWT_KEY = faker.lorem.word();

describe('controllers/auth.controller', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('createJwt', () => {
    it('Should assign a jwt from the provided user', async () => {
      const mockUser = {
        username: faker.internet.userName(),
        password: await authService.hashPassword(faker.internet.password())
      };

      const req = {
        user: mockUser
      };
      const res = {
        cookie: sinon.spy(),
        json: sinon.spy()
      };

      const expectedJwt = authService.createJwtFromUser(mockUser);

      await authController.createJwt(req, res);

      chai.expect(res.json.calledWith('jwt', expectedJwt));
    });
  });

  describe('register', () => {
    it('Should throw an error user already exists', async () => {
      const mockUserUsername = faker.internet.userName();
      const mockUser = {
        username: mockUserUsername,
        password: authService.hashPassword(faker.internet.password())
      };

      sinon.stub(registrationService, 'createUser');
      sinon.stub(userService, 'getUserByUsername').resolves(mockUser);
      const req = {
        body: {
          username: mockUserUsername,
          password: faker.internet.password()
        }
      };

      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);


      await authController.register(req, res);

      chai.expect(res.status.calledWith(403)).to.eq(true);
      chai.expect(res.json.called).to.eq(true);
    });

    it('should create a new user and assign it to req.user for passport', async () => {
      const mockUser = {
        ObjectId: faker.random.alphaNumeric(12),
        username: faker.internet.userName(),
        password: authService.hashPassword(faker.internet.password())
      };

      const next = sinon.stub();

      sinon.stub(registrationService, 'createUser').resolves(mockUser);
      sinon.stub(userService, 'getUserByUsername').resolves(undefined);

      const req = {
        body: {
          username: mockUser.username,
          password: faker.internet.password()
        }
      };

      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      await authController.register(req, res, next);

      chai.expect(res.status.called).to.eq(false);
      chai.expect(res.json.called).to.eq(false);
      chai.expect(req.user).to.eq(mockUser);
      chai.expect(next).to.have.been.calledWith();
    });
  });
});
