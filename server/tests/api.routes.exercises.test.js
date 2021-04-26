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
    bearerToken = `bearer ${token}`;

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

  test.todo("[GET] request return 403 without authorization");
  // test("[GET] without token returns 401", async () => {
  //   const getRequest = await request.get("/api/exercises").send();
  //   expect(getRequest.statusCode).toBe(400);
  // });

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
  test.todo("[GET] can retrieve single food");
  // UPDATE (by ID)
  test.todo("[PATCH] can update values for a specific food");
  // DELETE
  test.todo("[DELETE] can delete food from log ");
});
