const supertest = require("supertest");
const app = require("../src/api");

describe("Route: `/`", () => {
  let request = undefined;
  let testRoute = undefined;
  beforeAll(() => {
    request = supertest(app);
    testRoute = "/";
  });

  test("GET request is receives 404 response", async () => {
    const response = await request.get(testRoute);
    expect(response.statusCode).toBe(404);
  });
});

describe("Route: `/api`", () => {
  const request = supertest(app);
  const testRoute = `/api`;
  test("GET request receives 404 response", async () => {
    const response = await request.get(testRoute);
    expect(response.statusCode).toBe(404);
  });
});
