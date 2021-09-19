//import oracle from "oracledb";
import db from "./dbConnection/oracleDbConnection";

export default class OracleDbContext {
  async GetPeriodo(isoPais) {
    let statement = `SELECT * FROM TABLE(${db.schema(isoPais)}.soa_pkg_proce.soa_fn_cambr_obtie_perio(:isoPais))`;
    let params = {
      isoPais: isoPais
    };
    return db.execute("GetPeriodo", isoPais, statement, params);
  }

  async GetNivel(isoPais) {
    let statement = `SELECT * FROM TABLE(${db.schema(isoPais)}.soa_pkg_proce.soa_fn_cambr_obtie_nivel(:isoPais))`;
    let params = { isoPais: isoPais };
    return db.execute("GetNivel", isoPais, statement, params);
  }

  async GetOfertas(isoPais, periodo) {
    let statement = `SELECT * FROM TABLE(${db.schema(isoPais)}.soa_pkg_proce.soa_fn_cambr_obtie_ofert(:isoPais, :periodo))`;
    let params = { isoPais: isoPais, periodo: periodo };
    return db.execute("GetOfertas", isoPais, statement, params);
  }

  async GetNivelConsultora(isoPais, consultora, nrocampanas) {
    let statement = `SELECT * FROM TABLE(${db.schema(
      isoPais
    )}.soa_pkg_proce.soa_fn_cambr_obtie_nivel_consu(:isoPais, :consultora, :nrocampanas))`;
    let params = { isoPais: isoPais, consultora: consultora, nrocampanas: nrocampanas };
    return db.execute("GetNivelConsultora", isoPais, statement, params);
  }

  async GetKitsConsultora(isoPais, consultora, periodo) {
    let statement = `SELECT * FROM TABLE(${db.schema(
      isoPais
    )}.soa_pkg_proce.soa_fn_cambr_obtie_kits_consu(:isoPais, :consultora, :periodo))`;
    let params = { isoPais: isoPais, consultora: consultora, periodo: periodo };
    return db.execute("GetKitsConsultora", isoPais, statement, params);
  }
}
