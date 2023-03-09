const request = require("supertest");

const { app } = require("../app");

// token of the customer
let token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM4NTU2ZGJlLWU4YzctNGU4MC1iMGM3LTgwNWI3ZDc5M2ZlMiIsImVtYWlsIjoic2l0aWtodUBtYWlsaW5hdG9yLmNvbSIsInVzZXJuYW1lIjoic2l0aWtodSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjc4Mzg0MzU1LCJleHAiOjE2Nzg0MTMxNTV9.iCdwjp5w-33z8h5GQHbmibJccU2ysVpQw3p1ZUsk8Yk";
const adminToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYTE4NzM2LWVmMGEtNGM2Ny1iNjFlLWQyMTc3MjQwNzFiZSIsImVtYWlsIjoiYmlrZXNoQG1haWxpbmF0b3IuY29tIiwidXNlcm5hbWUiOiJiaWtlc2giLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2NzgzODQzMzAsImV4cCI6MTY3ODQxMzEzMH0.Hd2S2jqdaYvUjDDZaug4y51N8CU8ahtfJ_8kEk73PnQ";
let orderId = "e6e1400f-3b4e-4007-9322-dc8071afe8fb";

const dataToAddInCart = {
  movieId: "6db381a0-b02f-42f7-9c0b-2d02fced237c",
  quantity: 2,
};

const statusToUpdate = "SHIPPED";

const orderStatus = ["INITIATED", "PROCESSED", "SHIPPED", "COLLECTED"];

describe("Test the path to order", () => {
  test("It should add to the cart", (done) => {
    request(app)
      .post("/api/v1/order/add-to-cart")
      .send(dataToAddInCart)
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        const { _body: data } = response;
        expect(response.statusCode).toBe(200);
        expect(data.status).toBe(true);
        expect(data.data).not.toHaveLength(0);
        done();
      });
  });

  test("It should make order from cart", (done) => {
    request(app)
      .post("/api/v1/order/make-order")
      .send(dataToAddInCart)
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        const { _body: data } = response;
        expect(response.statusCode).toBe(200);
        expect(data.status).toBe(true);
        done();
      });
  });

  test("It should list my movie orders", (done) => {
    request(app)
      .get("/api/v1/order/my-orders")
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        const { _body: data } = response;
        expect(response.statusCode).toBe(200);
        expect(data.status).toBe(true);
        done();
      });
  });

  test("It should list my movie history", (done) => {
    request(app)
      .get("/api/v1/order/my-orders-history")
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        const { _body: data } = response;
        expect(response.statusCode).toBe(200);
        expect(data.status).toBe(true);
        done();
      });
  });

  test("It should list my movie order status", (done) => {
    request(app)
      .get(`/api/v1/order/my-order-status/${orderId}`)
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        const { _body: data } = response;
        expect(response.statusCode).toBe(200);
        expect(data.status).toBe(true);
        expect(orderStatus).toContain(data.data.status);
        done();
      });
  });

  test("It should update the status of order by admin", (done) => {
    request(app)
      .put(`/api/v1/order/update-order/${orderId}`)
      .send({ status: statusToUpdate })
      .set("Authorization", `Bearer ${adminToken}`)
      .then((response) => {
        const { _body: data } = response;
        expect(response.statusCode).toBe(200);
        expect(data.status).toBe(true);
        expect(data.data.status).toBe(statusToUpdate);
        expect(orderStatus).toContain(data.data.status);
        done();
      });
  });

  test("It should update the status to collected", (done) => {
    request(app)
      .put(`/api/v1/order/collect-order/${orderId}`)
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        const { _body: data } = response;
        expect(response.statusCode).toBe(200);
        expect(data.status).toBe(true);
        expect(data.data.status).toBe("COLLECTED");
        done();
      });
  });
});
