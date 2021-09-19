import Router from "koa-router";
import Controller from "../controllers";

let router = new Router();
let controller = new Controller();

router.get("/GetPeriodo/:isoPais", controller.GetPeriodo);

router.get("/GetNivel/:isoPais", controller.GetNivel);

router.get("/GetOfertas/:isoPais/:periodo", controller.GetOfertas);

router.get("/GetNivelConsultora/:isoPais/:consultora/:nroCampanas", controller.GetNivelConsultora);

router.get("/GetKitsConsultora/:isoPais/:consultora/:periodo", controller.GetKitsConsultora);

router.get("/", controller.Health);

router.get("/health", controller.Health);

export default router;
