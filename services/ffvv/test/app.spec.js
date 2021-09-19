import chai from "chai";
import http from "chai-http";

import index from "../src/app";

const expect = chai.expect;
const app = index.listen();

chai.use(http);

describe("API /Ofertas Tests", () => {
  after(() => app.close);

  describe("GET /ObtenerEstadoConsultora/:iso", () => {
    it("return Estado Consultora => CRI", async () => {
      const res = await chai.request(app).get("/ObtenerEstadoConsultora/CRI");

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.an("array");
    });
  });

  describe("500 error", () => {
    it("return incorrect request", async () => {
      const res = await chai.request(app).get("/ObtenerEstadoConsultora/A1");
      expect(res).to.have.status(500);
    });
  });

  describe("404 error", () => {
    it("return incorrect request", async () => {
      const res = await chai.request(app).get("/NOT_FOUND/404");
      expect(res).to.have.status(404);
    });
  });
});
