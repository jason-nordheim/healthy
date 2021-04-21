const supertest = require("supertest");
const app = require("../src/api");
const { disconnect, connect } = require("../src/config/config.mongoose");
const { createTestUser } = require("./helpers");

describe("FOOD Routes", () => {
  let request = supertest(app);
  let bearerToken = undefined;

  /************
   setup
   ************/
  beforeAll(async () => {
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
  });

  // READ FOOD - ALL (Log)
  test("[GET] foods route, after inserting multiple food records returns multiple food records", async () => {
    // create multiple food objects
    // send each food object with a POST request
    // send GET request to foods/ base path to see if each food added
    // is included in the results
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
