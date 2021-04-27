const supertest = require("supertest");
const prettyFormat = require("pretty-format");
const app = require("../src/api");
const { disconnect, connect } = require("../src/config/config.mongoose");
const { createTestUser, createTestFood } = require("./helpers");

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

    const token = loginResponse.body.token;
    expect(token).toBeTruthy();
    expect(token.length).toBeGreaterThan(10);

    bearerToken = `bearer ${token}`;
    expect(bearerToken).toBeDefined();
    expect(bearerToken.length).toBeGreaterThan(10);
  });

  /************
   teardown
   ************/
  afterAll(async () => {
    await disconnect();
  });

  beforeEach(() => {
    expect(bearerToken).toBeDefined();
  });

  const isValidFoodObject = (food) => {
    expect(food.label).toBeDefined();
    expect(typeof food.label).toBe(typeof "");
    expect(typeof food.nutrients).toBe(typeof {});
    expect(food.category).toBeDefined();
    expect(food.categoryLabel).toBeDefined();
    expect(typeof food.categoryLabel).toBe(typeof "");
    expect(typeof food.servingsPerContainer).toBe(typeof 825.22);
    expect(food.image).toBeDefined();
    expect(typeof food.image).toBe(typeof "");
  };

  // DEFAULT STATE
  test("[GET] New user returns no food records when queried", async () => {
    // request food records for user
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
  test.skip("[GET] Querying food returns valid response for common foods", async () => {
    // sending a search query for food, successfully communicates with
    // external api

    const testSearchFoods = ["Pizza", "Mac & cheese", "asparagus"];
    for (let i = 0; i < testSearchFoods.length; i++) {
      const searchResponse = await supertest(app)
        .get("/api/foods/search")
        .query({ query: testSearchFoods[i] })
        .send();

      expect(searchResponse.statusCode).toBe(200);
      expect(searchResponse.body).toBeTruthy();
      expect(searchResponse.body.hints).toBeTruthy();
      expect(searchResponse.body.hints.length).toBeGreaterThan(0);

      for (let j = 0; j < searchResponse.body.hints.length; j++) {
        expect(searchResponse.body.hints[j].food).toBeDefined();
        const food = searchResponse.body.hints[j].food;

        // label
        expect(food["label"]).toBeDefined();
        expect(food["label"].length).toBeGreaterThan(1);

        // nutrients
        expect(food["nutrients"]).toBeDefined();
        expect(food["nutrients"]).toHaveProperty("ENERC_KCAL"); // calories

        // category
        expect(food["category"]).toBeDefined();
        expect(food["category"].length).toBeGreaterThan(1);

        // categoryLabel
        expect(food["categoryLabel"]).toBeDefined();
        expect(food["categoryLabel"].length).toBeGreaterThan(1);
      }
    }
  });

  // CREATE FOOD (Log)
  test("[POST] User can create food record", async () => {
    // create POST request sending food as JSON
    // verify that the food record was saved via a get request
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
      const postRequest = await supertest(app)
        .post("/api/foods")
        .set("Authorization", bearerToken)
        .send(food);

      expect(postRequest.statusCode).toBe(201);
      expect(postRequest.body).toBeTruthy();
      expect(postRequest.body).toContain("Food saved");
    });

    // request all food logged related to existing user
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
  // insert a food record
  // query foods logged
  // check to see if GET to /:id returns the same object
  test("[GET] /:id Food can be retrieved by id", async () => {
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

    // test the response is as expected
    expect(getRequest.statusCode).toBe(200);
    expect(typeof getRequest.body).toBe(typeof []);
    expect(getRequest.body.length).toBeGreaterThan(1);
    expect(getRequest.body[0]).toBeTruthy();
    expect(getRequest.body[0]).toHaveProperty("_id");
    expect(getRequest.body[0]).toHaveProperty("userId");
    expect(getRequest.body[0]).toHaveProperty("label");
    expect(getRequest.body[0]).toHaveProperty("category");
    expect(getRequest.body[0]).toHaveProperty("categoryLabel");
    expect(getRequest.body[0]).toHaveProperty("nutrients");
    expect(getRequest.body[0]).toHaveProperty("createdAt");
    expect(getRequest.body[0]).toHaveProperty("updatedAt");

    const id = getRequest.body[0]._id;
    expect(id).toBeDefined();

    const getRequestWithId = await supertest(app)
      .get("/api/foods/" + id)
      .set("Authorization", bearerToken)
      .send();

    expect(getRequestWithId.statusCode).toBe(200);
    expect(getRequestWithId.body).toBeTruthy();
    expect(getRequestWithId.body).toHaveProperty("_id");
    expect(getRequestWithId.body).toHaveProperty("userId");
    expect(getRequestWithId.body).toHaveProperty("label");
    expect(getRequestWithId.body).toHaveProperty("category");
    expect(getRequestWithId.body).toHaveProperty("categoryLabel");
    expect(getRequestWithId.body).toHaveProperty("nutrients");
    expect(getRequestWithId.body).toHaveProperty("createdAt");
    expect(getRequestWithId.body).toHaveProperty("updatedAt");
  });

  // UPDATE FOOD (Log)
  // create food record
  // query all recorded foods
  // save :id of first food recorded returned
  // mutate the first food recorded
  // query by :id to verify that the fields were updated correctly
  test("[PATCH] /:id Food can be updated by id", async () => {
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

    // test the response is as expected
    expect(getRequest.statusCode).toBe(200);
    expect(typeof getRequest.body).toBe(typeof []);
    expect(getRequest.body.length).toBeGreaterThan(1);
    expect(getRequest.body[0]).toBeTruthy();

    const food = getRequest.body[0];
    expect(food).toHaveProperty("_id");
    expect(food).toHaveProperty("userId");
    expect(food).toHaveProperty("label");
    expect(food).toHaveProperty("categoryLabel");
    expect(food).toHaveProperty("category");
    expect(food).toHaveProperty("nutrients");
    expect(food).toHaveProperty("createdAt");
    expect(food).toHaveProperty("updatedAt");
    const id = food._id;
    expect(id).toBeDefined();

    const patchRequest = await supertest(app)
      .patch("/api/foods/" + id)
      .set("Authorization", bearerToken)
      .send({
        label: "Pizza",
        nutrients: { ...food.nutrients, ENERC_KCAL: 2000 },
      });

    expect(patchRequest.statusCode).toBe(200);
    expect(patchRequest.body).toContain("Food updated");

    const getRequestWithId = await supertest(app)
      .get("/api/foods/" + id)
      .set("Authorization", bearerToken)
      .send();

    expect(getRequestWithId.body).toHaveProperty("_id", food._id);
    expect(getRequestWithId.body).toHaveProperty("userId", food.userId);
    expect(getRequestWithId.body).toHaveProperty("label", "Pizza");
    expect(getRequestWithId.body).toHaveProperty(
      "categoryLabel",
      food.categoryLabel
    );
    expect(getRequestWithId.body).toHaveProperty("category", food.category);
    expect(getRequestWithId.body).toHaveProperty("nutrients");
    expect(getRequestWithId.body.nutrients).toHaveProperty("ENERC_KCAL", 2000);
    expect(getRequestWithId.body).toHaveProperty("createdAt", food.createdAt);
  });

  // DELETE FOOD (Log)
  // create food record
  // query all recorded foods
  // delete first food returned for query
  // query all recorded foods
  // verify that second call to food log does not contain
  // deleted food record
  test("[DELETE] /:id Food can be deleted by id", async () => {
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

    // test the response is as expected
    expect(getRequest.statusCode).toBe(200);
    expect(typeof getRequest.body).toBe(typeof []);
    expect(getRequest.body.length).toBeGreaterThan(1);
    expect(getRequest.body[0]).toBeTruthy();

    const food = getRequest.body[0];
    expect(food).toHaveProperty("_id");
    expect(food).toHaveProperty("userId");
    expect(food).toHaveProperty("label");
    expect(food).toHaveProperty("categoryLabel");
    expect(food).toHaveProperty("category");
    expect(food).toHaveProperty("nutrients");
    expect(food).toHaveProperty("createdAt");
    expect(food).toHaveProperty("updatedAt");
    const id = food._id;
    expect(id).toBeDefined();

    const deleteRequest = await supertest(app)
      .delete("/api/foods/" + id)
      .set("Authorization", bearerToken)
      .send();

    expect(deleteRequest.statusCode).toBe(200);
    expect(deleteRequest.body).toContain("Food deleted");
  });
});
