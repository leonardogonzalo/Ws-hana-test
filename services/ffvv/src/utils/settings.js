let env;

export default class Settings {
  static async initialize(options) {
    env = options;
  }

  static async getConnectionStringContingencia(codPais) {
    return env.DB.ORACLE.connections.find(x => x.codPais === codPais);
  }

  static isEnableContingencia(codPais) {
    let oracleConfig = null;
    if (env.DB.ORACLE && env.DB.ORACLE.connections) oracleConfig = env.DB.ORACLE.connections.find(x => x.codPais === codPais);

    if (!oracleConfig) oracleConfig = { enable: false };
    return oracleConfig.enable;
  }
}
