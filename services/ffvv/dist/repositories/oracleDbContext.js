"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _oracledb = _interopRequireDefault(require("oracledb"));

var _oracleDbConnection = _interopRequireDefault(require("./dbConnection/oracleDbConnection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OracleDbContext {
  async GetRegionZonaSeccionPedido(codPais, campania, codRegi, codZona, tipo) {
    let statement = `SELECT * FROM TABLE(${_oracleDbConnection.default.schema(codPais)}.soa_pkg_proce.soa_fn_obtie_reg_zon_sec_pedi(:psCampana, :psCodRegi, :psCodZona, :psFactura))`;
    return _oracleDbConnection.default.execute("GetRegionZonaSeccionPedido", codPais, statement, [campania, codRegi, codZona, tipo]);
  }

  async GetEstadoConsultora(codPais) {
    let statement = `
      SELECT gen.val_oid IdEstadoActividad,(select pais_oid_pais from cra_perio where rownum = 1) PaisID,
      lpad(gen.val_oid,2,'0') CodigoEstadoActividad,GEN.VAL_I18N Descripcion,1 EstadoActivo
      FROM gen_i18n_sicc_comun gen WHERE gen.attr_enti = 'MAE_ESTAT_CLIEN' and GEN.IDIO_OID_IDIO = 1`;
    let params = [];
    return _oracleDbConnection.default.execute("GetEstadoConsultora", codPais, statement, params);
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
    return _oracleDbConnection.default.execute("GetSeccionZona", codPais, statement, params);
  }

  async GetCantGananciaYSaldoRefac(codPais, campania, codRegi, codZona, codSecc) {
    let statement = `BEGIN ${_oracleDbConnection.default.schema(codPais)}.soa_pkg_proce.soa_pr_obten_count_ganan_saldo(:inCampania, :inCodRegion, :inCodZona, :inCodSeccion, :ISOPAIS, :CAMPANIA, :CANTIDADPOSIBLES); END;`;
    let params = {
      inCampania: campania,
      inCodRegion: codRegi,
      inCodZona: codZona,
      inCodSeccion: codSecc,
      ISOPAIS: {
        dir: _oracledb.default.BIND_OUT
      },
      CAMPANIA: {
        dir: _oracledb.default.BIND_OUT
      },
      CANTIDADPOSIBLES: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      }
    };
    return _oracleDbConnection.default.execute("GetCantGananciaYSaldoRefac", codPais, statement, params);
  }

  async GetCantListActividadRefac(codPais, campania, codRegi, codZona, codSecc, facturacion) {
    let statement = `BEGIN ${_oracleDbConnection.default.schema(codPais)}.soa_pkg_proce.soa_pr_obten_count_lista_activ(:inCampania, :inCodRegion, :inCodZona, :inCodSeccion, :inFacturacion, :ISOPAIS, :CAMPANIA, :TOTALCONSULTORAS); END;`;
    let params = {
      inCampania: campania,
      inCodRegion: codRegi,
      inCodZona: codZona,
      inCodSeccion: codSecc,
      inFacturacion: facturacion,
      ISOPAIS: {
        dir: _oracledb.default.BIND_OUT
      },
      CAMPANIA: {
        dir: _oracledb.default.BIND_OUT
      },
      TOTALCONSULTORAS: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      }
    };
    return _oracleDbConnection.default.execute("GetCantListActividadRefac", codPais, statement, params);
  }

  async GetCantListCicloNuevas(codPais, campania, codRegi, codZona, tipo) {
    let statement = `BEGIN ${_oracleDbConnection.default.schema(codPais)}.soa_pkg_proce.soa_pr_obten_count_lista_ciclo(:inCampania, :inCodRegion, :inCodZona, :inTipo, :ISOPAIS, :CAMPANIA, :TOTALCONSULTORAS); END;`;
    let params = {
      inCampania: campania,
      inCodRegion: codRegi,
      inCodZona: codZona,
      inTipo: tipo,
      ISOPAIS: {
        dir: _oracledb.default.BIND_OUT
      },
      CAMPANIA: {
        dir: _oracledb.default.BIND_OUT
      },
      TOTALCONSULTORAS: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      }
    };
    return _oracleDbConnection.default.execute("GetCantListCicloNuevas", codPais, statement, params);
  }

  async GetCantListPedidosVentaRefac(codPais, campania, codRegi, codZona, codSecc, tipo, facturacion) {
    let statement = `BEGIN ${_oracleDbConnection.default.schema(codPais)}.soa_pkg_proce.soa_pr_obten_count_lista_pedve(:inCampania, :inCodRegion, :inCodZona, :inCodSeccion, :inTipo, :inFacturacion, :ISOPAIS, :CAMPANIA, :TOTALCONSULTORAS); END;`;
    let params = {
      inCampania: campania,
      inCodRegion: codRegi,
      inCodZona: codZona,
      inCodSeccion: codSecc,
      inTipo: tipo,
      inFacturacion: facturacion,
      ISOPAIS: {
        dir: _oracledb.default.BIND_OUT
      },
      CAMPANIA: {
        dir: _oracledb.default.BIND_OUT
      },
      TOTALCONSULTORAS: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      }
    };
    return _oracleDbConnection.default.execute("GetCantListPedidosVentaRefac", codPais, statement, params);
  }

  async GetCountListPegRefac(codPais, campania, codRegi, codZona, facturacion) {
    let statement = `BEGIN ${_oracleDbConnection.default.schema(codPais)}.soa_pkg_proce.soa_pr_obten_count_lista_pegs(:inCampania, :inCodRegion, :inCodZona, :inFacturacion, :ISOPAIS, :CAMPANIA, :TOTALPOSIBLES); END;`;
    let params = {
      inCampania: campania,
      inCodRegion: codRegi,
      inCodZona: codZona,
      inFacturacion: facturacion,
      ISOPAIS: {
        dir: _oracledb.default.BIND_OUT
      },
      CAMPANIA: {
        dir: _oracledb.default.BIND_OUT
      },
      TOTALPOSIBLES: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      }
    };
    return _oracleDbConnection.default.execute("GetCountListPegRefac", codPais, statement, params);
  }

  async GetCantListPosiblesConsecutivasRefac(codPais, campania, codRegi, codZona, codSecc) {
    let statement = `BEGIN ${_oracleDbConnection.default.schema(codPais)}.soa_pkg_proce.soa_pr_obten_count_lista_posco(:inCampania, :inCodRegion, :inCodZona, :inCodSecc, :ISOPAIS, :CAMPANIA, :TOTALPOSIBLES); END;`;
    let params = {
      inCampania: campania,
      inCodRegion: codRegi,
      inCodZona: codZona,
      inCodSecc: codSecc,
      ISOPAIS: {
        dir: _oracledb.default.BIND_OUT
      },
      CAMPANIA: {
        dir: _oracledb.default.BIND_OUT
      },
      TOTALPOSIBLES: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      }
    };
    return _oracleDbConnection.default.execute("GetCantListPosiblesConsecutivasRefac", codPais, statement, params);
  }

  async GetCantSaldoPendienteRefac(codPais, campania, codRegi, codZona, codSecc) {
    let statement = `BEGIN ${_oracleDbConnection.default.schema(codPais)}.soa_pkg_proce.soa_pr_obten_count_saldo_pendi(:inCampania, :inCodRegion, :inCodZona, :inCodSecc, :ISOPAIS, :CAMPANIA, :TOTALPOSIBLES); END;`;
    let params = {
      inCampania: campania,
      inCodRegion: codRegi,
      inCodZona: codZona,
      inCodSecc: codSecc,
      ISOPAIS: {
        dir: _oracledb.default.BIND_OUT
      },
      CAMPANIA: {
        dir: _oracledb.default.BIND_OUT
      },
      TOTALPOSIBLES: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      }
    };
    return _oracleDbConnection.default.execute("GetCantSaldoPendienteRefac", codPais, statement, params);
  }

  async GetIndicadorCicloNuevas(codPais, campania, codRegi, codZona, codSecc, tipo) {
    let statement = `BEGIN ${_oracleDbConnection.default.schema(codPais)}.soa_pkg_proce.soa_pr_obtie_indic_ciclo_nueva(:inCampania, :inCodRegion, :inCodZona, :inCodSecc, :inTipo, :ISOPAIS, :C2D2FDV, :C2D2REAL, :C3D3FDV, :C3D3REAL, :C4D4FDV, :C4D4REAL, :C5D5FDV, :C5D5REAL, :C6D6FDV, :C6D6REAL); END;`;
    let params = {
      inCampania: campania,
      inCodRegion: codRegi,
      inCodZona: codZona,
      inCodSecc: codSecc,
      inTipo: tipo,
      ISOPAIS: {
        dir: _oracledb.default.BIND_OUT
      },
      C2D2FDV: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      C2D2REAL: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      C3D3FDV: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      C3D3REAL: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      C4D4FDV: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      C4D4REAL: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      C5D5FDV: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      C5D5REAL: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      C6D6FDV: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      C6D6REAL: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      }
    };
    return _oracleDbConnection.default.execute("GetIndicadorCicloNuevas", codPais, statement, params);
  }

  async GetGananciaSaldoRefac(codPais, campania, codRegi, codZona, codSecc) {
    let statement = `BEGIN ${_oracleDbConnection.default.schema(codPais)}.soa_pkg_proce.soa_pr_obtie_indic_ganan_saldo(:inCampania, :inCodRegion, :inCodZona, :inCodSecc, :ISOPAIS, :CAMPANIA, :FACTURADONETO, :PORCENTAJE, :GANANCIAPARCIAL, :PORCENTAJERECUPERACION, :GANANCIAPOTENCIAL, :MONEDA); END;`;
    let params = {
      inCampania: campania,
      inCodRegion: codRegi,
      inCodZona: codZona,
      inCodSecc: codSecc,
      ISOPAIS: {
        dir: _oracledb.default.BIND_OUT
      },
      CAMPANIA: {
        dir: _oracledb.default.BIND_OUT
      },
      FACTURADONETO: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      PORCENTAJE: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      GANANCIAPARCIAL: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      PORCENTAJERECUPERACION: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      GANANCIAPOTENCIAL: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      MONEDA: {
        dir: _oracledb.default.BIND_OUT
      }
    };
    return _oracleDbConnection.default.execute("GetGananciaSaldoRefac", codPais, statement, params);
  }

  async GetIndicadorPosibleConsecu(codPais, campania, codRegi, codZona, codSecc, tipo) {
    let statement = `BEGIN ${_oracleDbConnection.default.schema(codPais)}.soa_pkg_proce.soa_pr_obtie_indic_posib_conse(:inCampania, :inCodRegion, :inCodZona, :inCodSecc, :inTipo, :ISOPAIS, :CAMPANIA, :TOTALPOSIBLES, :NROPEDIDOS, :PEDCONSECUTIVO, :PEDCONSECUTIVOAV, :PEDCONSECUTIVOBV, :PEDNOCONSECUTIVO, :PORCONSECUTIVO, :PORCONSECUTIVOAV, :PORCONSECUTIVOBV, :PORNOCONSECUTIVO, :VTANETACONSECUTIVO, :VTANETACONSECUTIVOAV, :VTANETACONSECUTIVOBV, :VTANETANOCONSECUTIVO); END;`;
    let params = {
      inCampania: campania,
      inCodRegion: codRegi,
      inCodZona: codZona,
      inCodSecc: codSecc,
      inTipo: tipo,
      ISOPAIS: {
        dir: _oracledb.default.BIND_OUT
      },
      CAMPANIA: {
        dir: _oracledb.default.BIND_OUT
      },
      TOTALPOSIBLES: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      NROPEDIDOS: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      PEDCONSECUTIVO: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      PEDCONSECUTIVOAV: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      PEDCONSECUTIVOBV: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      PEDNOCONSECUTIVO: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      PORCONSECUTIVO: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      PORCONSECUTIVOAV: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      PORCONSECUTIVOBV: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      PORNOCONSECUTIVO: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      VTANETACONSECUTIVO: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      VTANETACONSECUTIVOAV: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      VTANETACONSECUTIVOBV: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      },
      VTANETANOCONSECUTIVO: {
        type: _oracledb.default.NUMBER,
        dir: _oracledb.default.BIND_OUT
      }
    };
    return _oracleDbConnection.default.execute("GetIndicadorPosibleConsecu", codPais, statement, params);
  }

}

exports.default = OracleDbContext;