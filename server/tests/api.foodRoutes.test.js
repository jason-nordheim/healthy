const supertest = require("supertest");
const app = require("../src/api");
const faker = require("faker");
const { disconnect, connect } = require("../src/config/config.mongoose");
const { createTestUser, createTestFood } = require("./helpers");

describe("FOOD Routes", () => {
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
    await disconnect();
  });

  // DEFAULT STATE
  test("[GET] New user returns no food records when queried", async () => {
    // request food records for user
    // verify empty array is returned
    const getRequest = await request
      .get("/api/foods")
      .set("Authorization", bearerToken)
      .send();

    expect(getRequest.statusCode).toBe(200);
    expect(typeof getRequest.body).toBe(typeof []);
    expect(getRequest.body.length).toBe(0);
  });

  // SEARCH FOR FOOD
  test("[GET] Querying food returns valid response for common foods", async () => {
    // sending a search query for food, successfully communicates with
    // external api
  });

  // CREATE FOOD (Log)
  test("[POST] User can create food record", async () => {
    // create POST request sending food as JSON
    // verify that the food record was saved via a get request
    const testFood = createTestFood();

    const postRequest = await request
      .post("/api/foods")
      .set("Authorization", bearerToken)
      .send(testFood);

    expect(postRequest.statusCode).toBe(201);
    expect(postRequest.body).toBeTruthy();
    expect(postRequest.body).toContain("Food saved");

    const getRequest = await request
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
  test("[GET] foods route, after inserting multiple food records returns multiple food records", async () => {
    // create multiple food objects
    // send each food object with a POST request
    // send GET request to foods/ base path to see if each food added
    // is included in the results
    const testFoods = [
      createTestFood(),
      createTestFood(),
      createTestFood(),
      createTestFood(),
    ];

    // perform POST request for each generated food item
    testFoods.forEach(async (food) => {
      const postRequest = await request
        .post("/api/foods")
        .set("Authorization", bearerToken)
        .send(food);

      expect(postRequest.statusCode).toBe(201);
      expect(postRequest.body).toBeTruthy();
      expect(postRequest.body).toContain("Food saved");
    });

    // request all food logged related to existing user
    const getRequest = await request
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
  });

  // UPDATE FOOD (Log)
  test("[PATCH] /:id Food can be updated by id", async () => {
    // create food record
    // query all recorded foods
    // save :id of first food recorded returned
    // mutate the first food recorded
    // query by :id to verify that the fields were updated correctly
  });

  // DELETE FOOD (Log)
  test("[DELETE] /:id Food can be deleted by id", async () => {
    // create food record
    // query all recorded foods
    // delete first food returned for query
    // query all recorded foods
    // verify that second call to food log does not contain
    // deleted food record
  });
});
