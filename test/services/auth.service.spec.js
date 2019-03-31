const { expect } = require('chai');
const faker = require('faker');

const authService = require('../../src/services/auth.service');

describe('services/auth.service', () => {
  describe('hashPassword', () => {
    it('Should hash the password', async () => {
      const password = faker.internet.password();

      const hashedPassword = await authService.hashPassword(password);

      expect(password).not.to.eq(hashedPassword);
    });
  });

  describe('comparePassword', () => {
    it('Should pass for passwords that do match', async () => {
      const password = faker.internet.password();

      const hashedPassword = await authService.hashPassword(password);

      expect(await authService.comparePassword(password, hashedPassword)).to.eq(true);
    });

    it('Should fail for passwords that do not match', async () => {
      const password = faker.internet.password();
      const incorrectPasswordAttempt = `${password}${faker.lorem.word()}`;

      const hashedPassword = await authService.hashPassword(password);

      expect(await authService.comparePassword(incorrectPasswordAttempt, hashedPassword))
        .to.eq(false);
    });
  });
});
