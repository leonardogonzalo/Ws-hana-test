import db from "./dbConnection/hanaDbConnection";

export default class HanaDbContext {
  async GetPeriodo(isoPais) {
    let statement =
      db.options.prepareStatement === true
        ? `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_CAMBRI_OBTIENE_PERIODO"(?)`
        : `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_CAMBRI_OBTIENE_PERIODO"('${isoPais}')`;
    let params = db.options.prepareStatement === true ? [isoPais] : [];
    return db.execute("GetPeriodo", statement, params);
  }

  async GetNivel(isoPais) {
    //call "SICC_CORP"."belcorp.ods.corp.modelos::SP_CAMBRI_OBTIENE_NIVEL" ("CRI");
    let statement =
      db.options.prepareStatement === true
        ? `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_CAMBRI_OBTIENE_NIVEL" (?); `
        : `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_CAMBRI_OBTIENE_NIVEL" ('${isoPais}'); `;
    let params = db.options.prepareStatement === true ? [isoPais] : [];
    return db.execute("GetNivel", statement, params);
  }

  async GetOfertas(isoPais, periodo) {
    //call "SICC_CORP"."belcorp.ods.corp.modelos::SP_CAMBRI_OBTIENE_OFERTAS" ("CRI","201904");
    let statement =
      db.options.prepareStatement === true
        ? `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_CAMBRI_OBTIENE_OFERTAS" (?, ?); `
        : `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_CAMBRI_OBTIENE_OFERTAS" ('${isoPais}', '${periodo}'); `;
    let params = db.options.prepareStatement === true ? [isoPais, periodo] : [];
    return db.execute("GetOfertas", statement, params);
  }

  async GetNivelConsultora(isoPais, consultora, nrocampanas) {
    //call "SICC_CORP"."belcorp.ods.corp.modelos::SP_CAMBRI_OBTIENE_NIVEL_CONSULTORA" ("CRI","0007975",6);
    let statement =
      db.options.prepareStatement === true
        ? `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_CAMBRI_OBTIENE_NIVEL_CONSULTORA" (?, ?, ?); `
        : `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_CAMBRI_OBTIENE_NIVEL_CONSULTORA" ('${isoPais}', '${consultora}', ${nrocampanas}); `;
    let params = db.options.prepareStatement === true ? [isoPais, consultora, nrocampanas] : [];
    return db.execute("GetNivelConsultora", statement, params);
  }

  async GetKitsConsultora(isoPais, consultora, periodo) {
    //call "SICC_CORP"."belcorp.ods.corp.modelos::SP_CAMBRI_OBTIENE_KITS_CONSUL" ("CRI","0007975","201901");
    let statement =
      db.options.prepareStatement === true
        ? `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_CAMBRI_OBTIENE_KITS_CONSUL" (?, ?, ?);`
        : `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_CAMBRI_OBTIENE_KITS_CONSUL" ('${isoPais}', '${consultora}', '${periodo}');`;
    let params = db.options.prepareStatement === true ? [isoPais, consultora, periodo] : [];
    return db.execute("GetKitsConsultora", statement, params);
  }
}
