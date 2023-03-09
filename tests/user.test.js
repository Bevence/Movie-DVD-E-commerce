const request = require("supertest");

const { app } = require("../app");

const userToCreate = {
  email: `test${Date.now()}@mailinator.com`,
  password: `test${Date.now()}`,
  username: `test${Date.now()}`,
};

describe("Test the path to user authentication", () => {
  test("It should register the user", (done) => {
    request(app)
      .post("/api/v1/auth/register")
      .send(userToCreate)
      .then((response) => {
        const { _body: data } = response;
        expect(response.statusCode).toBe(200);
        expect(data.status).toBe(true);
        expect(data.data.email).toBe(userToCreate.email);
        done();
      });
  });

  test("It should login the user", (done) => {
    request(app)
      .post("/api/v1/auth/login")
      .send({ email: userToCreate.email, password: userToCreate.password })
      .then((response) => {
        const { _body: data } = response;
        expect(response.statusCode).toBe(200);
        expect(data.status).toBe(true);
        expect(data.user.email).toBe(userToCreate.email);
        expect(data.accessToken).not.toBeNull();
        done();
      });
  });
});
