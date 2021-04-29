const supertest = require("supertest");
const app = require("../src/api");
const { disconnect, connect } = require("../src/config/config.mongoose");
const { createTestUser } = require("./helpers");

describe("Route: `/api/users [UNAUTHORIZED]", () => {
  /************
   setup
   ************/
  beforeAll(async () => {
    await connect();
  });

  /************
   teardown
   ************/
  afterAll(async () => {
    await disconnect();
  });

  test("[GET] request receives 403 response if bearer token received", async () => {
    const response = await supertest(app).get(`/api/users`);
    expect(response.statusCode).toBe(403);
  });
});

describe("Route: `/api/users [AUTHORIZED]", () => {
  let bearerToken = undefined;

  /************
   setup
   ************/
  beforeAll(async () => {
    await connect();
    const testUser = createTestUser();

    const registerResponse = await supertest(app)
      .post("/api/users/")
      .type("application/json")
      .send(testUser);

    expect(registerResponse.statusCode).toBe(201);
    expect(registerResponse.body).toBeTruthy();

    const loginResponse = await supertest(app)
      .post("/api/users/login")
      .type("application/json")
      .send(testUser);

    expect(loginResponse.statusCode).toBe(201);
    expect(loginResponse.body).toBeTruthy();

    const token = loginResponse.body.token;
    expect(token).toBeDefined();

    bearerToken = `bearer ${token}`;
    expect(bearerToken).toBeDefined();
  });

  /************
   teardown
   ************/
  afterAll(async () => {
    await disconnect();
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
      "username",
      "uom",
      "birthday",
    ];
    expectedProperties.forEach((val) => {
      expect(response.body).toHaveProperty(val);
    });
  });

  const updates = [
    { property: "first", updateTo: "newFirst" },
    { property: "last", updateTo: "newLast" },
    { property: "birthday", updateTo: "1990-09-11" },
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
