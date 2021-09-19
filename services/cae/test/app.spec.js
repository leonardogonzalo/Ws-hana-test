import chai from "chai";
import http from "chai-http";

import index from "../src/app";

const expect = chai.expect;
const app = index.listen();

const authorization = 'Basic QUtJQUlZRVRTUlVKRFZQVUpNVlE6NjN0U05NT1VxUTJ3QUgxNktXTC9uZnpPdS9xV3BrcHo5VEZtMjFUaQ==';

chai.use(http);

describe("API /Ofertas Tests", () => {
  after(() => app.close);

  describe("GET /GetPeriodo/:iso", () => {
    it("return periodo by iso => CRI", async () => {
      const res = await chai.request(app)
        .get("/GetPeriodo/CRI")
        .set('Authorization', authorization);

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.an("array");
    });
  });

  describe("500 error", () => {
    it("return incorrect request", async () => {
      const res = await chai.request(app)
        .get("/GetPeriodo/A1")
        .set('Authorization', authorization);
      expect(res).to.have.status(500);
    });
  });
p
  describe("404 error", () => {
    it("return incorrect request", async () => {
      const res = await chai.request(app)
        .get("/NOT_FOUND/404")
        .set('Authorization', authorization);
      expect(res).to.have.status(404);
    });
  });
});
