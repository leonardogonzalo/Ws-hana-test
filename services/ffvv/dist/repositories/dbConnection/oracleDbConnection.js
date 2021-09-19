"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _oracledb = _interopRequireDefault(require("oracledb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const poolPaises = new Map();
const OPTIONS = {
  host: "",
  user: "",
  password: "",
  poolMax: 500,
  poolMin: 30,
  poolIncrement: 5,
  poolTimeout: 180000,
  connections: [],
  logger: null
};

class OracleDbConnection {
  static configure(opts, log) {
    if (opts) {
      if (opts.host) OPTIONS.host = opts.host;
      if (opts.user) OPTIONS.user = opts.user;
      if (opts.password) OPTIONS.password = opts.password;
      if (opts.poolMax) OPTIONS.poolMax = opts.poolMax;
      if (opts.poolMin) OPTIONS.poolMin = opts.poolMin;
      if (opts.poolIncrement) OPTIONS.poolIncrement = opts.poolIncrement;
      if (opts.poolTimeout) OPTIONS.poolTimeout = opts.poolTimeout;
      if (opts.connections) OPTIONS.connections = opts.connections;
      if (log) OPTIONS.logger = log;
    }
  }

  static GetConnectionString(codPais) {
    return OPTIONS.connections.find(x => x.codPais === codPais);
  }

  static GetPool(codPais) {
    return new Promise(async (done, reject) => {
      try {
        let pool;

        if (poolPaises.has(codPais)) {
          pool = poolPaises.get(codPais);
          done(pool);
        } else {
          let connectionString = OracleDbConnection.GetConnectionString(codPais);

          _oracledb.default.createPool({
            user: connectionString.user,
            password: connectionString.pass,
            connectString: `${connectionString.host}:${connectionString.port}/${connectionString.service}`,
            poolMax: OPTIONS.poolMax,
            poolMin: OPTIONS.poolMin,
            poolIncrement: OPTIONS.poolIncrement,
            poolTimeout: OPTIONS.poolTimeout
          }).then(pool => {
            poolPaises.set(codPais, pool);
            done(pool);
          }).catch(error => {
            reject(error);
          });
        }
      } catch (exception) {
        reject(exception);
      }
    });
  }

  static schema(codPais) {
    return OracleDbConnection.GetConnectionString(codPais).schema;
  }

  static execute(name, codPais, statement, params) {
    return new Promise(async (done, reject) => {
      try {
        let elapsed = OPTIONS.logger.eventStart(`Query ${name}`, `ORACLE Execute ${codPais} ${name}`);
        let pool = await OracleDbConnection.GetPool(codPais);
        pool.getConnection((error, connection) => {
          function doRelease(connection) {
            connection.close(err => {
              if (err) {
                console.error(err.message);
              }
            });
          }

          if (error) {
            reject(error);
          } else {
            connection.execute(statement, params, {
              outFormat: _oracledb.default.OBJECT
            }, (err, result) => {
              if (err) {
                OPTIONS.logger.eventStop(`ORACLE ${name}: 0 rows`, elapsed);
                doRelease(connection);
                reject(err);
              } else {
                let data = result ? result.rows ? result.rows : result.outBinds ? [result.outBinds] : undefined : undefined;
                OPTIONS.logger.eventStop(`ORACLE ${name}: ${data ? data.length : 0} rows`, elapsed);
                doRelease(connection);
                done(data);
              }
            });
          }
        });
      } catch (exception) {
        reject(exception);
      }
    });
  }

}

exports.default = OracleDbConnection;