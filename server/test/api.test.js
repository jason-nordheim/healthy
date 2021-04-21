const supertest = require("supertest");
const faker = require("faker");
const app = require("../src/api");
const { disconnect, connect } = require("../src/config/config.mongoose");

describe("Route: `/`", () => {
  const request = supertest(app);
  const testRoute = "/";
  test("GET request is receives 404 response", async (done) => {
    const response = await request.get(testRoute);
    expect(response.statusCode).toBe(404);
    await done();
  });
});

describe("Route: `/api`", () => {
  const request = supertest(app);
  const testRoute = `/api`;
  test("GET request receives 404 response", async (done) => {
    const response = await request.get(testRoute);
    expect(response.statusCode).toBe(404);
    await done();
  });
});

describe("Route: `/api/users", () => {
  const request = supertest(app);
  const testRoute = `/api/users`;
  let testUser = undefined;
  beforeAll(async () => {
    testUser = {
      first: faker.name.firstName(),
      last: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      day: Math.ceil(Math.random() * 30),
      month: Math.floor(Math.random() * 12),
      year: new Date().getFullYear() - Math.floor(Math.random() * 50),
    };
    await connect();
  });
  afterAll(async () => {
    await disconnect();
  });

  test("GET request receives 400 response without token", async () => {
    const response = await request.get(testRoute);
    expect(response.statusCode).toBe(400);
  });

  test("POST request receives 400 response if no body included", async () => {
    const response = await request.get(testRoute);
    expect(response.statusCode).toBe(400);
  });

  test("POST request receives 400 response if only sending `first`, `last`, and `email`", async () => {
    const response = await request.post(testRoute).send({
      first: "Jason",
      last: "Nordheim",
      email: "jason.nordheim@gmail.com",
    });
    expect(response.statusCode).toBe(400);
  });
  test("Can register user", async () => {
    const response = await request
      .post(testRoute)
      .type("application/json")
      .send(testUser);

    expect(response.status).toBe(201);
    expect(response.text).toBe("User registered");
  });

  test("User can login", async () => {
    const { email, password } = testUser;
    const response = await request
      .post(`${testRoute}/login`)
      .type("application/json")
      .send(testUser);

    expect(response.status).toBe(201);
    expect(response.body.token).toBeDefined();
  });
});
