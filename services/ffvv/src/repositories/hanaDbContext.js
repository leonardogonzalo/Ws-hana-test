import db from "./dbConnection/hanaDbConnection";

export default class HanaDbContext {
  async GetOIDPeriodo(isoPais, codPais, campania) {
    //l_oidcampaniaact  := "_SYS_BIC"."belcorp.ods.corp.funciones::FIN_FN_OBTIE_OID_PERIO"(:p_isopais,:lv_cod_pais,:p_campania);
    let statement = `SELECT "_SYS_BIC"."belcorp.ods.corp.funciones::FIN_FN_OBTIE_OID_PERIO"(?,?,?) as OIDPERIODO FROM dummy`;
    let params = [isoPais, codPais, campania];
    //let statement = `SELECT "_SYS_BIC"."belcorp.ods.corp.funciones::FIN_FN_OBTIE_OID_PERIO"('${isoPais}', '${codPais}', '${campania}') as OIDPERIODO FROM dummy`;
    //let params = [];
    return db.execute("GetOIDPeriodo", statement, params, true);
  }

  async GetCampaniaActualRefac(codPais, codRegi, codZona, codRol) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTIE_CAMPANA_ACTUAL_REFAC""            ('{0}','{1}','{2}','{3}')", codPais, codRegi, codZona, codRol);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIE_CAMPANA_ACTUAL_REFAC"(?,?,?,?)`;
    let params = [codPais, codRegi, codZona, codRol];
    /*
    codRegi = codRegi ? `'${codRegi}'` : null;
    codZona = codZona ? `'${codZona}'` : null;
    codRol = codRol ? `'${codRol}'` : null;
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIE_CAMPANA_ACTUAL_REFAC"('${codPais}', ${codRegi}, ${codZona}, ${codRol})`;
    let params = [];
    */
    return db.execute("GetCampaniaActualRefac", statement, params);
  }

  async GetCampania(codPais, campania, periodos) {
    //cmd = string.Format(@"SELECT ""_SYS_BIC"" . ""belcorp.ods.corp.funciones::OBTIE_CAMPA_SGTE_ANTER"" ('{0}','{1}','{2}') FROM dummy", codPais, campania, periodos);
    let statement = `SELECT "SICC_CORP"."belcorp.ods.corp.funciones::OBTIE_CAMPA_SGTE_ANTER"(?, ?, ?) AS CAMPANIA FROM dummy`;
    let params = [codPais, campania, periodos];
    //let statement = `SELECT "_SYS_BIC"."belcorp.ods.corp.funciones::OBTIE_CAMPA_SGTE_ANTER"('${codPais}', '${campania}', '${periodos}') AS CAMPANIA FROM dummy`;
    //let params = [];
    return db.execute("GetCampania", statement, params);
  }

  async GetCantGananciaYSaldoRefac(codPais, campania, codRegi, codZona, codSecc) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTENER_COUNTGANANCIAYSALDOREFAC""                 ('{0}','{1}','{2}','{3}','{4}')", codPais, campania, codRegi, codZona, codSecc);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_COUNTGANANCIAYSALDOREFAC"(?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, codSecc];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_COUNTGANANCIAYSALDOREFAC"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${codSecc}')`;
    //let params = [];
    return db.execute("GetCantGananciaYSaldoRefac", statement, params);
  }

  async GetCantListActividadRefac(codPais, campania, codRegi, codZona, codSecc, facturacion) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTENER_COUNTLISTADOACTIVIDAREFAC"" ('{0}','{1}','{2}','{3}','{4}','{5}')", codPais, campania, codRegi, codZona, codSecc, facturacion);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_COUNTLISTADOACTIVIDAREFAC"(?,?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, codSecc, facturacion];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_COUNTLISTADOACTIVIDAREFAC"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${codSecc}', '${facturacion}')`;
    //let params = [];
    return db.execute("GetCantListActividadRefac", statement, params);
  }

  async GetCantListCapitalizacionRefac(codPais, campania, codRegi, codZona, codSecc, tipo, facturacion) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTENER_COUNTLISTADOCAPITALIZACIONREFAC""         ('{0}','{1}','{2}','{3}','{4}','{5}','{6}')", codPais, campania, codRegi, codZona, codSecc, tipo, facturacion);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_COUNTLISTADOCAPITALIZACIONREFAC"(?, ?, ?, ?, ?, ?, ?)`;
    let params = [codPais, campania, codRegi, codZona, codSecc, tipo, facturacion];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_COUNTLISTADOCAPITALIZACIONREFAC"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${codSecc}', '${tipo}', '${facturacion}')`;
    //let params = [];
    return db.execute("GetCantListCapitalizacionRefac", statement, params);
  }

  async GetCantListCicloNuevas(codPais, campania, codRegi, codZona, tipo) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTENER_COUNTLISTADOCICLONUEVAS""     ('{0}','{1}','{2}','{3}','{4}')", codPais, campania, codRegi, codZona, tipo);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_COUNTLISTADOCICLONUEVAS"(?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, tipo];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_COUNTLISTADOCICLONUEVAS"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${tipo}')`;
    //let params = [];
    return db.execute("GetCantListCicloNuevas", statement, params);
  }

  async GetCantListPedido(codPais, campania, codZona, tipo, codRegi, facturacion) {
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_COUNTLISTADOPEDIDO"(?, ?, ?, ?, ?, ?)`;
    let params = [codPais, campania, codZona, tipo, codRegi, facturacion];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_COUNTLISTADOPEDIDO"('${codPais}', '${campania}', '${codZona}', '${tipo}', '${codRegi}', '${facturacion}')`;
    //let params = [];
    return db.execute("GetCantListPedido", statement, params);
  }

  async GetCantListPedidosVentaRefac(codPais, campania, codRegi, codZona, codSecc, tipo, facturacion) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTENER_COUNTLISTADOPEDIDOSVENTAREFAC""         ('{0}','{1}','{2}','{3}','{4}','{5}','{6}')", codPais, campania, codRegi, codZona, codSecc, tipo, facturacion);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_COUNTLISTADOPEDIDOSVENTAREFAC"(?,?,?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, codSecc, tipo, facturacion];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_COUNTLISTADOPEDIDOSVENTAREFAC"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${codSecc}', '${tipo}', '${facturacion}')`;
    //let params = [];
    return db.execute("GetCantListPedidosVentaRefac", statement, params);
  }

  async GetCantListPosiblesConsecutivasRefac(codPais, campania, codRegi, codZona, codSecc) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTENER_COUNTLISTADOPOSIBLESCONSECUTIVASREFAC""         ('{0}','{1}','{2}','{3}','{4}')", codPais, campania, codRegi, codZona, codSecc);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_COUNTLISTADOPOSIBLESCONSECUTIVASREFAC"(?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, codSecc];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_COUNTLISTADOPOSIBLESCONSECUTIVASREFAC"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${codSecc}')`;
    //let params = [];
    return db.execute("GetCantListPosiblesConsecutivasRefac", statement, params);
  }

  async GetCantListVentaNeta(codPais, campania, codRegi, codZona, tipo, facturacion) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTENER_COUNTLISTADOVENTANETA""         ('{0}','{1}','{2}','{3}','{4}','{5}')", codPais, campania, codRegi, codZona, tipo, facturacion);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_COUNTLISTADOVENTANETA"(?, ?, ?, ?, ?, ?)`;
    let params = [codPais, campania, codRegi, codZona, tipo, facturacion];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_COUNTLISTADOVENTANETA"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${tipo}', '${facturacion}')`;
    //let params = [];
    return db.execute("GetCantListVentaNeta", statement, params);
  }

  async GetCantSaldoPendienteRefac(codPais, campania, codRegi, codZona, codSecc) {
    //cmd = string.Format(@"CALL ""SICC_CORP"".""belcorp.ods.corp.modelos::SP_OBTENER_COUNTSALDOPENDIENTEREFAC""    ('{0}','{1}','{2}','{3}','{4}')", codPais, campania, codRegi, codZona, codSecc);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_COUNTSALDOPENDIENTEREFAC"(?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, codSecc];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_COUNTSALDOPENDIENTEREFAC"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${codSecc}')`;
    //let params = [];
    return db.execute("GetCantSaldoPendienteRefac", statement, params);
  }

  async GetCountListPegRefac(codPais, campania, codRegi, codZona, facturacion) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTENER_COUNTLISTADOPEGREFAC""         ('{0}','{1}','{2}','{3}','{4}')", codPais, campania, codRegi, codZona, facturacion);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_COUNTLISTADOPEGREFAC"(?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, facturacion];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_COUNTLISTADOPEGREFAC"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${facturacion}')`;
    //let params = [];
    return db.execute("GetCountListPegRefac", statement, params);
  }

  async GetEstadoConsultora(codPais) {
    //cmd = string.Format(@"SELECT IDESTADOACTIVIDAD,PAISID,CODIGOESTADOACTIVIDAD,DESCRIPCION,ESTADOACTIVO          FROM  ""_SYS_BIC"" . ""belcorp.ods.corp.modelos/CV_ESTADO_CONSULTORA""(PLACEHOLDER = ('$$P_CODPAIS$$','{0}'))", codPais);
    let statement = `SELECT
       IDESTADOACTIVIDAD, PAISID, CODIGOESTADOACTIVIDAD, DESCRIPCION, ESTADOACTIVO
      FROM "_SYS_BIC"."belcorp.ods.corp.modelos/CV_ESTADO_CONSULTORA"
      (PLACEHOLDER = ('$$P_CODPAIS$$', '${codPais}'))`;
    let params = [];
    return db.execute("GetEstadoConsultora", statement, params);
  }

  async GetGananciaSaldoRefac(codPais, campania, codRegi, codZona, codSecc) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTIE_GANANCIA_SALDO_REFAC""     ('{0}','{1}','{2}','{3}','{4}')", codPais, campania, codRegi, codZona, codSecc);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIE_GANANCIA_SALDO_REFAC"(?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, codSecc];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIE_GANANCIA_SALDO_REFAC"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${codSecc}')`;
    //let params = [];
    return db.execute("GetGananciaSaldoRefac", statement, params);
  }

  async GetIndicadorActividad(codPais, campania, codRegi, codZona, codSecc, tipo) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTIE_INDICADOR_ACTIVIDAD""     ('{0}','{1}','{2}','{3}','{4}','{5}')", codPais, campania, codRegi, codZona, codSecc, tipo);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIE_INDICADOR_ACTIVIDAD"(?,?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, codSecc, tipo];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIE_INDICADOR_ACTIVIDAD"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${codSecc}', '${tipo}')`;
    //let params = [];
    return db.execute("GetIndicadorActividad", statement, params);
  }

  async GetIndicadorCapitalizacion(codPais, campania, codRegi, codZona, codSecc, tipo) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTIE_INDICADOR_CAPITALIZACION""     ('{0}','{1}','{2}','{3}','{4}','{5}')", codPais, campania, codRegi, codZona, codSecc, tipo);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIE_INDICADOR_CAPITALIZACION"(?,?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, codSecc, tipo];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIE_INDICADOR_CAPITALIZACION"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${codSecc}', '${tipo}')`;
    //let params = [];
    return db.execute("GetIndicadorCapitalizacion", statement, params);
  }

  async GetIndicadorCicloNuevas(codPais, campania, codRegi, codZona, codSecc, tipo) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTIE_INDICADOR_CICLO_NUEVAS""         ('{0}','{1}','{2}','{3}','{4}','{5}')", codPais, campania, codRegi, codZona, codSecc, tipo);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIE_INDICADOR_CICLO_NUEVAS"(?,?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, codSecc, tipo];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIE_INDICADOR_CICLO_NUEVAS"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${codSecc}', '${tipo}')`;
    //let params = [];
    return db.execute("GetIndicadorCicloNuevas", statement, params);
  }

  async GetIndicadorPedidos(codPais, campania, codRegi, codZona, codSecc) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTIE_INDICADOR_PEDIDOS""             ('{0}','{1}','{2}','{3}','{4}')", codPais, campania, codRegi, codZona, codSecc);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIE_INDICADOR_PEDIDOS"(?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, codSecc];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIE_INDICADOR_PEDIDOS"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${codSecc}')`;
    //let params = [];
    return db.execute("GetIndicadorPedidos", statement, params);
  }

  async GetIndicadorPosibleConsecu(codPais, campania, codRegi, codZona, codSecc, tipo) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTIE_INDICADOR_POSIBLE_CONSECU""             ('{0}','{1}','{2}','{3}','{4}','{5}')", codPais, campania, codRegi, codZona, codSecc, tipo);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIE_INDICADOR_POSIBLE_CONSECU"(?,?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, codSecc, tipo];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIE_INDICADOR_POSIBLE_CONSECU"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${codSecc}', '${tipo}')`;
    //let params = [];
    return db.execute("GetIndicadorPosibleConsecu", statement, params);
  }

  async GetIndicadorPosiblesEgresos(codPais, campania, codRegi, codZona, codSecc, tipo) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTIE_INDICADOR_PEG""         ('{0}','{1}','{2}','{3}','{4}','{5}')", codPais, campania, codRegi, codZona, codSecc, tipo);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIE_INDICADOR_PEG" (?,?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, codSecc, tipo];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIE_INDICADOR_PEG" ('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${codSecc}', '${tipo}')`;
    //let params = [];
    return db.execute("GetIndicadorPosiblesEgresos", statement, params);
  }

  async GetIndicadorVentas(codPais, campania, codRegi, codZona, codSecc, tipo) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTIE_INDICADOR_VENTAS""         ('{0}','{1}','{2}','{3}','{4}','{5}')", codPais, campania, codRegi, codZona, codSecc, tipo);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIE_INDICADOR_VENTAS"(?,?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, codSecc, tipo];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIE_INDICADOR_VENTAS"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${codSecc}', '${tipo}')`;
    //let params = [];
    return db.execute("GetIndicadorVentas", statement, params);
  }

  async GetListActividadDev(codPais, campania, codRegi, codZona, codSecc, facturacion) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTENER_LISTADOACTIVIDAD_dev""         ('{0}','{1}','{2}','{3}','{4}', '{5}')", codPais, campania, codRegi, codZona, codSecc, facturacion);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_LISTADOACTIVIDAD_dev"(?,?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, codSecc, facturacion];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_LISTADOACTIVIDAD_dev"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${codSecc}', '${facturacion}')`;
    //let params = [];
    return db.execute("GetListActividadDev", statement, params);
  }

  async GetListActividad(codPais, campania, codRegi, codZona, codSecc, facturacion) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTENER_LISTADOACTIVIDAD""             ('{0}','{1}','{2}','{3}','{4}','{5}')", codPais, campania, codRegi, codZona, codSecc, facturacion);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_LISTADOACTIVIDAD"(?,?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, codSecc, facturacion];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_LISTADOACTIVIDAD"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${codSecc}', '${facturacion}')`;
    //let params = [];
    return db.execute("GetListActividad", statement, params);
  }

  async GetListCapitalizacionRefac(codPais, campania, codRegi, codZona, codSecc, tipo, facturacion) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTENER_LISTADOCAPITALIZACIONREFAC""('{0}','{1}','{2}','{3}','{4}','{5}','{6}')", codPais, campania, codRegi, codZona, codSecc, tipo, facturacion);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_LISTADOCAPITALIZACIONREFAC"(?,?,?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, codSecc, tipo, facturacion];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_LISTADOCAPITALIZACIONREFAC"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${codSecc}', '${tipo}', '${facturacion}')`;
    //let params = [];
    return db.execute("GetListCapitalizacionRefac", statement, params);
  }

  async GetListCicloNuevasAll(codPais, campania, codZona, codSecc, tipo, indConsul) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTENER_LISTADOCICLONUEVASALL""             ('{0}','{1}','{2}','{3}','{4}', '{5}')", codPais, campania, codZona, codSecc, tipo, indConsul);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_LISTADOCICLONUEVASALL"(?,?,?,?,?,?)`;
    let params = [codPais, campania, codZona, codSecc, tipo, indConsul];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_LISTADOCICLONUEVASALL"('${codPais}', '${campania}', '${codZona}', '${codSecc}', '${tipo}', '${indConsul}')`;
    //let params = [];
    return db.execute("GetListCicloNuevasAll", statement, params);
  }

  async GetListCicloNuevas(codPais, campania, codZona, codSecc, tipo) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTENER_LISTADOCICLONUEVAS""         ('{0}','{1}','{2}','{3}','{4}')", codPais, campania, codZona, codSecc, tipo);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_LISTADOCICLONUEVAS"(?,?,?,?,?)`;
    let params = [codPais, campania, codZona, codSecc, tipo];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_LISTADOCICLONUEVAS"('${codPais}', '${campania}', '${codZona}', '${codSecc}', '${tipo}')`;
    //let params = [];
    return db.execute("GetListCicloNuevas", statement, params);
  }

  async GetListGananciaYSaldo(codPais, campania, codRegi, codZona, codSecc) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTENER_LISTADOGANANCIAYSALDO""        ('{0}','{1}','{2}','{3}','{4}')", codPais, campania, codRegi, codZona, codSecc);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_LISTADOGANANCIAYSALDO"(?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, codSecc];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_LISTADOGANANCIAYSALDO"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${codSecc}')`;
    //let params = [];
    return db.execute("GetListGananciaYSaldo", statement, params);
  }

  async GetListPedidosVentaRefac(codPais, campania, codRegi, codZona, codSecc, tipo, ordenamiento, facturacion) {
    //cmd = string.Format(@"CALL ""SICC_CORP"".""belcorp.ods.corp.modelos::SP_OBTENER_LISTADOPEDIDOSVENTAREFAC""         ('{0}','{1}','{2}','{3}','{4}','{5}','{6}','{7}')", codPais, campania, codRegi, codZona, codSecc, tipo, ordenamiento, facturacion);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_LISTADOPEDIDOSVENTAREFAC"(?,?,?,?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, codSecc, tipo, ordenamiento, facturacion];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_LISTADOPEDIDOSVENTAREFAC"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${codSecc}', '${tipo}', '${ordenamiento}', '${facturacion}')`;
    //let params = [];
    return db.execute("GetListPedidosVentaRefac", statement, params);
  }

  async GetListPegRefac(codPais, campania, codRegi, codZona, codSecc, esPEGCx, facturacion) {
    //cmd = string.Format(@"CALL ""SICC_CORP"".""belcorp.ods.corp.modelos::SP_OBTENER_LISTADOPEGREFAC""         ('{0}','{1}','{2}','{3}','{4}','{5}','{6}')", codPais, campania, codRegi, codZona, codSecc, esPEGCx, facturacion);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_LISTADOPEGREFAC"(?,?,?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, codSecc, esPEGCx, facturacion];
    /*
    codSecc = codSecc ? `'${codSecc}'` : null;
    esPEGCx = esPEGCx ? `'${esPEGCx}'` : null;
    facturacion = facturacion ? `'${facturacion}'` : null;
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_LISTADOPEGREFAC"('${codPais}', '${campania}', '${codRegi}', '${codZona}', ${codSecc}, ${esPEGCx}, ${facturacion})`;
    let params = [];
    */
    return db.execute("GetListPegRefac", statement, params);
  }

  async GetListPosiblesConsecutivasRefac(codPais, campania, codRegi, codZona, codSecc, ordenamiento) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTENER_LISTADOPOSIBLESCONSECUTIVASREFAC""         ('{0}','{1}','{2}','{3}','{4}', '{5}')", codPais, campania, codRegi, codZona, codSecc, ordenamiento);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_LISTADOPOSIBLESCONSECUTIVASREFAC"(?,?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, codSecc, ordenamiento];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_LISTADOPOSIBLESCONSECUTIVASREFAC"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${codSecc}', '${ordenamiento}')`;
    //let params = [];
    return db.execute("GetListPosiblesConsecutivasRefac", statement, params);
  }

  async GetListSaldoPendiente(codPais, campania, codRegi, codZona, codSecc) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTENER_LISTADOSALDOPENDIENTE""          ('{0}','{1}','{2}','{3}','{4}')", codPais, campania, codRegi, codZona, codSecc);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_LISTADOSALDOPENDIENTE"(?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, codSecc];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_LISTADOSALDOPENDIENTE"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${codSecc}')`;
    //let params = [];
    return db.execute("GetListSaldoPendiente", statement, params);
  }

  async GetListVentaNetaCube(
    campaniaCX3,
    campaniaCX2,
    campaniaCX5,
    campaniaCX4,
    campaniaCX1,
    tipoSol,
    campaniaCX,
    tipo,
    campaniaCX6,
    codPais,
    tipoClasif,
    campania,
    codZona,
    montoMin,
    codSecc,
    numCampanias
  ) {
    /*
    cmd = string.Format(@" SELECT ""ISOPAIS"", {11},
    ""NombreCompleto"" AS ""NOMBRECOMPLETO"",
    ""COD_CLIE"" AS ""CODIGOCONSULTORA"",
    ""COD_REGI"" AS ""REGION"",
    ""COD_ZONA"" AS ""ZONA"",
    ""COD_SECC"" AS ""SECCION"",
    ""COD_TERR"" AS ""TERRITORIO"",
    ""TELEFONOCASA"",
    ""TELEFONOCELULAR"",
    ""CONSTANCIA"",
    ""NIVEL"",
    sum(""SALDOPENDIENTE"") AS ""SALDOPENDIENTE"",
    ""VENTAGANANCIA"",
    ""PROMVENTACONSULTORA"",
    sum(""VENTACONSULTORA"") AS ""VENTACONSULTORA"",
    ""NUM_DOCU_IDEN"" AS ""DOCUMENTODEIDENTIDAD"",
    ""Direccion"" AS ""DIRECCION"",
    ""EMAIL"",
    ""FEC_NACI"" AS ""CUMPLEANIOS"" ,
    ""CAMP_ING"" AS ""CAMPANIAINGRESO"",
    ""ULT_FACT"" AS ""ULTIMAFACTURACION"",
    ""VAL_ORIG"" AS ""ORIGENPEDIDO"",
    ""FAMILIAPROTEGIDA"",
    ""USAFLEXIPAGO"",
    ""ESBRILLANTE"",
    sum(""VtaCatalogoCX"") AS ""VtaCatalogoCX"",
    sum(""VtaCatalogoCX_1"") AS ""VtaCatalogoCX_1"",
    sum(""VtaCatalogoCX_2"") AS ""VtaCatalogoCX_2"",
    sum(""VtaCatalogoCX_3"") AS ""VtaCatalogoCX_3"",
    sum(""VtaCatalogoCX_4"") AS ""VtaCatalogoCX_4"",
    sum(""VtaCatalogoCX_5"") AS ""VtaCatalogoCX_5"",
    sum(""VtaCatalogoCX_6"") AS ""VtaCatalogoCX_6"",
    sum(""flagAV"") AS ""flagAV"",
    sum(""flagAV_1"") AS ""flagAV_1"",
    sum(""flagAV_2"") AS ""flagAV_2"",
    sum(""flagAV_3"") AS ""flagAV_3"",
    sum(""flagAV_4"") AS ""flagAV_4"",
    sum(""flagAV_5"") AS ""flagAV_5"",
    sum(""flagAV_6"") AS ""flagAV_6"",
    ""VisibilidadVtaCx"",
    ""VisibilidadVtaCxMenos1"",
    ""VisibilidadVtaCxMenos2"",
    ""VisibilidadVtaCxMenos3"",
    ""VisibilidadVtaCxMenos4"",
    ""VisibilidadVtaCxMenos5"",
    ""VisibilidadVtaCxMenos6"",
    ""VAL_NOM1"",
    ""VAL_NOM2"",
    ""VAL_APE1"",
    ""VAL_APE2"",
        ""SEGMENTOORDEN"",
    ""RANGO"",
    ""TOTALTOVALOR"",
    sum(""VtaCatalogoCX"") AS ""MONTOULTIMOPEDIDO"",
    ""VAL_MONT_SOLI"" AS ""MONTOPEDIDOSOLICITADO"",
    ""MOT_RECH"" AS ""MOTIVORECHAZO"",
    max(""FEC_ULTI_ACTU"")
    FROM  ""_SYS_BIC"".""belcorp.ods.corp.modelos/CV_SOA_INFOR_PED_CUBE""
        (PLACEHOLDER = ('$$l_campaniaCX3$$', '{0}'), PLACEHOLDER = ('$$l_campaniaCX2$$', '{1}'), PLACEHOLDER = ('$$l_campaniaCX5$$', '{2}'), PLACEHOLDER = ('$$l_campaniaCX4$$', '{3}'), PLACEHOLDER = ('$$l_campaniaCX1$$', '{4}'), PLACEHOLDER = ('$$l_oidtiposol$$', '{5}'), PLACEHOLDER = ('$$l_campaniaCX$$', '{6}'), PLACEHOLDER = ('$$p_tipo$$', '{7}'), PLACEHOLDER = ('$$l_campaniaCX6$$', '{8}'), PLACEHOLDER = ('$$p_isopais$$', '{9}'), PLACEHOLDER = ('$$l_oidtipoclasi$$', '{10}'), PLACEHOLDER = ('$$p_campania$$', '{11}'), PLACEHOLDER = ('$$p_codzona$$', '{12}'), PLACEHOLDER = ('$$l_montomin$$', '{13}'), PLACEHOLDER = ('$$p_codSecc$$', '{14}'), PLACEHOLDER = ('$$lv_numcamppais$$', '{15}'))
    GROUP BY ""NombreCompleto"",""COD_CLIE"",""Direccion"",""ISOPAIS"",""VAL_APE2"",""VAL_APE1"",""VAL_NOM1"",""VAL_NOM2"",""SAL_DEUD_ANTE"",""VAL_RECL_PEND"",""FEC_NACI"",""ULT_FACT"",""NUM_DOCU_IDEN"",""TELEFONOCASA"",""TELEFONOCELULAR"",""EMAIL"",""VAL_ORIG"",""COD_REGI"",""COD_TERR"",""COD_ZONA"",""COD_SECC"",""CONSTANCIA"",""PROMVENTACONSULTORA"",""FAMILIAPROTEGIDA"",""USAFLEXIPAGO"",""CAMP_ING"",""VisibilidadVtaCx"",""VisibilidadVtaCxMenos1"",""VisibilidadVtaCxMenos2"",""VisibilidadVtaCxMenos3"",""VisibilidadVtaCxMenos4"",""VisibilidadVtaCxMenos5"",""VisibilidadVtaCxMenos6"",""RANGO"",""NIVEL"",""VAL_MONT_SOLI"",""SEGMENTOORDEN"",""TOTALTOVALOR"",""MOT_RECH"",""VENTAGANANCIA"",""ESBRILLANTE""",
    campaniaCX3, campaniaCX2, campaniaCX5, campaniaCX4, campaniaCX1, tipoSol, campaniaCX, tipo, campaniaCX6, codPais, tipoClasif, campania, codZona, montoMin, codSecc, numCampanias);
    */
    let statement = `SELECT ISOPAIS, '${campania}',
      NombreCompleto AS NOMBRECOMPLETO,
      COD_CLIE AS CODIGOCONSULTORA,
      COD_REGI AS REGION,
      COD_ZONA AS ZONA,
      COD_SECC AS SECCION,
      COD_TERR AS TERRITORIO,
      TELEFONOCASA,
      TELEFONOCELULAR,
      CONSTANCIA,
      NIVEL,
      SUM(SALDOPENDIENTE) AS SALDOPENDIENTE,
      VENTAGANANCIA,
      PROMVENTACONSULTORA,
      SUM(VENTACONSULTORA) AS VENTACONSULTORA,
      NUM_DOCU_IDEN AS DOCUMENTODEIDENTIDAD,
      Direccion AS DIRECCION,
      EMAIL,
      FEC_NACI AS CUMPLEANIOS ,
      CAMP_ING AS CAMPANIAINGRESO,
      ULT_FACT AS ULTIMAFACTURACION,
      VAL_ORIG AS ORIGENPEDIDO,
      FAMILIAPROTEGIDA,
      USAFLEXIPAGO,
      ESBRILLANTE,
      SUM(VtaCatalogoCX) AS VtaCatalogoCX,
      SUM(VtaCatalogoCX_1) AS VtaCatalogoCX_1,
      SUM(VtaCatalogoCX_2) AS VtaCatalogoCX_2,
      SUM(VtaCatalogoCX_3) AS VtaCatalogoCX_3,
      SUM(VtaCatalogoCX_4) AS VtaCatalogoCX_4,
      SUM(VtaCatalogoCX_5) AS VtaCatalogoCX_5,
      SUM(VtaCatalogoCX_6) AS VtaCatalogoCX_6,
      SUM(flagAV) AS flagAV,
      SUM(flagAV_1) AS flagAV_1,
      SUM(flagAV_2) AS flagAV_2,
      SUM(flagAV_3) AS flagAV_3,
      SUM(flagAV_4) AS flagAV_4,
      SUM(flagAV_5) AS flagAV_5,
      SUM(flagAV_6) AS flagAV_6,
      VisibilidadVtaCx,
      VisibilidadVtaCxMenos1,
      VisibilidadVtaCxMenos2,
      VisibilidadVtaCxMenos3,
      VisibilidadVtaCxMenos4,
      VisibilidadVtaCxMenos5,
      VisibilidadVtaCxMenos6,
      VAL_NOM1,
      VAL_NOM2,
      VAL_APE1,
      VAL_APE2,
      SEGMENTOORDEN,
      RANGO,
      TOTALTOVALOR,
      SUM(VtaCatalogoCX) AS MONTOULTIMOPEDIDO,
      VAL_MONT_SOLI AS MONTOPEDIDOSOLICITADO,
      MOT_RECH AS MOTIVORECHAZO,
      MAX(FEC_ULTI_ACTU)
      FROM "_SYS_BIC"."belcorp.ods.corp.modelos/CV_SOA_INFOR_PED_CUBE"
       (PLACEHOLDER = ('$$l_campaniaCX3$$', '${campaniaCX3}'),
       PLACEHOLDER = ('$$l_campaniaCX2$$', '${campaniaCX2}'),
       PLACEHOLDER = ('$$l_campaniaCX5$$', '${campaniaCX5}'),
       PLACEHOLDER = ('$$l_campaniaCX4$$', '${campaniaCX4}'),
       PLACEHOLDER = ('$$l_campaniaCX1$$', '${campaniaCX1}'),
       PLACEHOLDER = ('$$l_oidtiposol$$', '${tipoSol}'),
       PLACEHOLDER = ('$$l_campaniaCX$$', '${campaniaCX}'),
       PLACEHOLDER = ('$$p_tipo$$', '${tipo}'),
       PLACEHOLDER = ('$$l_campaniaCX6$$', '${campaniaCX6}'),
       PLACEHOLDER = ('$$p_isopais$$', '${codPais}'),
       PLACEHOLDER = ('$$l_oidtipoclasi$$', '${tipoClasif}'),
       PLACEHOLDER = ('$$p_campania$$', '${campania}'),
       PLACEHOLDER = ('$$p_codzona$$', '${codZona}'),
       PLACEHOLDER = ('$$l_montomin$$', '${montoMin}'),
       PLACEHOLDER = ('$$p_codSecc$$', '${codSecc}'),
       PLACEHOLDER = ('$$lv_numcamppais$$', '${numCampanias}'))
      GROUP BY NombreCompleto, COD_CLIE, Direccion, ISOPAIS,
      VAL_APE2, VAL_APE1, VAL_NOM1, VAL_NOM2, SAL_DEUD_ANTE, VAL_RECL_PEND,
      FEC_NACI, ULT_FACT, NUM_DOCU_IDEN, TELEFONOCASA, TELEFONOCELULAR, EMAIL,
      VAL_ORIG, COD_REGI, COD_TERR, COD_ZONA, COD_SECC, CONSTANCIA,
      PROMVENTACONSULTORA, FAMILIAPROTEGIDA, USAFLEXIPAGO, CAMP_ING,
      VisibilidadVtaCx, VisibilidadVtaCxMenos1, VisibilidadVtaCxMenos2, VisibilidadVtaCxMenos3, VisibilidadVtaCxMenos4, VisibilidadVtaCxMenos5, VisibilidadVtaCxMenos6,
      RANGO, NIVEL, VAL_MONT_SOLI, SEGMENTOORDEN, TOTALTOVALOR, MOT_RECH, VENTAGANANCIA, ESBRILLANTE`;
    let params = [];
    /*
    let params = [
      campania,
      campaniaCX3,
      campaniaCX2,
      campaniaCX5,
      campaniaCX4,
      campaniaCX1,
      tipoSol,
      campaniaCX,
      tipo,
      campaniaCX6,
      codPais,
      tipoClasif,
      campania,
      codZona,
      montoMin,
      codSecc,
      numCampanias
    ];
    */
    return db.execute("GetListVentaNetaCube", statement, params);
  }

  async GetPais(codPais) {
    //cmd_tmp = string.Format(@"select ""_SYS_BIC"".""belcorp.ods.corp.funciones::CCC_FN_OBTIE_PARAM_GENER""('{0}', 'CodigoPais')         from dummy", codPais);
    let statement = `SELECT "_SYS_BIC"."belcorp.ods.corp.funciones::CCC_FN_OBTIE_PARAM_GENER"(?, 'CodigoPais') as CODIGOPAIS FROM dummy`;
    let params = [codPais];
    //let statement = `SELECT "_SYS_BIC"."belcorp.ods.corp.funciones::CCC_FN_OBTIE_PARAM_GENER"('${codPais}', 'CodigoPais') as CODIGOPAIS FROM dummy`;
    //let params = [];
    return db.execute("GetPais", statement, params);
  }

  async GetPeriodoSiguiente(codPais, codigoPais, campania, type) {
    //cmd_tmp = string.Format(@"select ""_SYS_BIC"".""belcorp.ods.corp.funciones::GEN_FN_PERIO_NSIGU""('{0}','{1}','{2}', -1)         from dummy", codPais, codigoPais, campania);
    let statement = `SELECT "_SYS_BIC"."belcorp.ods.corp.funciones::GEN_FN_PERIO_NSIGU"(?,?,?,?) as CAMPANIA FROM dummy`;
    let params = [codPais, codigoPais, campania, type];
    //let statement = `SELECT "_SYS_BIC"."belcorp.ods.corp.funciones::GEN_FN_PERIO_NSIGU"('${codPais}', '${codigoPais}', '${campania}', '${type}') as CAMPANIA FROM dummy`;
    //let params = [];
    return db.execute("GetPeriodoSiguiente", statement, params);
  }

  async GetMontoMinimo(codPais) {
    //cmd_tmp = string.Format(@"select ifnull(max(val_mont_mini), 0) from sicc_corp.lec_progr_nivel_rango where isopais = '{0}'", codPais);
    let statement = `SELECT ifnull(max(val_mont_mini), 0) as MONTOMINIMO FROM sicc_corp.lec_progr_nivel_rango WHERE isopais = ?`;
    let params = [codPais];
    //let statement = `SELECT ifnull(max(val_mont_mini), 0) as MONTOMINIMO FROM sicc_corp.lec_progr_nivel_rango WHERE isopais = '${codPais}'`;
    //let params = [];
    return db.execute("GetMontoMinimo", statement, params);
  }

  async GetTipoSolicitud(codPais) {
    //cmd_tmp = string.Format(@"select tsp.oid_tipo_soli_pais from sicc_corp.ped_tipo_solic_pais tsp, sicc_corp.ped_tipo_solic ts where tsp.tsol_oid_tipo_soli = ts.oid_tipo_soli and tsp.isopais = ts.isopais and tsp.isopais = '{0}' and cod_tipo_soli= 'SOC'", codPais);
    let statement = `SELECT tsp.oid_tipo_soli_pais as TIPOSOLICITUD from sicc_corp.ped_tipo_solic_pais tsp, sicc_corp.ped_tipo_solic ts where tsp.tsol_oid_tipo_soli = ts.oid_tipo_soli and tsp.isopais = ts.isopais and tsp.isopais = ? and cod_tipo_soli= 'SOC'`;
    let params = [codPais];
    //let statement = `SELECT tsp.oid_tipo_soli_pais as TIPOSOLICITUD from sicc_corp.ped_tipo_solic_pais tsp, sicc_corp.ped_tipo_solic ts where tsp.tsol_oid_tipo_soli = ts.oid_tipo_soli and tsp.isopais = ts.isopais and tsp.isopais = '${codPais}' and cod_tipo_soli= 'SOC'`;
    //let params = [];
    return db.execute("GetTipoSolicitud", statement, params);
  }

  async GetTipoClasificacion(codPais, codigoPais) {
    //cmd_tmp = string.Format(@"select ifnull(to_number(x.val_pain), 0) from sicc_corp.bas_param_inter x where x.sist_cod_sist like '%IVR%' and x.isopais = '{0}' and x.pais_cod_pais = '{1}' and x.sist_cod_sist = 'IVR' and x.inte_cod_inte = 'IVR-41' and x.nom_pain = 'tipoClasificacionTop'", codPais, codigoPais);
    let statement = `SELECT ifnull(to_number(x.val_pain), 0) as TIPOCLASIFICACION FROM sicc_corp.bas_param_inter x WHERE x.sist_cod_sist like '%IVR%' and x.isopais = ? and x.pais_cod_pais = ? and x.sist_cod_sist = 'IVR' and x.inte_cod_inte = 'IVR-41' and x.nom_pain = 'tipoClasificacionTop'`;
    let params = [codPais, codigoPais];
    //let statement = `SELECT ifnull(to_number(x.val_pain), 0) as TIPOCLASIFICACION FROM sicc_corp.bas_param_inter x WHERE x.sist_cod_sist like '%IVR%' and x.isopais = '${codPais}' and x.pais_cod_pais = '${codigoPais}' and x.sist_cod_sist = 'IVR' and x.inte_cod_inte = 'IVR-41' and x.nom_pain = 'tipoClasificacionTop'`;
    //let params = [];
    return db.execute("GetTipoClasificacion", statement, params);
  }

  async GetNumeroCampanias(codPais, codigoPais) {
    //cmd_tmp = string.Format(@"select ""_SYS_BIC"".""belcorp.ods.corp.funciones::GEN_FN_PARAM_PAIS""('{0}', '{1}', 'GEN', '000') from dummy", codPais, codigoPais);
    let statement = `SELECT "_SYS_BIC"."belcorp.ods.corp.funciones::GEN_FN_PARAM_PAIS"(?, ?, 'GEN', '000') as NUMEROCAMPANIAS FROM dummy`;
    let params = [codPais, codigoPais];
    //let statement = `SELECT "_SYS_BIC"."belcorp.ods.corp.funciones::GEN_FN_PARAM_PAIS"('${codPais}', '${codigoPais}', 'GEN', '000') as NUMEROCAMPANIAS FROM dummy`;
    //let params = [];
    return db.execute("GetNumeroCampanias", statement, params);
  }

  async GetListVentaNeta(codPais, campania, codZona, codSecc, tipo, facturacion) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTENER_LISTADOVENTANETA""         ('{0}','{1}','{2}','{3}','{4}','{5}')", codPais, campania, codZona, codSecc, tipo, facturacion);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_LISTADOVENTANETA"(?,?,?,?,?,?)`;
    let params = [codPais, campania, codZona, codSecc, tipo, facturacion];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_LISTADOVENTANETA"('${codPais}', '${campania}', '${codZona}', '${codSecc}', '${tipo}', '${facturacion}')`;
    //let params = [];
    return db.execute("GetListVentaNeta", statement, params);
  }

  async GetListVentaNetaTest(codPais, campania, codZona, codSecc, tipo) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTENER_LISTADOVENTANETA_dev1""         ('{0}','{1}','{2}','{3}','{4}')", codPais, campania, codZona, codSecc, tipo);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_LISTADOVENTANETA_dev1" (?,?,?,?,?)`;
    let params = [codPais, campania, codZona, codSecc, tipo];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTENER_LISTADOVENTANETA_dev1" ('${codPais}', '${campania}', '${codZona}', '${codSecc}', '${tipo}')`;
    //let params = [];
    return db.execute("GetListVentaNetaTest", statement, params);
  }

  async GetRegionZonaSeccionActividad(codPais, campania, codRegi, codZona, tipo) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTIENE_REGIONZONASECCIONACTIVIDAD""          ('{0}','{1}','{2}','{3}','{4}')", codPais, campania, codRegi, codZona, tipo);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIENE_REGIONZONASECCIONACTIVIDAD"(?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, tipo];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIENE_REGIONZONASECCIONACTIVIDAD"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${tipo}')`;
    //let params = [];
    return db.execute("GetRegionZonaSeccionActividad", statement, params);
  }

  async GetRegionZonaSeccionCapitalizacion(codPais, campania, codRegi, codZona, tipo) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTIENE_REGIONZONASECCIONCAPITALIZACION""         ('{0}','{1}','{2}','{3}','{4}')", codPais, campania, codRegi, codZona, tipo);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIENE_REGIONZONASECCIONCAPITALIZACION"(?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, tipo];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIENE_REGIONZONASECCIONCAPITALIZACION"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${tipo}')`;
    //let params = [];
    return db.execute("GetRegionZonaSeccionCapitalizacion", statement, params);
  }

  async GetRegionZonaSeccionCicloNuevas(codPais, campania, codRegi, codZona, facturacion) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTIENE_REGIONZONASECCIONCICLONUEVAS""          ('{0}','{1}','{2}','{3}','{4}')", codPais, campania, codRegi, codZona, facturacion);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIENE_REGIONZONASECCIONCICLONUEVAS"(?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, facturacion];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIENE_REGIONZONASECCIONCICLONUEVAS"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${facturacion}')`;
    //let params = [];
    return db.execute("GetRegionZonaSeccionCicloNuevas", statement, params);
  }

  async GetRegionZonaSeccionCobranza(codPais, campania, codRegi, codZona) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTIENE_REGIONZONASECCIONCOBRANZA""         ('{0}','{1}','{2}','{3}')", codPais, campania, codRegi, codZona);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIENE_REGIONZONASECCIONCOBRANZA"(?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIENE_REGIONZONASECCIONCOBRANZA"('${codPais}', '${campania}', '${codRegi}', '${codZona}')`;
    //let params = [];
    return db.execute("GetRegionZonaSeccionCobranza", statement, params);
  }

  async GetRegionZonaSeccionPedido(codPais, campania, codRegi, codZona, tipo) {
    //cmd = string.Format(@"CALL ""SICC_CORP"" . ""belcorp.ods.corp.modelos::SP_OBTIENE_REGIONZONASECCIONPEDIDO""         ('{0}','{1}','{2}','{3}','{4}')", codPais, campania, codRegi, codZona, tipo);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIENE_REGIONZONASECCIONPEDIDO"(?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, tipo];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIENE_REGIONZONASECCIONPEDIDO"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${tipo}')`;
    //let params = [];
    return db.execute("GetRegionZonaSeccionPedido", statement, params);
  }

  async GetRegionZonaSeccionPosiblesConsecutivas(codPais, campania, codRegi, codZona, facturacion) {
    //cmd = string.Format(@"CALL ""SICC_CORP"".""belcorp.ods.corp.modelos::SP_OBTIENE_REGIONZONASECCIONPOSIBLESCONSECUTIVAS""         ('{0}','{1}','{2}','{3}','{4}')", codPais, campania, CodRegi, codZona, facturacion);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIENE_REGIONZONASECCIONPOSIBLESCONSECUTIVAS"(?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, facturacion];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIENE_REGIONZONASECCIONPOSIBLESCONSECUTIVAS"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${facturacion}')`;
    //let params = [];
    return db.execute("GetRegionZonaSeccionPosiblesConsecutivas", statement, params);
  }

  async GetRegionZonaSeccionVenta(codPais, campania, codRegi, codZona, facturacion) {
    //cmd = string.Format(@"CALL ""SICC_CORP"".""belcorp.ods.corp.modelos::SP_OBTIENE_REGIONZONASECCIONVENTA""         ('{0}','{1}','{2}','{3}','{4}')", codPais, campania, CodRegi, codZona, facturacion);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIENE_REGIONZONASECCIONVENTA"(?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, facturacion];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIENE_REGIONZONASECCIONVENTA"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${facturacion}')`;
    //let params = [];
    return db.execute("GetRegionZonaSeccionVenta", statement, params);
  }

  async GetRegiZonaSeccPeg(codPais, campania, codRegi, codZona, facturacion) {
    //cmd = string.Format(@"CALL ""SICC_CORP"".""belcorp.ods.corp.modelos::SP_OBTIENE_REGIONZONASECCIONPEG""         ('{0}','{1}','{2}','{3}','{4}')", codPais, campania, CodRegi, codZona, facturacion);
    let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIENE_REGIONZONASECCIONPEG"(?,?,?,?,?)`;
    let params = [codPais, campania, codRegi, codZona, facturacion];
    //let statement = `CALL "SICC_CORP"."belcorp.ods.corp.modelos::SP_OBTIENE_REGIONZONASECCIONPEG"('${codPais}', '${campania}', '${codRegi}', '${codZona}', '${facturacion}')`;
    //let params = [];
    return db.execute("GetRegiZonaSeccPeg", statement, params);
  }

  async GetSaldoPendiente(codPais, codRegi, codZona, codSecc, campania, tipo) {
    //cmd = string.Format(@"SELECT ""_SYS_BIC"" . ""belcorp.ods.corp.funciones::OBTIE_INDICADOR_SALDO_PDTE""         ('{0}','{1}','{2}','{3}','{4}','{5}') FROM dummy", codPais, codRegi, codZona, codSecc, campania, tipo);
    let statement = `SELECT "_SYS_BIC"."belcorp.ods.corp.funciones::OBTIE_INDICADOR_SALDO_PDTE"(?,?,?,?,?,?) AS TOTALPENDIENTE FROM dummy`;
    let params = [codPais, codRegi, codZona, codSecc, campania, tipo];
    //let statement = `SELECT "_SYS_BIC"."belcorp.ods.corp.funciones::OBTIE_INDICADOR_SALDO_PDTE"('${codPais}', '${codRegi}', '${codZona}', '${codSecc}', '${campania}', '${tipo}') AS TOTALPENDIENTE FROM dummy`;
    //let params = [];
    return db.execute("GetSaldoPendiente", statement, params);
  }

  async GetSeccionZona(codPais, codRegi, codZona) {
    //cmd = string.Format(@"SELECT ZONAID,CODIGO,DESCRIPCION,SOCIAEMPRESARIA     FROM  ""_SYS_BIC"" . ""belcorp.ods.corp.modelos/CV_OBTIENE_SECCION_ZONA""(PLACEHOLDER = ('$$p_codregi$$','{0}'),PLACEHOLDER = ('$$p_codpais$$','{1}'),PLACEHOLDER = ('$$p_codzona$$','{2}'))", codRegi, codPais, codZona);
    let statement = `SELECT ZONAID, CODIGO, DESCRIPCION, SOCIAEMPRESARIA
      FROM "_SYS_BIC"."belcorp.ods.corp.modelos/CV_OBTIENE_SECCION_ZONA"
      (PLACEHOLDER = ('$$p_codregi$$', '${codRegi}'),
      PLACEHOLDER = ('$$p_codpais$$', '${codPais}'),
      PLACEHOLDER = ('$$p_codzona$$', '${codZona}'))`;
    let params = [];
    //let params = [codRegi, codPais, codZona];
    return db.execute("GetSeccionZona", statement, params);
  }

  async GetZonaRegion(codPais, codRegi) {
    //cmd = string.Format(@"SELECT ZONAID,CODIGO,DESCRIPCION,GERENTEZONA,GZEMAIL         FROM  ""_SYS_BIC"" . ""belcorp.ods.corp.modelos/CV_OBTIENE_ZONA_REGION""(PLACEHOLDER = ('$$p_codregi$$','{0}'),PLACEHOLDER = ('$$p_codpais$$','{1}'))", codRegi, codPais);
    let statement = `SELECT ZONAID, CODIGO, DESCRIPCION, GERENTEZONA, GZEMAIL
      FROM "_SYS_BIC"."belcorp.ods.corp.modelos/CV_OBTIENE_ZONA_REGION"
      (PLACEHOLDER = ('$$p_codregi$$', '${codRegi}'),
      PLACEHOLDER = ('$$p_codpais$$', '${codPais}'))`;
    let params = [];
    //let params = [codRegi, codPais];
    return db.execute("GetZonaRegion", statement, params);
  }

  async ValidateZonaRegion(codPais, codRegi, codZona) {
    //cmd = string.Format(@"SELECT REGIONID,CODIGOREGION,ZONAID,CODIGO,DESCRIPCION,GERENTEZONA,GZEMAIL          FROM  ""_SYS_BIC"" . ""belcorp.ods.corp.modelos/CV_VALIDA_ZONA_REGION""(PLACEHOLDER = ('$$p_codregi$$','{0}'),PLACEHOLDER = ('$$p_codpais$$','{1}'),PLACEHOLDER = ('$$p_codzona$$','{2}'))         ", codRegi, codPais, codZona);
    let statement = `SELECT REGIONID, CODIGOREGION, ZONAID, CODIGO, DESCRIPCION, GERENTEZONA, GZEMAIL
      FROM "_SYS_BIC"."belcorp.ods.corp.modelos/CV_VALIDA_ZONA_REGION"
      (PLACEHOLDER = ('$$p_codregi$$', '${codRegi}'),
      PLACEHOLDER = ('$$p_codpais$$', '${codPais}'),
      PLACEHOLDER = ('$$p_codzona$$', '${codZona}'))`;
    let params = [];
    //let params = [codRegi, codPais, codZona];
    return db.execute("ValidateZonaRegion", statement, params);
  }

  async GetCantListActividadRefacStatement(codPais, campania, codRegi, codZona, codSecc, facturacion) {
    /*
    let statement = `SELECT ? as ISOPAIS,
              ? as CAMPANIA,
              count(*) TOTALCONSULTORAS
        FROM SICC_CORP.mae_clien mae,
        SICC_CORP.mae_clien_prime_conta mpc,
        SICC_CORP.mae_clien_datos_adici mad,
        SICC_CORP.mae_clien_unida_admin c,
        SICC_CORP.zon_terri_admin dd,
        SICC_CORP.zon_terri e,
        SICC_CORP.zon_secci f,
        SICC_CORP.zon_zona g,
        SICC_CORP.zon_regio h
      wHERE mae.oid_clie=mpc.clie_oid_clie and mae.isopais = mpc.isopais
        and mae.isopais = ?
        and mae.oid_clie=c.clie_oid_clie and mae.isopais = c.isopais
        and mae.oid_clie = mad.clie_oid_clie and mae.isopais = mad.isopais
        and C.ZTAD_OID_TERR_ADMI=Dd.OID_TERR_ADMI and c.isopais = dd.isopais
        and Dd.TERR_OID_TERR=E.OID_TERR and dd.isopais = e.isopais
        and Dd.ZSCC_OID_SECC=F.OID_SECC and dd.isopais = f.isopais
        and F.ZZON_OID_ZONA=G.OID_ZONA and f.isopais = g.isopais
        and G.ZORG_OID_REGI=H.OID_REGI and g.isopais = h.isopais
        and C.PERD_OID_PERI_FIN is null
        and ( ? is NULL or ( h.cod_regi = ? ) )
        and ( ? is NULL or ( g.cod_zona = ? ) )
        and ( ? is NULL or ( f.cod_secc = ? ) )
        and mad.esta_oid_esta_clie in (2,3,4,6,8);`;
    let params = [codPais, campania, codPais, codRegi, codRegi, codZona, codZona, codSecc, codSecc, facturacion];
    */
    let statement = `SELECT '${codPais}' as ISOPAIS,
      '${campania}' as CAMPANIA,
      count(*) TOTALCONSULTORAS
      FROM SICC_CORP.mae_clien mae,
      SICC_CORP.mae_clien_prime_conta mpc,
      SICC_CORP.mae_clien_datos_adici mad,
      SICC_CORP.mae_clien_unida_admin c,
      SICC_CORP.zon_terri_admin dd,
      SICC_CORP.zon_terri e,
      SICC_CORP.zon_secci f,
      SICC_CORP.zon_zona g,
      SICC_CORP.zon_regio h
      wHERE mae.oid_clie=mpc.clie_oid_clie and mae.isopais = mpc.isopais
      and mae.isopais = '${codPais}'
      and mae.oid_clie=c.clie_oid_clie and mae.isopais = c.isopais
      and mae.oid_clie = mad.clie_oid_clie and mae.isopais = mad.isopais
      and C.ZTAD_OID_TERR_ADMI=Dd.OID_TERR_ADMI and c.isopais = dd.isopais
      and Dd.TERR_OID_TERR=E.OID_TERR and dd.isopais = e.isopais
      and Dd.ZSCC_OID_SECC=F.OID_SECC and dd.isopais = f.isopais
      and F.ZZON_OID_ZONA=G.OID_ZONA and f.isopais = g.isopais
      and G.ZORG_OID_REGI=H.OID_REGI and g.isopais = h.isopais
      and C.PERD_OID_PERI_FIN is null
      and ( '${codRegi}' is NULL or ( h.cod_regi = '${codRegi}' ) )
      and ( '${codZona}' is NULL or ( g.cod_zona = '${codZona}' ) )
      and ( '${codSecc}' is NULL or ( f.cod_secc = '${codSecc}' ) )
      and mad.esta_oid_esta_clie in (2,3,4,6,8);`;
    let params = [facturacion];
    return db.execute("GetCantListActividadRefacStatement", statement, params);
  }
}
