const supertest = require("supertest");
const app = require("../src/api");
const { disconnect, connect } = require("../src/config/config.mongoose");
const { createTestUser } = require("./helpers");

describe("Route: `/api/users", () => {
  const testRoute = `/api/users`;
  let testUser = undefined;

  /************
   setup
   ************/
  beforeAll(async () => {
    testUser = createTestUser();
    await connect();
  });

  /************
   teardown
   ************/
  afterAll(async () => {
    await disconnect();
  });

  test("[GET] request receives 400 response without token", async () => {
    const response = await supertest(app).get(testRoute);
    expect(response.statusCode).toBe(400);
  });

  test("[POST] request receives 400 response if no body included", async () => {
    const response = await supertest(app).get(testRoute);
    expect(response.statusCode).toBe(400);
  });

  test("[POST] request receives 400 response if only sending `first`, `last`, and `email`", async () => {
    const response = await supertest(app).post(testRoute).send({
      first: "Jason",
      last: "Nordheim",
      email: "jason.nordheim@gmail.com",
    });
    expect(response.statusCode).toBe(400);
  });

  test("[POST] Can register user", async () => {
    const response = await supertest(app)
      .post(testRoute)
      .type("application/json")
      .send(testUser);

    expect(response.statusCode).toBe(201);
    expect(response.text).toContain("User registered");
  });

  test("[POST] User can login", async () => {
    const response = await supertest(app)
      .post(`${testRoute}/login`)
      .type("application/json")
      .send(testUser);

    expect(response.statusCode).toBe(201);
    expect(response.body.token).toBeDefined();
    expect(response.body.token).toBeTruthy();
    expect(response.body.token.length).toBeGreaterThanOrEqual(20);
  });
});

describe("Authenticated Users", () => {
  let bearerToken = undefined;

  /************
   setup
   ************/
  beforeAll(async () => {
    const testUser = createTestUser();
    await connect();

    const registerResponse = await supertest(app)
      .post("/api/users/")
      .type("application/json")
      .send(testUser);

    expect(registerResponse.statusCode).toBe(201);

    const loginResponse = await supertest(app)
      .post("/api/users/login")
      .type("application/json")
      .send(testUser);

    expect(loginResponse.statusCode).toBe(201);
    expect(loginResponse.body).toBeTruthy();

    const token = loginResponse.body.token;
    bearerToken = `bearer ${token}`;
  });

  /************
   teardown
   ************/
  afterAll(async () => {
    await disconnect();
  });

  beforeEach(() => {
    expect(bearerToken).toBeDefined();
    expect(bearerToken).toBeTruthy();
  });

  test("[GET] Can use bearer token to retrieve all associated user information", async () => {
    const response = await supertest(app)
      .get("/api/users/")
      .set("Authorization", bearerToken)
      .send();

    expect(response.statusCode).toBe(200);

    const expectedProperties = [
      "first",
      "last",
      "email",
      "uom",
      "day",
      "month",
      "year",
    ];
    expectedProperties.forEach((val) => {
      expect(response.body).toHaveProperty(val);
    });
  });

  const updates = [
    { property: "first", updateTo: "newFirst" },
    { property: "last", updateTo: "newLast" },
    { property: "day", updateTo: 1 },
    { property: "month", updateTo: 9 },
    { property: "year", updateTo: 1990 },
  ];

  updates.forEach((update) => {
    test(`[PATCH] can update ${update.property} to ${update.updateTo}`, async () => {
      const patchRequest = await supertest(app)
        .patch("/api/users/")
        .set("Authorization", bearerToken)
        .send({ [update.property]: update.updateTo });

      expect(patchRequest.statusCode).toBe(200);
      expect(patchRequest.text).toContain("User updated");

      const getRequest = await supertest(app)
        .get("/api/users/")
        .set("Authorization", bearerToken)
        .send();

      expect(getRequest.statusCode).toBe(200);
      expect(getRequest.body[update.property]).toBe(update.updateTo);
    });
  });

  test("[DELETE] will remove user", async () => {
    const deleteRequest = await supertest(app)
      .delete("/api/users/")
      .set("Authorization", bearerToken)
      .send();

    expect(deleteRequest.statusCode).toBe(200);
    expect(deleteRequest.text).toContain("User deleted");

    // verify GET request fails (due to authentication)
    const getRequest = await supertest(app)
      .get("/api/users")
      .set("Authorization", bearerToken)
      .send();

    expect(getRequest.accepted).toBe(false);
  });
});
