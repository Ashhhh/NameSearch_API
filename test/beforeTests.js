const faker = require('faker');

process.env.JWT_KEY = faker.random.alphaNumeric(12);
process.env.COOKIE_KEY = faker.random.alphaNumeric(12);
