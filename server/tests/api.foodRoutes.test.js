const supertest = require("supertest");
const app = require("../src/api");
const faker = require("faker");
const { disconnect, connect } = require("../src/config/config.mongoose");
const { createTestUser, createTestFood } = require("./helpers");
const {
  describe,
  test,
  beforeAll,
  beforeEach,
  expect,
} = require("@jest/globals");

describe("FOOD Routes", () => {
  let bearerToken = undefined;

  /************
   setup
   ************/
  beforeAll(async () => {
    const testUser = createTestUser();
    // connect to database
    await connect();

    // create a test user account
    const registerResponse = await supertest(app)
      .post("/api/users/")
      .type("application/json")
      .send(testUser);

    expect(registerResponse.statusCode).toBe(201);

    // get a token
    const loginResponse = await supertest(app)
      .post("/api/users/login")
      .type("application/json")
      .send(testUser);

    expect(loginResponse.statusCode).toBe(201);
    expect(loginResponse.body).toBeTruthy();
    expect(loginResponse.body.token).toBeTruthy();

    const token = loginResponse.body.token;
    bearerToken = `bearer ${token}`;
    console.log(bearerToken);
  });

  /************
   teardown
   ************/
  afterAll(async () => {
    await disconnect();
  });

  /***
   * make sure we have the authorization token to make the necessary requests
   */
  beforeEach(async () => {
    expect(bearerToken).toBeTruthy();
    expect(bearerToken.length).toBeGreaterThan(10);
  });

  // DEFAULT STATE
  test("[GET] New user returns no food records when queried", async () => {
    // supertest(app) food records for user
    // verify empty array is returned
    const getRequest = await supertest(app)
      .get("/api/foods")
      .set("Authorization", bearerToken)
      .send();

    expect(getRequest.statusCode).toBe(200);
    expect(typeof getRequest.body).toBe(typeof []);
    expect(getRequest.body.length).toBe(0);
  });

  // SEARCH FOR FOOD
  // sending a search query for food, successfully communicates with
  // external api
  test.todo("[GET] Querying food returns valid response for common foods");

  // CREATE FOOD (Log)
  // create POST supertest(app) sending food as JSON
  // verify that the food record was saved via a get supertest(app)
  test("[POST] User can create food record", async () => {
    const testFood = createTestFood();

    const postRequest = await supertest(app)
      .post("/api/foods")
      .set("Authorization", bearerToken)
      .send(testFood);

    expect(postRequest.statusCode).toBe(201);
    expect(postRequest.body).toBeTruthy();
    expect(postRequest.body).toContain("Food saved");

    const getRequest = await supertest(app)
      .get("/api/foods")
      .set("Authorization", bearerToken)
      .send();

    expect(getRequest.statusCode).toBe(200);
    expect(typeof getRequest.body).toBe(typeof []);
    expect(getRequest.body.length).toBe(1);
    expect(getRequest.body[0]).toBeTruthy();
    expect(getRequest.body[0]).toHaveProperty("_id");
    expect(getRequest.body[0]).toHaveProperty("userId");
    expect(getRequest.body[0]).toHaveProperty("label");
    expect(getRequest.body[0]).toHaveProperty("category");
    expect(getRequest.body[0]).toHaveProperty("categoryLabel");
    expect(getRequest.body[0]).toHaveProperty("nutrients");
    expect(getRequest.body[0]).toHaveProperty("createdAt");
    expect(getRequest.body[0]).toHaveProperty("updatedAt");
  });

  // READ FOOD - ALL (Log)
  // create multiple food objects
  // send each food object with a POST supertest(app)
  // send GET supertest(app) to foods/ base path to see if each food added
  // is included in the results
  test("[GET] foods route, after inserting multiple food records returns multiple food records", async () => {
    const testFoods = [
      createTestFood(),
      createTestFood(),
      createTestFood(),
      createTestFood(),
    ];

    // perform POST supertest(app) for each generated food item

    testFoods.forEach(async (food) => {
      const postRequest = await supertest(app)
        .post("/api/foods")
        .set("Authorization", bearerToken)
        .send(food);

      expect(postRequest.statusCode).toBe(201);
      expect(postRequest.body).toBeTruthy();
      expect(postRequest.body).toContain("Food saved");
    });

    // supertest(app) all food logged related to existing user
    const getRequest = await supertest(app)
      .get("/api/foods")
      .set("Authorization", bearerToken)
      .send();

    // test the response is as expected
    expect(getRequest.statusCode).toBe(200);
    expect(typeof getRequest.body).toBe(typeof []);
    expect(getRequest.body.length).toBeGreaterThan(testFoods.length);

    // test foods returned to make sure they are valid
    getRequest.body.forEach((food) => {
      expect(food).toHaveProperty("_id");
      expect(food).toHaveProperty("label");
      expect(food).toHaveProperty("category");
      expect(food).toHaveProperty("categoryLabel");
      expect(food).toHaveProperty("image");
      expect(food).toHaveProperty("nutrients");
    });
  });

  // READ FOOD - Single (Log)
  test("[GET] /:id Food can be retrieved by id", async () => {
    // insert a food record
    // query foods logged
    // check to see if GET to /:id returns the same object
    const testFood = createTestFood();

    const postRequest = await supertest(app)
      .post("/api/foods")
      .set("Authorization", bearerToken)
      .send(testFood);

    expect(postRequest.statusCode).toBe(201);
    expect(postRequest.body).toBeTruthy();
    expect(postRequest.body).toContain("Food saved");

    const getRequest = await supertest(app)
      .get("/api/foods")
      .set("Authorization", bearerToken)
      .send();

    expect(getRequest.statusCode).toBe(200);
    expect(typeof getRequest.body).toBe(typeof []);
    expect(getRequest.body.length).toBeGreaterThan(1);

    const firstFood = getRequest.body[0];

    expect(firstFood).toBeTruthy();
    expect(firstFood).toHaveProperty("_id");
    expect(firstFood).toHaveProperty("userId");
    expect(firstFood).toHaveProperty("label");
    expect(firstFood).toHaveProperty("category");
    expect(firstFood).toHaveProperty("categoryLabel");
    expect(firstFood).toHaveProperty("nutrients");
    expect(firstFood).toHaveProperty("createdAt");
    expect(firstFood).toHaveProperty("updatedAt");

    const singleFoodGetReq = await supertest(app)
      .get("/api/foods/" + firstFood._id)
      .set("Authorization", bearerToken)
      .send();

    expect(postRequest.statusCode).toBe(201);
    expect(postRequest.body).toBeTruthy();
    expect(postRequest.body.food).toBeTruthy();
  });

  // UPDATE FOOD (Log)
  // create food record
  // query all recorded foods
  // save :id of first food recorded returned
  // mutate the first food recorded
  // query by :id to verify that the fields were updated correctly
  test.todo("[PATCH] /:id Food can be updated by id");

  // DELETE FOOD (Log)
  // create food record
  // query all recorded foods
  // delete first food returned for query
  // query all recorded foods
  // verify that second call to food log does not contain
  // deleted food record
  test.todo("[DELETE] /:id Food can be deleted by id");
});
