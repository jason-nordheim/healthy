const supertest = require("supertest");
const app = require("../src/api");
const { disconnect, connect } = require("../src/config/config.mongoose");
const { createTestUser } = require("./helpers");

describe("Can record weight", () => {
  let request = undefined;
  let bearerToken = undefined;

  /************
   setup
   ************/
  beforeAll(async () => {
    request = supertest(app);
    const testUser = createTestUser();
    // connect to database
    await connect();

    // create a test user account
    const registerResponse = await request
      .post("/api/users/")
      .type("application/json")
      .send(testUser);

    expect(registerResponse.statusCode).toBe(201);

    // get a token
    const loginResponse = await request
      .post("/api/users/login")
      .type("application/json")
      .send(testUser);

    const token = loginResponse.body.token;
    bearerToken = `bearer ${token}`;
  });

  /************
   teardown
   ************/
  afterAll(async () => {
    // delete user

    await disconnect();
  });

  test("User has no weights by default", async () => {
    const getRequest = await request
      .get("/api/weights")
      .set("Authorization", bearerToken)
      .send();

    expect(getRequest.statusCode).toBe(200);
    expect(typeof getRequest.body).toBe(typeof []);
    expect(getRequest.body.length).toBe(0);
  });

  test('[POST] request to "/api/weights" creates new weight records', async () => {
    const postRequest = await request
      .post("/api/weights")
      .set("Authorization", bearerToken)
      .send({ kg: 74.8, source: "testEnv" });

    expect(postRequest.statusCode).toBe(201);
    expect(postRequest.body).toBeTruthy();
    expect(postRequest.body).toContain("Weight saved");

    const getRequest = await request
      .get("/api/weights")
      .set("Authorization", bearerToken)
      .send();

    expect(getRequest.statusCode).toBe(200);
    expect(typeof getRequest.body).toBe(typeof []);
    expect(getRequest.body.length).toBe(1);
    expect(getRequest.body[0]).toBeTruthy();
    expect(getRequest.body[0]).toHaveProperty("kg", 74.8);
    expect(getRequest.body[0]).toHaveProperty("_id");
    expect(getRequest.body[0]).toHaveProperty("userId");
    expect(getRequest.body[0]).toHaveProperty("createdAt");
    expect(getRequest.body[0]).toHaveProperty("updatedAt");
  });

  test('[GET] request to "/api/weights/:id" returns correct weight record', async () => {
    const getAllRequest = await request
      .get("/api/weights")
      .set("Authorization", bearerToken)
      .send();

    expect(getAllRequest.statusCode).toBe(200);
    expect(typeof getAllRequest.body).toBe(typeof []);
    expect(getAllRequest.body.length).toBeGreaterThan(0);
    expect(getAllRequest.body[0]).toBeTruthy();
    expect(getAllRequest.body[0]).toHaveProperty("kg");
    expect(getAllRequest.body[0]).toHaveProperty("_id");
    expect(getAllRequest.body[0]).toHaveProperty("userId");
    expect(getAllRequest.body[0]).toHaveProperty("createdAt");
    expect(getAllRequest.body[0]).toHaveProperty("updatedAt");

    const id = getAllRequest.body[0]._id;
    const kg = getAllRequest.body[0].kg;
    const userId = getAllRequest.body[0].userId;

    const getSingleRequest = await request
      .get("/api/weights/" + id)
      .set("Authorization", bearerToken)
      .send();

    expect(getSingleRequest.statusCode).toBe(200);
    expect(getSingleRequest.body).toBeTruthy();
    expect(typeof getSingleRequest.body).toBe(typeof {});
    expect(getSingleRequest.body).toHaveProperty("kg");
    expect(getSingleRequest.body).toHaveProperty("_id", id);
    expect(getSingleRequest.body).toHaveProperty("kg", kg);
    expect(getSingleRequest.body).toHaveProperty("userId", userId);
  });

  test('[PATCH] request to "/api/weights/:id" returns correct mutates weight record', async () => {
    const getAllRequest = await request
      .get("/api/weights")
      .set("Authorization", bearerToken)
      .send();

    expect(getAllRequest.statusCode).toBe(200);
    expect(typeof getAllRequest.body).toBe(typeof []);
    expect(getAllRequest.body.length).toBeGreaterThan(0);
    expect(getAllRequest.body[0]).toBeTruthy();
    expect(getAllRequest.body[0]).toHaveProperty("kg");
    expect(getAllRequest.body[0]).toHaveProperty("_id");
    expect(getAllRequest.body[0]).toHaveProperty("userId");
    expect(getAllRequest.body[0]).toHaveProperty("createdAt");
    expect(getAllRequest.body[0]).toHaveProperty("updatedAt");

    const id = getAllRequest.body[0]._id;
    const userId = getAllRequest.body[0].userId;
    const newKg = 75.65;
    const patchRequest = await request
      .patch("/api/weights/" + id)
      .set("Authorization", bearerToken)
      .send({ kg: newKg });

    expect(patchRequest.statusCode).toBe(200);
    expect(patchRequest.body).toBeTruthy();
    expect(patchRequest.body).toContain("Weight updated");

    const getSingleRequest = await request
      .get("/api/weights/" + id)
      .set("Authorization", bearerToken)
      .send();

    expect(getSingleRequest.statusCode).toBe(200);
    expect(getSingleRequest.body).toBeTruthy();
    expect(typeof getSingleRequest.body).toBe(typeof {});
    expect(getSingleRequest.body).toHaveProperty("kg");
    expect(getSingleRequest.body).toHaveProperty("_id", id);
    expect(getSingleRequest.body).toHaveProperty("kg", newKg);
    expect(getSingleRequest.body).toHaveProperty("userId", userId);
  });

  test('[DELETE] request to "/api/weights/:id" removes weight record', async () => {
    const getAllRequest1 = await request
      .get("/api/weights")
      .set("Authorization", bearerToken)
      .send();

    expect(getAllRequest1.statusCode).toBe(200);
    expect(typeof getAllRequest1.body).toBe(typeof []);
    expect(getAllRequest1.body.length).toBeGreaterThan(0);
    expect(getAllRequest1.body[0]).toBeTruthy();
    expect(getAllRequest1.body[0]).toHaveProperty("kg");
    expect(getAllRequest1.body[0]).toHaveProperty("_id");
    expect(getAllRequest1.body[0]).toHaveProperty("userId");
    expect(getAllRequest1.body[0]).toHaveProperty("createdAt");
    expect(getAllRequest1.body[0]).toHaveProperty("updatedAt");

    const id = getAllRequest1.body[0]._id;

    const deleteRequest = await request
      .delete("/api/weights/" + id)
      .set("Authorization", bearerToken)
      .send();

    expect(deleteRequest.statusCode).toBe(200);
    expect(deleteRequest.body).toBeTruthy();
    expect(deleteRequest.body).toContain("Weight deleted");

    const getAllRequest2 = await request
      .get("/api/weights")
      .set("Authorization", bearerToken)
      .send();

    const expectedRecordCount = getAllRequest1.body.length - 1;

    expect(getAllRequest2.statusCode).toBe(200);
    expect(typeof getAllRequest2.body).toBe(typeof []);
    expect(getAllRequest2.body.length).toBe(expectedRecordCount);
  });
});
