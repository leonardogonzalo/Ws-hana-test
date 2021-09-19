import oracledb from "oracledb";
import schedule from "node-schedule";

const poolPaises = new Map();
const lastExecutions = new Map();

const OPTIONS = {
  host: "",
  user: "",
  password: "",
  poolMax: 50,
  poolMin: 0,
  poolIncrement: 1,
  poolTimeout: 5,
  connections: [],
  clearTime: 60,
  logger: null
};

export default class OracleDbConnection {
  static configure(opts, log) {
    if (opts) {
      if (opts.host) OPTIONS.host = opts.host;
      if (opts.user) OPTIONS.user = opts.user;
      if (opts.password) OPTIONS.password = opts.password;
      if (opts.poolMax) OPTIONS.poolMax = opts.poolMax;
      if (opts.poolMin) OPTIONS.poolMin = opts.poolMin;
      if (opts.poolIncrement) OPTIONS.poolIncrement = opts.poolIncrement;
      if (opts.poolTimeout) OPTIONS.poolTimeout = opts.poolTimeout;
      if (opts.clearTime) OPTIONS.clearTime = opts.clearTime;
      if (opts.connections) OPTIONS.connections = opts.connections;
      if (log) OPTIONS.logger = log;
    }
    // El poolTimeout del driver no esta trabajando por lo que se habilito un garbage connections
    //setInterval(OracleDbConnection.ClearPool, OPTIONS.clearTime * 1000 );
    const cron = '*/' + OPTIONS.clearTime + ' * * * * *';
    schedule.scheduleJob(cron, OracleDbConnection.ClearPool)
  }

  static ClearPool() {
    for (const executionFields of lastExecutions) {
      const last = executionFields[1];
      const country = executionFields[0];
      const elapsed = (new Date().getTime() - last.getTime()) / 1000
      const pool = poolPaises.get(country);
      if (elapsed >= 60) {
        if (pool) {
          const connectionsOpen = pool.connectionsOpen;
          //console.log('count', connectionsOpen);
          if (connectionsOpen > 0) {
            //console.log('clear');
            for (let i = 1; i <= connectionsOpen; i++) {
              pool.getConnection(async (error, connection) => {
                if (!error) {
                  connection.close({ drop: true });
                }
              });
            }
          }
        }
        // nextClear.setDate(nextClear.getDate() + 7);
        lastExecutions.set(country, new Date());
      }
    };
  }

  static GetConnectionString(codPais) {
    return OPTIONS.connections.find(x => x.codPais === codPais);
  }

  static initSession(connection, requestedTag, cb) {
    process.env.timeout = 60;
  }

  static GetPool(codPais) {
    return new Promise(async (done, reject) => {
      try {
        // let pool;
        if (poolPaises.has(codPais)) {
          const poolReused = poolPaises.get(codPais);
          done(poolReused);
        } else {
          const connectionString = OracleDbConnection.GetConnectionString(codPais);
          const paramsConnection = {
            user: connectionString.user,
            password: connectionString.pass,
            connectString: `${connectionString.host}:${connectionString.port}/${connectionString.service}`,
            poolMax: OPTIONS.poolMax,
            poolMin: OPTIONS.poolMin,
            poolIncrement: OPTIONS.poolIncrement,
            poolTimeout: OPTIONS.poolTimeout,
            //_enableStats: true,
            //events: false,
            //enableStats: true,
            //queueTimeout: 53000,
            //poolPingInterval: 3000,
            //sessionCallback: this.initSession,
          };
          oracledb
            .createPool(paramsConnection)
            .then(pool => {
              poolPaises.set(codPais, pool);
              done(pool);
            })
            .catch(error => {
              reject(error);
            });
        }
      } catch (exception) {
        reject(exception);
      } finally {
        lastExecutions.set(codPais, new Date());
      }
    });
  }

  static schema(codPais) {
    return OracleDbConnection.GetConnectionString(codPais).schema;
  }

  static execute(name, codPais, statement, params) {
    return new Promise(async (done, reject) => {
      try {
        const elapsed = OPTIONS.logger.eventStart(`Query ${name}`, `ORACLE Execute ${codPais} ${name}`);
        const pool = await OracleDbConnection.GetPool(codPais);
        pool.getConnection((error, connection) => {
          function doRelease(connection) {
            connection.close((err, result) => {
              if (err) {
                console.error(err.message);
              }
            });
          }
          if (error) {
            reject(error);
          } else {
            connection.execute(statement, params, { outFormat: oracledb.OBJECT }, (err, result) => {
              if (err) {
                OPTIONS.logger.eventStop(`ORACLE ${name}: 0 rows`, elapsed);
                doRelease(connection);
                reject(err);
              } else {
                const data = result ? (result.rows ? result.rows : result.outBinds ? [result.outBinds] : undefined) : undefined;
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
