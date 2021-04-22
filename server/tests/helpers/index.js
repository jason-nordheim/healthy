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

const createTestFood = () => ({
  foodId: faker.random.alphaNumeric(),
  label: faker.lorem.words(Math.ceil(Math.random() * 10)),
  category: "test",
  categoryLabel: "test-food",
  image: faker.image.food(),
  nutrients: {
    CA: faker.datatype.number({ min: 0, max: 700, precision: 1 }),
    CHOCDF: faker.datatype.number({ min: 0, max: 50, precision: 4 }),
    CHOLE: faker.datatype.number({ min: 0, max: 75, precision: 1 }),
    FAMS: faker.datatype.number({ min: 0, max: 5, precision: 1 }),
    FAPU: faker.datatype.number({ min: 0, max: 3, precision: 2 }),
    FASAT: faker.datatype.number({ min: 0, max: 5, precision: 2 }),
    FAT: faker.datatype.number({ min: 0, max: 20, precision: 2 }),
    FATRN: faker.datatype.number({ min: 0, max: 1, precision: 1 }),
    FE: faker.datatype.number({ min: 0, max: 10, precision: 1 }),
    FIBTG: faker.datatype.number({ min: 0, max: 10, precision: 2 }),
    FOLDFE: faker.datatype.number({ min: 0, max: 100, precision: 1 }),
    K: faker.datatype.number({ min: 0, max: 800, precision: 1 }),
    MG: faker.datatype.number({ min: 0, max: 50, precision: 1 }),
    NA: faker.datatype.number({ min: 0, max: 500, precision: 2 }),
    ENERC_KCAL: faker.datatype.number({ min: 0, max: 500, precision: 1 }),
    NIA: faker.datatype.number({ min: 0, max: 5, precision: 2 }),
    P: faker.datatype.number({ min: 0, max: 500, precision: 1 }),
    PROCNT: faker.datatype.number({ min: 0, max: 70, precision: 2 }),
    RIBF: faker.datatype.number({ min: 0, max: 0.5, precision: 4 }),
    SUGAR: faker.datatype.number({ min: 0, max: 25, precision: 1 }),
    THIA: faker.datatype.number({ min: 0, max: 0.1, precision: 4 }),
    TOCPHA: faker.datatype.number({ min: 0, max: 8, precision: 2 }),
    VITA_RAE: faker.datatype.number({ min: 0, max: 250, precision: 2 }),
    VITB12: faker.datatype.number({ min: 0, max: 1, precision: 4 }),
    VITB6A: faker.datatype.number({ min: 0, max: 0.5, precision: 4 }),
    VITC: faker.datatype.number({ min: 0, max: 50, precision: 2 }),
    VITD: faker.datatype.number({ min: 0, max: 5, precision: 2 }),
    VITK1: faker.datatype.number({ min: 0, max: 60, precision: 2 }),
  },
});

module.exports = {
  userInfoString,
  createTestUser,
  createTestFood,
};
