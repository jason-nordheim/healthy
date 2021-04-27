const supertest = require("supertest");
const app = require("../src/api");
const { disconnect, connect } = require("../src/config/config.mongoose");
const { createTestExercise, createTestUser } = require("./helpers");

describe("Exercise Routes", () => {
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
    expect(bearerToken).toBeTruthy();
    expect(bearerToken.length).toBeGreaterThan(10);

    // make sure new user has no food recorded to start
    const getAllExercisesReq = await supertest(app)
      .get("/api/exercises")
      .set("Authorization", bearerToken)
      .send();

    expect(getAllExercisesReq.statusCode).toBe(200);
    expect(typeof getAllExercisesReq.body).toBe(typeof []);
    expect(getAllExercisesReq.body.length).toBe(0);
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

  //test.todo("[GET] request return 403 without authorization");
  test("[GET] without token returns 403", async () => {
    const getRequest = await supertest(app).get("/api/exercises").send();
    expect(getRequest.statusCode).toBe(403);
  });

  // CREATE
  test("[POST]Can create exercise", async () => {
    const testExercise = createTestExercise();

    const postRequest = await supertest(app)
      .post("/api/exercises")
      .set("Authorization", bearerToken)
      .send(testExercise);

    expect(postRequest.statusCode).toBe(201);
  });

  // READ (ALL)
  test("[POST]/[GET] Can retrieve all foods with single GET request", async () => {
    const testExercises = [
      createTestExercise(),
      createTestExercise(),
      createTestExercise(),
      createTestExercise(),
    ];

    testExercises.forEach(async (exercise) => {
      const postRequest = await supertest(app)
        .post("/api/exercises")
        .set("Authorization", bearerToken)
        .send(exercise);

      expect(postRequest.statusCode).toBe(201);
    });

    const getExercises = await supertest(app)
      .get("/api/exercises")
      .set("Authorization", bearerToken)
      .send();

    expect(getExercises.statusCode).toBe(200);
    expect(typeof getExercises.body).toBe(typeof []);
    expect(getExercises.body.length).toBeGreaterThan(testExercises.length);

    getExercises.body.forEach((exercise) => {
      expect(exercise).toHaveProperty("_id");
      expect(exercise).toHaveProperty("name");
      expect(exercise.name.length).toBeGreaterThan(3);
      expect(exercise).toHaveProperty("category");
      expect(exercise).toHaveProperty("duration");
      expect(exercise).toHaveProperty("minElevation");
      expect(exercise).toHaveProperty("maxElevation");
      expect(exercise).toHaveProperty("minHeart");
      expect(exercise).toHaveProperty("maxHeart");
      expect(exercise).toHaveProperty("avgHeart");
      expect(exercise).toHaveProperty("location");
      expect(exercise).toHaveProperty("calories");
      expect(exercise).toHaveProperty("notes");
    });
  });
  // READ (by ID)
  //test.todo("[GET] can retrieve single food");
  test("[GET] can retrieve single exercises", async () => {
    const testExercise = createTestExercise();

    const postRequest = await supertest(app)
      .post("/api/exercises")
      .set("Authorization", bearerToken)
      .send(testExercise);

    expect(postRequest.statusCode).toBe(201); // created

    // get (all) request to get an id to use
    const getExercises = await supertest(app)
      .get("/api/exercises")
      .set("Authorization", bearerToken)
      .send();

    expect(getExercises.statusCode).toBe(200);
    expect(typeof getExercises.body).toBe(typeof []);
    expect(getExercises.body.length).toBeGreaterThan(1);

    const firstExerciseRetrieved = getExercises.body[0];

    expect(firstExerciseRetrieved).toBeDefined();
    expect(firstExerciseRetrieved).toHaveProperty("_id");
    expect(firstExerciseRetrieved).toHaveProperty("name");
    expect(firstExerciseRetrieved.name.length).toBeGreaterThan(3);
    expect(firstExerciseRetrieved).toHaveProperty("category");
    expect(firstExerciseRetrieved).toHaveProperty("duration");
    expect(firstExerciseRetrieved).toHaveProperty("minElevation");
    expect(firstExerciseRetrieved).toHaveProperty("maxElevation");
    expect(firstExerciseRetrieved).toHaveProperty("minHeart");
    expect(firstExerciseRetrieved).toHaveProperty("maxHeart");
    expect(firstExerciseRetrieved).toHaveProperty("avgHeart");
    expect(firstExerciseRetrieved).toHaveProperty("location");
    expect(firstExerciseRetrieved).toHaveProperty("calories");
    expect(firstExerciseRetrieved).toHaveProperty("notes");
    expect(firstExerciseRetrieved).toHaveProperty("updatedAt");
    expect(firstExerciseRetrieved).toHaveProperty("createdAt");

    const id = firstExerciseRetrieved._id;
    expect(id).toBeDefined();
    expect(id.length).toBeGreaterThan(5);

    const getById = await supertest(app)
      .get("/api/exercises/" + id)
      .set("Authorization", bearerToken)
      .send();

    expect(getById.statusCode).toBe(200);
    const {
      _id,
      name,
      category,
      duration,
      minElevation,
      maxElevation,
      minHeart,
      maxHeart,
      avgHeart,
      location,
      calories,
      notes,
      createdAt,
      updatedAt,
    } = firstExerciseRetrieved;
    expect(getById.body).toHaveProperty("_id", _id);
    expect(getById.body).toHaveProperty("name", name);
    expect(getById.body.name.length).toBeGreaterThan(3);
    expect(getById.body).toHaveProperty("category", category);
    expect(getById.body).toHaveProperty("duration", duration);
    expect(getById.body).toHaveProperty("minElevation", minElevation);
    expect(getById.body).toHaveProperty("maxElevation", maxElevation);
    expect(getById.body).toHaveProperty("minHeart", minHeart);
    expect(getById.body).toHaveProperty("maxHeart", maxHeart);
    expect(getById.body).toHaveProperty("avgHeart", avgHeart);
    expect(getById.body).toHaveProperty("location", location);
    expect(getById.body).toHaveProperty("calories", calories);
    expect(getById.body).toHaveProperty("notes", notes);
    expect(getById.body).toHaveProperty("updatedAt", updatedAt); // no updates so should be the same
    expect(getById.body).toHaveProperty("createdAt", createdAt);
  });

  // UPDATE (by ID)
  test("[PATCH] can update values for a specific food", async () => {
    const testExercise = createTestExercise();

    const postRequest = await supertest(app)
      .post("/api/exercises")
      .set("Authorization", bearerToken)
      .send(testExercise);

    expect(postRequest.statusCode).toBe(201); // created

    // get (all) request to get an id to use
    const getExercises = await supertest(app)
      .get("/api/exercises")
      .set("Authorization", bearerToken)
      .send();

    expect(getExercises.statusCode).toBe(200);
    expect(typeof getExercises.body).toBe(typeof []);
    expect(getExercises.body.length).toBeGreaterThan(1);

    const firstExerciseRetrieved = getExercises.body[0];

    expect(firstExerciseRetrieved).toBeDefined();
    expect(firstExerciseRetrieved).toHaveProperty("_id");
    expect(firstExerciseRetrieved).toHaveProperty("name");
    expect(firstExerciseRetrieved.name.length).toBeGreaterThan(3);
    expect(firstExerciseRetrieved).toHaveProperty("category");
    expect(firstExerciseRetrieved).toHaveProperty("duration");
    expect(firstExerciseRetrieved).toHaveProperty("minElevation");
    expect(firstExerciseRetrieved).toHaveProperty("maxElevation");
    expect(firstExerciseRetrieved).toHaveProperty("minHeart");
    expect(firstExerciseRetrieved).toHaveProperty("maxHeart");
    expect(firstExerciseRetrieved).toHaveProperty("avgHeart");
    expect(firstExerciseRetrieved).toHaveProperty("location");
    expect(firstExerciseRetrieved).toHaveProperty("calories");
    expect(firstExerciseRetrieved).toHaveProperty("notes");
    expect(firstExerciseRetrieved).toHaveProperty("updatedAt");
    expect(firstExerciseRetrieved).toHaveProperty("createdAt");

    const id = firstExerciseRetrieved._id;
    expect(id).toBeDefined();
    expect(id.length).toBeGreaterThan(5);

    const updateTo = {
      notes: "that was really hard",
      duration: (firstExerciseRetrieved.duration += 1),
      minElevation: (firstExerciseRetrieved.minElevation += 2),
      location: "Denver, CO",
      calories: (firstExerciseRetrieved.calories += 2),
    };

    const patchExercise = await supertest(app)
      .patch("/api/exercises/" + id)
      .set("Authorization", bearerToken)
      .send(updateTo);

    expect(patchExercise.statusCode).toBe(200);

    const expectedValues = { ...firstExerciseRetrieved, ...updateTo };

    const getById = await supertest(app)
      .get("/api/exercises/" + id)
      .set("Authorization", bearerToken)
      .send();

    const {
      _id,
      name,
      category,
      duration,
      minElevation,
      maxElevation,
      minHeart,
      maxHeart,
      avgHeart,
      location,
      calories,
      notes,
      createdAt,
      updatedAt,
    } = expectedValues;
    expect(getById.body).toHaveProperty("_id", _id);
    expect(getById.body).toHaveProperty("name", name);
    expect(getById.body.name.length).toBeGreaterThan(3);
    expect(getById.body).toHaveProperty("category", category);
    expect(getById.body).toHaveProperty("duration", duration);
    expect(getById.body).toHaveProperty("minElevation", minElevation);
    expect(getById.body).toHaveProperty("maxElevation", maxElevation);
    expect(getById.body).toHaveProperty("minHeart", minHeart);
    expect(getById.body).toHaveProperty("maxHeart", maxHeart);
    expect(getById.body).toHaveProperty("avgHeart", avgHeart);
    expect(getById.body).toHaveProperty("location", location);
    expect(getById.body).toHaveProperty("calories", calories);
    expect(getById.body).toHaveProperty("notes", notes);
    expect(getById.body).toHaveProperty("updatedAt");
    expect(Date.parse(getById.body.updatedAt)).toBeGreaterThan(
      Date.parse(updatedAt)
    );
    expect(getById.body).toHaveProperty("createdAt", createdAt);
  });
  // DELETE
  test("[DELETE] can delete food from log ", async () => {
    // get (all) request to get an id to use
    const getExercises = await supertest(app)
      .get("/api/exercises")
      .set("Authorization", bearerToken)
      .send();

    expect(getExercises.statusCode).toBe(200);
    expect(typeof getExercises.body).toBe(typeof []);
    expect(getExercises.body.length).toBeGreaterThan(1);
    expect(getExercises.body[0]._id).toBeTruthy();

    const deleteExercise = await supertest(app)
      .delete("/api/exercises/" + getExercises.body[0]._id)
      .set("Authorization", bearerToken)
      .send();

    expect(deleteExercise.statusCode).toBe(200);

    const secondGetExercises = await supertest(app)
      .get("/api/exercises")
      .set("Authorization", bearerToken)
      .send();

    expect(secondGetExercises.statusCode).toBe(200);
    expect(typeof secondGetExercises.body).toBe(typeof []);
    expect(secondGetExercises.body.length).toBeLessThan(
      getExercises.body.length
    );
    expect(secondGetExercises.body[0]._id).toBeTruthy();
  });
});
