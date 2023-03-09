const request = require("supertest");

const { app } = require("../app");

// token of the admin user
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTE4NzM2LWVmMGEtNGM2Ny1iNjFlLWQyMTc3MjQwNzFiZSIsImVtYWlsIjoiYmlrZXNoQG1haWxpbmF0b3IuY29tIiwidXNlcm5hbWUiOiJiaWtlc2giLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2NzgzODQzMzAsImV4cCI6MTY3ODQxMzEzMH0.Hd2S2jqdaYvUjDDZaug4y51N8CU8ahtfJ_8kEk73PnQ";
let movieId = "";

const movieToRegister = {
  title: `Test Movie ${Date.now()}`,
  ordering: 1,
  region: "US",
  language: "English",
  types: ["imdbDisplay"],
  attributes: ["literal", "English", "title"],
  isOriginal: true,
  quantityAvailable: 3,
};

const updatedMovie = {
  title: `Updated Movie ${Date.now()}`,
  quantityAvailable: 5,
};

describe("Test the path to movie", () => {
  test("It should get all the movies", (done) => {
    request(app)
      .get("/api/v1/movie")
      .then((response) => {
        const { _body: data } = response;
        expect(response.statusCode).toBe(200);
        expect(data.status).toBe(true);
        done();
      });
  });

  test("It should register the movie", (done) => {
    request(app)
      .post("/api/v1/movie")
      .set("Authorization", `Bearer ${token}`)
      .send(movieToRegister)
      .then((response) => {
        const { _body: data } = response;
        movieId = data.data.titleId;
        expect(response.statusCode).toBe(200);
        expect(data.status).toBe(true);
        expect(data.data.title).toBe(movieToRegister.title);
        done();
      });
  });

  test("It should update the movie", (done) => {
    request(app)
      .put(`/api/v1/movie/${movieId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedMovie)
      .then((response) => {
        const { _body: data } = response;
        expect(response.statusCode).toBe(200);
        expect(data.status).toBe(true);
        expect(data.data.title).toBe(updatedMovie.title);
        done();
      });
  });

  test("It should get the movie by id", (done) => {
    request(app)
      .get(`/api/v1/movie/${movieId}`)
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        const { _body: data } = response;
        expect(response.statusCode).toBe(200);
        expect(data.status).toBe(true);
        expect(data.data.title).toBe(updatedMovie.title);
        done();
      });
  });

  test("It should delete the movie", (done) => {
    request(app)
      .delete(`/api/v1/movie/${movieId}`)
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        const { _body: data } = response;
        expect(response.statusCode).toBe(200);
        expect(data.status).toBe(true);
        done();
      });
  });
});
