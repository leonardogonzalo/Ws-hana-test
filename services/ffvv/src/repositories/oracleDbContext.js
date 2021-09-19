import oracle from "oracledb";
import db from "./dbConnection/oracleDbConnection";

export default class OracleDbContext {
  async GetRegionZonaSeccionPedido(codPais, campania, codRegi, codZona, tipo) {
    let statement = `SELECT * FROM TABLE(${db.schema(
      codPais
    )}.soa_pkg_proce.soa_fn_obtie_reg_zon_sec_pedi(:psCampana, :psCodRegi, :psCodZona, :psFactura))`;
    return db.execute("GetRegionZonaSeccionPedido", codPais, statement, [campania, codRegi, codZona, tipo]);
  }

  async GetEstadoConsultora(codPais) {
    let statement = `
      SELECT gen.val_oid IdEstadoActividad,(select pais_oid_pais from cra_perio where rownum = 1) PaisID,
      lpad(gen.val_oid,2,'0') CodigoEstadoActividad,GEN.VAL_I18N Descripcion,1 EstadoActivo
      FROM gen_i18n_sicc_comun gen WHERE gen.attr_enti = 'MAE_ESTAT_CLIEN' and GEN.IDIO_OID_IDIO = 1`;
    let params = [];
    return db.execute("GetEstadoConsultora", codPais, statement, params);
  }

  async GetSeccionZona(codPais, codRegi, codZona) {
    let statement = `
      SELECT zsec.oid_Secc SeccionID, zsec.cod_secc Codigo, zsec.des_secci descripcion,
      clie.val_nom1 || decode( clie.val_nom1,NULL,NULL,' ' ) || clie.val_nom2 || decode( clie.val_nom1,NULL,NULL,' ' ) ||
      clie.val_ape1 || decode( clie.val_nom1,NULL,NULL,' ' ) || clie.val_ape2 SociaEmpresaria
      FROM zon_zona zzon, zon_regio zorg, zon_secci zsec, mae_clien clie
      WHERE zzon.zorg_oid_regi = zorg.oid_regi AND ZZON.OID_ZONA = ZSEC.ZZON_OID_ZONA(+)
      AND ZSEC.CLIE_OID_CLIE = clie.oid_clie(+) and ZZON.IND_ACTI = 1 and ZORG.IND_ACTI = 1
      and ZSEC.IND_ACTI = 1 and zorg.cod_regi = ? and zzon.cod_zona = ?
      ORDER BY zsec.des_secci `;
    let params = [codRegi, codZona];
    return db.execute("GetSeccionZona", codPais, statement, params);
  }

  async GetCantGananciaYSaldoRefac(codPais, campania, codRegi, codZona, codSecc) {
    let statement = `BEGIN ${db.schema(
      codPais
    )}.soa_pkg_proce.soa_pr_obten_count_ganan_saldo(:inCampania, :inCodRegion, :inCodZona, :inCodSeccion, :ISOPAIS, :CAMPANIA, :CANTIDADPOSIBLES); END;`;
    let params = {
      inCampania: campania,
      inCodRegion: codRegi,
      inCodZona: codZona,
      inCodSeccion: codSecc,
      ISOPAIS: { dir: oracle.BIND_OUT },
      CAMPANIA: { dir: oracle.BIND_OUT },
      CANTIDADPOSIBLES: { type: oracle.NUMBER, dir: oracle.BIND_OUT }
    };
    return db.execute("GetCantGananciaYSaldoRefac", codPais, statement, params);
  }

  async GetCantListActividadRefac(codPais, campania, codRegi, codZona, codSecc, facturacion) {
    let statement = `BEGIN ${db.schema(
      codPais
    )}.soa_pkg_proce.soa_pr_obten_count_lista_activ(:inCampania, :inCodRegion, :inCodZona, :inCodSeccion, :inFacturacion, :ISOPAIS, :CAMPANIA, :TOTALCONSULTORAS); END;`;
    let params = {
      inCampania: campania,
      inCodRegion: codRegi,
      inCodZona: codZona,
      inCodSeccion: codSecc,
      inFacturacion: facturacion,
      ISOPAIS: { dir: oracle.BIND_OUT },
      CAMPANIA: { dir: oracle.BIND_OUT },
      TOTALCONSULTORAS: { type: oracle.NUMBER, dir: oracle.BIND_OUT }
    };
    return db.execute("GetCantListActividadRefac", codPais, statement, params);
  }

  async GetCantListCicloNuevas(codPais, campania, codRegi, codZona, tipo) {
    let statement = `BEGIN ${db.schema(
      codPais
    )}.soa_pkg_proce.soa_pr_obten_count_lista_ciclo(:inCampania, :inCodRegion, :inCodZona, :inTipo, :ISOPAIS, :CAMPANIA, :TOTALCONSULTORAS); END;`;
    let params = {
      inCampania: campania,
      inCodRegion: codRegi,
      inCodZona: codZona,
      inTipo: tipo,
      ISOPAIS: { dir: oracle.BIND_OUT },
      CAMPANIA: { dir: oracle.BIND_OUT },
      TOTALCONSULTORAS: { type: oracle.NUMBER, dir: oracle.BIND_OUT }
    };
    return db.execute("GetCantListCicloNuevas", codPais, statement, params);
  }

  async GetCantListPedidosVentaRefac(codPais, campania, codRegi, codZona, codSecc, tipo, facturacion) {
    let statement = `BEGIN ${db.schema(
      codPais
    )}.soa_pkg_proce.soa_pr_obten_count_lista_pedve(:inCampania, :inCodRegion, :inCodZona, :inCodSeccion, :inTipo, :inFacturacion, :ISOPAIS, :CAMPANIA, :TOTALCONSULTORAS); END;`;
    let params = {
      inCampania: campania,
      inCodRegion: codRegi,
      inCodZona: codZona,
      inCodSeccion: codSecc,
      inTipo: tipo,
      inFacturacion: facturacion,
      ISOPAIS: { dir: oracle.BIND_OUT },
      CAMPANIA: { dir: oracle.BIND_OUT },
      TOTALCONSULTORAS: { type: oracle.NUMBER, dir: oracle.BIND_OUT }
    };
    return db.execute("GetCantListPedidosVentaRefac", codPais, statement, params);
  }

  async GetCountListPegRefac(codPais, campania, codRegi, codZona, facturacion) {
    let statement = `BEGIN ${db.schema(
      codPais
    )}.soa_pkg_proce.soa_pr_obten_count_lista_pegs(:inCampania, :inCodRegion, :inCodZona, :inFacturacion, :ISOPAIS, :CAMPANIA, :TOTALPOSIBLES); END;`;
    let params = {
      inCampania: campania,
      inCodRegion: codRegi,
      inCodZona: codZona,
      inFacturacion: facturacion,
      ISOPAIS: { dir: oracle.BIND_OUT },
      CAMPANIA: { dir: oracle.BIND_OUT },
      TOTALPOSIBLES: { type: oracle.NUMBER, dir: oracle.BIND_OUT }
    };
    return db.execute("GetCountListPegRefac", codPais, statement, params);
  }

  async GetCantListPosiblesConsecutivasRefac(codPais, campania, codRegi, codZona, codSecc) {
    let statement = `BEGIN ${db.schema(
      codPais
    )}.soa_pkg_proce.soa_pr_obten_count_lista_posco(:inCampania, :inCodRegion, :inCodZona, :inCodSecc, :ISOPAIS, :CAMPANIA, :TOTALPOSIBLES); END;`;
    let params = {
      inCampania: campania,
      inCodRegion: codRegi,
      inCodZona: codZona,
      inCodSecc: codSecc,
      ISOPAIS: { dir: oracle.BIND_OUT },
      CAMPANIA: { dir: oracle.BIND_OUT },
      TOTALPOSIBLES: { type: oracle.NUMBER, dir: oracle.BIND_OUT }
    };
    return db.execute("GetCantListPosiblesConsecutivasRefac", codPais, statement, params);
  }

  async GetCantSaldoPendienteRefac(codPais, campania, codRegi, codZona, codSecc) {
    let statement = `BEGIN ${db.schema(
      codPais
    )}.soa_pkg_proce.soa_pr_obten_count_saldo_pendi(:inCampania, :inCodRegion, :inCodZona, :inCodSecc, :ISOPAIS, :CAMPANIA, :TOTALPOSIBLES); END;`;
    let params = {
      inCampania: campania,
      inCodRegion: codRegi,
      inCodZona: codZona,
      inCodSecc: codSecc,
      ISOPAIS: { dir: oracle.BIND_OUT },
      CAMPANIA: { dir: oracle.BIND_OUT },
      TOTALPOSIBLES: { type: oracle.NUMBER, dir: oracle.BIND_OUT }
    };
    return db.execute("GetCantSaldoPendienteRefac", codPais, statement, params);
  }

  async GetIndicadorCicloNuevas(codPais, campania, codRegi, codZona, codSecc, tipo) {
    let statement = `BEGIN ${db.schema(
      codPais
    )}.soa_pkg_proce.soa_pr_obtie_indic_ciclo_nueva(:inCampania, :inCodRegion, :inCodZona, :inCodSecc, :inTipo, :ISOPAIS, :C2D2FDV, :C2D2REAL, :C3D3FDV, :C3D3REAL, :C4D4FDV, :C4D4REAL, :C5D5FDV, :C5D5REAL, :C6D6FDV, :C6D6REAL); END;`;
    let params = {
      inCampania: campania,
      inCodRegion: codRegi,
      inCodZona: codZona,
      inCodSecc: codSecc,
      inTipo: tipo,
      ISOPAIS: { dir: oracle.BIND_OUT },
      C2D2FDV: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      C2D2REAL: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      C3D3FDV: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      C3D3REAL: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      C4D4FDV: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      C4D4REAL: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      C5D5FDV: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      C5D5REAL: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      C6D6FDV: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      C6D6REAL: { type: oracle.NUMBER, dir: oracle.BIND_OUT }
    };
    return db.execute("GetIndicadorCicloNuevas", codPais, statement, params);
  }

  async GetGananciaSaldoRefac(codPais, campania, codRegi, codZona, codSecc) {
    let statement = `BEGIN ${db.schema(
      codPais
    )}.soa_pkg_proce.soa_pr_obtie_indic_ganan_saldo(:inCampania, :inCodRegion, :inCodZona, :inCodSecc, :ISOPAIS, :CAMPANIA, :FACTURADONETO, :PORCENTAJE, :GANANCIAPARCIAL, :PORCENTAJERECUPERACION, :GANANCIAPOTENCIAL, :MONEDA); END;`;
    let params = {
      inCampania: campania,
      inCodRegion: codRegi,
      inCodZona: codZona,
      inCodSecc: codSecc,
      ISOPAIS: { dir: oracle.BIND_OUT },
      CAMPANIA: { dir: oracle.BIND_OUT },
      FACTURADONETO: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      PORCENTAJE: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      GANANCIAPARCIAL: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      PORCENTAJERECUPERACION: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      GANANCIAPOTENCIAL: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      MONEDA: { dir: oracle.BIND_OUT }
    };
    return db.execute("GetGananciaSaldoRefac", codPais, statement, params);
  }

  async GetIndicadorPosibleConsecu(codPais, campania, codRegi, codZona, codSecc, tipo) {
    let statement = `BEGIN ${db.schema(
      codPais
    )}.soa_pkg_proce.soa_pr_obtie_indic_posib_conse(:inCampania, :inCodRegion, :inCodZona, :inCodSecc, :inTipo, :ISOPAIS, :CAMPANIA, :TOTALPOSIBLES, :NROPEDIDOS, :PEDCONSECUTIVO, :PEDCONSECUTIVOAV, :PEDCONSECUTIVOBV, :PEDNOCONSECUTIVO, :PORCONSECUTIVO, :PORCONSECUTIVOAV, :PORCONSECUTIVOBV, :PORNOCONSECUTIVO, :VTANETACONSECUTIVO, :VTANETACONSECUTIVOAV, :VTANETACONSECUTIVOBV, :VTANETANOCONSECUTIVO); END;`;
    let params = {
      inCampania: campania,
      inCodRegion: codRegi,
      inCodZona: codZona,
      inCodSecc: codSecc,
      inTipo: tipo,
      ISOPAIS: { dir: oracle.BIND_OUT },
      CAMPANIA: { dir: oracle.BIND_OUT },
      TOTALPOSIBLES: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      NROPEDIDOS: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      PEDCONSECUTIVO: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      PEDCONSECUTIVOAV: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      PEDCONSECUTIVOBV: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      PEDNOCONSECUTIVO: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      PORCONSECUTIVO: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      PORCONSECUTIVOAV: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      PORCONSECUTIVOBV: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      PORNOCONSECUTIVO: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      VTANETACONSECUTIVO: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      VTANETACONSECUTIVOAV: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      VTANETACONSECUTIVOBV: { type: oracle.NUMBER, dir: oracle.BIND_OUT },
      VTANETANOCONSECUTIVO: { type: oracle.NUMBER, dir: oracle.BIND_OUT }
    };
    return db.execute("GetIndicadorPosibleConsecu", codPais, statement, params);
  }
}
