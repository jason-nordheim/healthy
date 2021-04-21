const faker = require("faker");

const userInfoString = (user) =>
  `[first:${user.first}]` +
  `[last:${user.last}]` +
  `[email${user.email}]` +
  `[password:${user.password}]` +
  `[height:${user.height}]`;

const createTestUser = () => ({
  first: faker.name.firstName(),
  last: faker.name.lastName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  day: Math.ceil(Math.random() * 30),
  month: Math.floor(Math.random() * 12),
  year: new Date().getFullYear() - Math.floor(Math.random() * 50),
});

module.exports = {
  userInfoString,
  createTestUser,
};
