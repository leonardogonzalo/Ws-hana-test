"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodeHdbPool = _interopRequireDefault(require("node-hdb-pool"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const OPTIONS = {
  host: "localhost",
  env: "PROD",
  stage: "PROD",
  port: 30015,
  user: null,
  password: null,
  maxPoolSize: 1000,
  minPoolSize: 10,
  idleTimeoutMillis: 60000,
  refreshIdle: false,
  timeout: 180000,
  logger: null,
  prepareStatement: true
};
let pool;

class HanaDbConnection {
  static configure(opts, log) {
    if (opts) {
      if (opts.host) OPTIONS.host = opts.host;
      if (opts.env) OPTIONS.env = opts.env;
      if (opts.stage) OPTIONS.stage = opts.stage;
      if (opts.port) OPTIONS.port = opts.port;
      if (opts.user) OPTIONS.user = opts.user;
      if (opts.password) OPTIONS.password = opts.password;
      if (opts.maxPoolSize) OPTIONS.maxPoolSize = opts.maxPoolSize;
      if (opts.minPoolSize) OPTIONS.minPoolSize = opts.minPoolSize;
      if (opts.idleTimeoutMillis) OPTIONS.idleTimeoutMillis = opts.idleTimeoutMillis;
      if (opts.refreshIdle) OPTIONS.refreshIdle = Boolean(opts.refreshIdle);
      if (opts.timeout) OPTIONS.timeout = opts.timeout;
      if (opts.prepareStatement) OPTIONS.prepareStatement = Boolean(opts.prepareStatement);
      if (log) OPTIONS.logger = log;
    }

    pool = _nodeHdbPool.default.createPool({
      host: OPTIONS.host,
      env: OPTIONS.env,
      stage: OPTIONS.stage,
      port: OPTIONS.port,
      user: OPTIONS.user,
      password: OPTIONS.password,
      maxPoolSize: OPTIONS.maxPoolSize,
      minPoolSize: OPTIONS.minPoolsize,
      idleTimeoutMillis: OPTIONS.idleTimeoutMillis,
      refreshIdle: OPTIONS.refreshIdle,
      genericPoolLog: false
    });
  }

  static options() {
    return OPTIONS;
  }

  static execute(name, statement, params, singleResult) {
    return new Promise((done, reject) => {
      //try {
      if (pool) {
        //let response = undefined;
        let elapsed = OPTIONS.logger.eventStart(`${name}`, `HANA Execute ${name}`);
        pool.exec(statement, params, (error, data) => {
          console.log(`${name}`, `queryresponse ${name} ` + Math.abs(new Date().getTime() - elapsed.timer.timeStart.getTime()).toString() + " ms"); //if (response === undefined) {
          //  response = true;

          if (error) {
            OPTIONS.logger.eventStop(`HANA ${name} failed: ${error.message}`, elapsed);
            reject(error);
          } else {
            OPTIONS.logger.eventStop(`HANA ${name}: ${data && data.length > 0 ? data.length : 0} rows`, elapsed); //console.debug("DB Data Result", data);

            done(singleResult === true ? data : data);
          } //}

          /*
          else {
            if (response === false) {
              reject(new Error(`HANA Timeout ${name}`));
            }
          }
          */

        });
        /*
        setTimeout(() => {
          if (response === undefined) {
            response = false;
          }
        }, OPTIONS.timeout);
        */
      } else {
        reject(new Error("HANA.Error.HDB_POOL"));
      }
      /*
      } catch (exception) {
        console.log("antes");
        reject(exception);
      }
      */

    });
  }

}

exports.default = HanaDbConnection;