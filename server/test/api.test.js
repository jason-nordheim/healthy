const request = require("supertest");
const app = require("../src/api");

describe("Route: `/`", () => {
  const testRoute = "/";
  test("GET request is receives 404 response", (done) => {
    request(app).get(testRoute).expect(404, done);
  });
});

describe("Route: `/api`", () => {
  const testRoute = `/api`;
  test("GET request receives 404 response", (done) => {
    request(app).get(testRoute).expect(404, done);
  });
});

describe("Route: `/api/users", () => {
  const testRoute = `/api/users`;
  test("GET request receives 400 response without token", (done) => {
    request(app).get(testRoute).expect(400, done);
  });

  test("POST request receives 400 response if no body included", (done) => {
    request(app).post(testRoute).expect(400, done);
  });

  test("POST request receives 400 response if only sending `first`, `last`, and `email`", (done) => {
    request(app)
      .post(testRoute)
      .send({
        first: "Jason",
        last: "Nordheim",
        email: "jason.nordheim@gmail.com",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(400, done);
  });
});
