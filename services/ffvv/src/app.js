//require("../newrelic");

import http from "http";
import Koa from "koa";
//import logger from "koa-logger";
import helmet from "koa-helmet";
import compress from "koa-compress";
import yenv from "yenv";
import log from "@belcorp/logger";
import auth from "koa-basic-auth";

import settings from "./utils/settings";
import apiLogger from "./utils/logger";
import noFavicon from "./utils/no-favicon";
import apiError from "./utils/api-error";
import apiNotFound from "./utils/api-not-found";
import routers from "./routes/api";

import Logger from "logger";
import Hana from "./repositories/dbConnection/hanaDbConnection";
import Oracle from "./repositories/dbConnection/oracleDbConnection";

const env = yenv("env.yaml", { strict: false });
const app = new Koa();
const PORT = env.PORT;
const l = new log.Builder().dir("ffvv").build();
settings.initialize(env);

Logger.configure(env.LOG);
Hana.configure(env.DB.HANA, Logger);
Oracle.configure(env.DB.ORACLE, Logger);

if (Boolean(env.AUTH.enable) === true) {
  app
    .use(function*(next) {
      try {
        yield next;
      } catch (err) {
        if (401 === err.status) {
          this.status = 401;
          this.set("WWW-Authenticate", "Basic");
          this.body = "";
        } else {
          throw err;
        }
      }
    })
    .use(auth(env.AUTH.BASIC));
}

http
  .createServer(
    app
      .use(
        helmet.contentSecurityPolicy({
          directives: {
            defaultSrc: ["'self'"]
          }
        })
      )
      .use(helmet.hidePoweredBy())
      .use(
        compress({
          threshold: 2048,
          flush: require("zlib").Z_SYNC_FLUSH
        })
      )
      //.use(logger())
      .use(noFavicon)
      .use(apiNotFound)
      .use(apiError)
      .use(apiLogger)
      .use(routers.routes())
      .use(routers.allowedMethods())
      .callback()
  )
  .listen(PORT, "0.0.0.0", () => l.info(`Server listening on PORT: ${PORT}`))
  .on("error", err => l.error("Server error", err));

export default app;
