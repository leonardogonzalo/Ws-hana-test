import Settings from "../utils/settings";
import HanaDbContext from "../repositories/hanaDbContext";
import OracleDbContext from "../repositories/oracleDbContext";

import Validator from "../models/validators/validator";

import GetPeriodoQueryResult from "../models/responses/getPeriodo";
import GetNivelQueryResult from "../models/responses/getNivel";
import GetNivelConsultoraQueryResult from "../models/responses/getNivelConsultora";
import GetKitsConsultoraQueryResult from "../models/responses/getKitsConsultora";
import GetOfertasQueryResult from "../models/responses/getOfertas";

import Utils from "../utils/format";

let dbContextHana = new HanaDbContext();
let dbContextOracle = new OracleDbContext();

export default class Controller {
  async GetPeriodo(ctx) {
    let query = ctx.params;
    Validator.validate(query);
    let queryResult = [];
    if (Settings.isEnableContingencia(query.isoPais)) {
      let dbResult = await dbContextOracle.GetPeriodo(query.isoPais);

      if (dbResult && dbResult.length > 0) {
        for (let data of dbResult) {
          let itemQueryResult = new GetPeriodoQueryResult();
          if (data.COD_PAIS) itemQueryResult.ISOPAIS = data.COD_PAIS;
          if (data.COD_PERI) itemQueryResult.PERIODO = data.COD_PERI;
          if (data.CAM_INI) itemQueryResult.CAMPANAINICIAL = data.CAM_INI;
          if (data.CAM_FIN) itemQueryResult.CAMPANAFINAL = data.CAM_FIN;
          if (data.NRO_CAMPA) itemQueryResult.NROCAMPANA = Number.parseInt(data.NRO_CAMPA);
          queryResult.push(itemQueryResult);
        }
      }
    } else {
      let dbResult = await dbContextHana.GetPeriodo(query.isoPais);
      if (dbResult && dbResult.length > 0) {
        for (let data of dbResult) {
          let itemQueryResult = new GetPeriodoQueryResult();
          if (data.ISOPAIS) itemQueryResult.ISOPAIS = data.ISOPAIS;
          if (data.PERIODO) itemQueryResult.PERIODO = data.PERIODO;
          if (data.CAMPANAINICIAL) itemQueryResult.CAMPANAINICIAL = data.CAMPANAINICIAL;
          if (data.CAMPANAFINAL) itemQueryResult.CAMPANAFINAL = data.CAMPANAFINAL;
          if (data.NROCAMPANA) itemQueryResult.NROCAMPANA = Number.parseInt(data.NROCAMPANA);
          queryResult.push(itemQueryResult);
        }
      }
    }
    ctx.body = queryResult;
  }

  async GetNivel(ctx) {
    let query = ctx.params;
    Validator.validate(query);
    let queryResult = [];
    if (Settings.isEnableContingencia(query.isoPais)) {
      let dbResult = await dbContextOracle.GetNivel(query.isoPais);

      if (dbResult && dbResult.length > 0) {
        for (let data of dbResult) {
          let itemQueryResult = new GetNivelQueryResult();
          if (data.COD_PAIS) itemQueryResult.ISOPAIS = data.COD_PAIS;
          if (data.COD_NIVEL) itemQueryResult.CODIGONIVEL = data.COD_NIVEL;
          if (data.DES_NIVEL) itemQueryResult.DESCRIPCIONNIVEL = data.DES_NIVEL;
          if (data.VAL_MONT_MIN) itemQueryResult.MONTOMINIMO = Number.parseFloat(data.VAL_MONT_MIN);
          if (data.VAL_MONT_MAX) itemQueryResult.MONTOMAXIMO = Number.parseFloat(data.VAL_MONT_MAX);
          if (data.DES_BENEF_1) itemQueryResult.BENEFICIO1 = data.DES_BENEF_1;
          if (data.DES_BENEF_2) itemQueryResult.BENEFICIO2 = data.DES_BENEF_2;
          if (data.DES_BENEF_3) itemQueryResult.BENEFICIO3 = data.DES_BENEF_3;
          if (data.DES_BENEF_4) itemQueryResult.BENEFICIO4 = data.DES_BENEF_4;
          if (data.DES_BENEF_5) itemQueryResult.BENEFICIO5 = data.DES_BENEF_5;
          if (data.NUM_CANT_PUNT) itemQueryResult.PUNTNIVEL = Number.parseInt(data.NUM_CANT_PUNT);
          queryResult.push(itemQueryResult);
        }
      }
    } else {
      let dbResult = await dbContextHana.GetNivel(query.isoPais);
      if (dbResult && dbResult.length > 0) {
        for (let data of dbResult) {
          let itemQueryResult = new GetNivelQueryResult();
          if (data.ISOPAIS) itemQueryResult.ISOPAIS = data.ISOPAIS;
          if (data.CODIGONIVEL) itemQueryResult.CODIGONIVEL = data.CODIGONIVEL;
          if (data.DESCRIPCIONNIVEL) itemQueryResult.DESCRIPCIONNIVEL = data.DESCRIPCIONNIVEL;
          if (data.MONTOMINIMO) itemQueryResult.MONTOMINIMO = Number.parseFloat(data.MONTOMINIMO);
          if (data.MONTOMAXIMO) itemQueryResult.MONTOMAXIMO = Number.parseFloat(data.MONTOMAXIMO);
          if (data.BENEFICIO1) itemQueryResult.BENEFICIO1 = data.BENEFICIO1;
          if (data.BENEFICIO2) itemQueryResult.BENEFICIO2 = data.BENEFICIO2;
          if (data.BENEFICIO3) itemQueryResult.BENEFICIO3 = data.BENEFICIO3;
          if (data.BENEFICIO4) itemQueryResult.BENEFICIO4 = data.BENEFICIO4;
          if (data.BENEFICIO5) itemQueryResult.BENEFICIO5 = data.BENEFICIO5;
          if (data.PUNTNIVEL) itemQueryResult.PUNTNIVEL = Number.parseInt(data.PUNTNIVEL);
          queryResult.push(itemQueryResult);
        }
      }
    }
    ctx.body = queryResult;
  }

  async GetNivelConsultora(ctx) {
    let query = ctx.params;
    Validator.validate(query);
    let queryResult = [];

    if (Settings.isEnableContingencia(query.isoPais)) {
      let dbResult = await dbContextOracle.GetNivelConsultora(query.isoPais, query.consultora, query.nroCampanas);

      if (dbResult && dbResult.length > 0) {
        for (let data of dbResult) {
          let itemQueryResult = new GetNivelConsultoraQueryResult();
          if (data.COD_PAIS) itemQueryResult.ISOPAIS = data.COD_PAIS;
          if (data.COD_PERI_CAE) itemQueryResult.PERIODOCAE = data.COD_PERI_CAE;
          if (data.COD_CAMP) itemQueryResult.CAMPANA = data.COD_CAMP;
          if (data.COD_NIVEL) itemQueryResult.NIVELACTUAL = data.COD_NIVEL;
          if (data.VAL_MONT_PED) itemQueryResult.MONTOPEDIDO = Number.parseFloat(data.VAL_MONT_PED);
          if (data.FEC_INGR_CONS) itemQueryResult.FECHAINGRESO = Utils.toDateTime(data.FEC_INGR_CONS);
          if (data.IND_KIT_PERI) itemQueryResult.KITSOLICITADO = data.IND_KIT_PERI;
          if (data.VAL_GANAN_CAMPA) itemQueryResult.GANANCIACAMPANA = Number.parseFloat(data.VAL_GANAN_CAMPA);
          if (data.VAL_GANAN_PERIO) itemQueryResult.GANANCIAPERIODO = Number.parseFloat(data.VAL_GANAN_PERIO);
          if (data.VAL_GANAN_ANUAL) itemQueryResult.GANANCIAANUAL = Number.parseFloat(data.VAL_GANAN_ANUAL);
          if (data.VAL_CAMB_ESCA) itemQueryResult.CAMBIOESCALA = Number.parseInt(data.VAL_CAMB_ESCA);
          if (data.VAL_CAMB_NIVE) itemQueryResult.CAMBIONIVEL = Number.parseInt(data.VAL_CAMB_NIVE);
          //Este campo el sp lo esta devolviendo como string y los decimales menores a 1 vienen como ,43
          //lo que provoca un error al intentar parsear
          if (data.VAL_PORC_INCR) {
            let newValue = data.VAL_PORC_INCR.toString().replace(",", ".");
            itemQueryResult.PORCENTAJEINCREMENTO = Number.parseFloat(newValue);
          }

          if (data.VAL_CONST_PER1) itemQueryResult.CONSTANCIA1 = Number.parseInt(data.VAL_CONST_PER1);
          if (data.VAL_CONST_PER2) itemQueryResult.CONSTANCIA2 = Number.parseInt(data.VAL_CONST_PER2);
          if (data.VAL_CONST_PER3) itemQueryResult.CONSTANCIA3 = Number.parseInt(data.VAL_CONST_PER3);
          if (data.VAL_CONST_PER4) itemQueryResult.CONSTANCIA4 = Number.parseInt(data.VAL_CONST_PER4);
          if (data.VAL_CONST_PER5) itemQueryResult.CONSTANCIA5 = Number.parseInt(data.VAL_CONST_PER5);
          if (data.VAL_PERIO_PER1) itemQueryResult.PERIODO1 = data.VAL_PERIO_PER1;
          if (data.VAL_PERIO_PER2) itemQueryResult.PERIODO2 = data.VAL_PERIO_PER2;
          if (data.VAL_PERIO_PER3) itemQueryResult.PERIODO3 = data.VAL_PERIO_PER3;
          if (data.VAL_PERIO_PER4) itemQueryResult.PERIODO4 = data.VAL_PERIO_PER4;
          if (data.VAL_PERIO_PER5) itemQueryResult.PERIODO5 = data.VAL_PERIO_PER5;
          if (data.VTA_CAMP_RET) itemQueryResult.VTACAMPRET = Number.parseFloat(data.VTA_CAMP_RET);
          if (data.VTA_ACUM_PERI_CAE) itemQueryResult.VTAACUMPERICAE = Number.parseFloat(data.VTA_ACUM_PERI_CAE);
          if (data.NUM_PUNT_ACUM_PDR) itemQueryResult.PUNTACUMPDR = Number.parseInt(data.NUM_PUNT_ACUM_PDR);

          if (data.IND_CICL_NUEV) itemQueryResult.INDCICLONUEVAS = Number.parseInt(data.IND_CICL_NUEV);
          if (data.IND_BRILL) itemQueryResult.INDBRILLANTE = Number.parseInt(data.IND_BRILL);
          if (data.MAX_NIVEL_ACTIV) itemQueryResult.MAXNIVELACTIVIDAD = Number.parseInt(data.MAX_NIVEL_ACTIV);
          if (data.IND_CAMBI_NIVEL) itemQueryResult.INDCAMBIONIVEL = Number.parseInt(data.IND_CAMBI_NIVEL);
          if (data.VAL_PEDID_CONSE) itemQueryResult.VALPEDIDOCONSECUTIVO = Number.parseInt(data.VAL_PEDID_CONSE);
          /*
          if (data.VAL_LIBRE_NUME1) itemQueryResult.VALNUM1 = data.VAL_LIBRE_NUME1;
          if (data.VAL_LIBRE_NUME2) itemQueryResult.VALNUM2 = data.VAL_LIBRE_NUME2;
          if (data.VAL_LIBRE_NUME3) itemQueryResult.VALNUM3 = data.VAL_LIBRE_NUME3;
          if (data.VAL_LIBRE_NUME4) itemQueryResult.VALNUM4 = data.VAL_LIBRE_NUME4;
          if (data.VAL_LIBRE_NUME5) itemQueryResult.VALNUM5 = data.VAL_LIBRE_NUME5;
          if (data.VAL_LIBRE_TEXT1) itemQueryResult.VALTXT1 = data.VAL_LIBRE_TEXT1;
          if (data.VAL_LIBRE_TEXT2) itemQueryResult.VALTXT2 = data.VAL_LIBRE_TEXT2;
          if (data.VAL_LIBRE_TEXT3) itemQueryResult.VALTXT3 = data.VAL_LIBRE_TEXT3;
          if (data.VAL_LIBRE_TEXT4) itemQueryResult.VALTXT4 = data.VAL_LIBRE_TEXT4;
          if (data.VAL_LIBRE_TEXT5) itemQueryResult.VALTXT5 = data.VAL_LIBRE_TEXT5;
          */

          if (data.CAMP_PRIM_PEDI) itemQueryResult.CAMPPRIMPEDI = data.CAMP_PRIM_PEDI;
          if (data.VTA_ACUM_CICL_NUEV) itemQueryResult.VTAACUMCICNUEV = Number.parseFloat(data.VTA_ACUM_CICL_NUEV);
          if (data.CAMP_FACT_PERI1) itemQueryResult.CAMPFACTPERI1 = data.CAMP_FACT_PERI1;
          if (data.CAMP_FACT_PERI2) itemQueryResult.CAMPFACTPERI2 = data.CAMP_FACT_PERI2;
          if (data.CAMP_FACT_PERI3) itemQueryResult.CAMPFACTPERI3 = data.CAMP_FACT_PERI3;
          if (data.CAMP_FACT_PERI4) itemQueryResult.CAMPFACTPERI4 = data.CAMP_FACT_PERI4;
          if (data.CAMP_FACT_PERI5) itemQueryResult.CAMPFACTPERI5 = data.CAMP_FACT_PERI5;
          if (data.DES_NIVE_PDR_ACT) itemQueryResult.DESNIVEPDRACT = data.DES_NIVE_PDR_ACT;
          if (data.DES_NIVE_PDR_SIG) itemQueryResult.DESNIVEPDRSIG = data.DES_NIVE_PDR_SIG;
          if (data.EXI_PUNT_PDR_SIG) itemQueryResult.EXIPUNTPDRSIG = Number.parseFloat(data.EXI_PUNT_PDR_SIG);

          queryResult.push(itemQueryResult);
        }
      }
    } else {
      let dbResult = await dbContextHana.GetNivelConsultora(query.isoPais, query.consultora, query.nroCampanas);
      if (dbResult && dbResult.length > 0) {
        for (let data of dbResult) {
          let itemQueryResult = new GetNivelConsultoraQueryResult();
          if (data.ISOPAIS) itemQueryResult.ISOPAIS = data.ISOPAIS;
          if (data.PERIODOCAE) itemQueryResult.PERIODOCAE = data.PERIODOCAE;
          if (data.CAMPANA) itemQueryResult.CAMPANA = data.CAMPANA;
          if (data.NIVELACTUAL) itemQueryResult.NIVELACTUAL = data.NIVELACTUAL;
          if (data.MONTOPEDIDO) itemQueryResult.MONTOPEDIDO = Number.parseFloat(data.MONTOPEDIDO);
          if (data.FECHAINGRESO) itemQueryResult.FECHAINGRESO = Utils.toDateTime(data.FECHAINGRESO);
          if (data.KITSOLICITADO) itemQueryResult.KITSOLICITADO = data.KITSOLICITADO;
          if (data.GANANCIACAMPANA) itemQueryResult.GANANCIACAMPANA = Number.parseFloat(data.GANANCIACAMPANA);
          if (data.GANANCIAPERIODO) itemQueryResult.GANANCIAPERIODO = Number.parseFloat(data.GANANCIAPERIODO);
          if (data.GANANCIAANUAL) itemQueryResult.GANANCIAANUAL = Number.parseFloat(data.GANANCIAANUAL);
          if (data.CAMBIOESCALA) itemQueryResult.CAMBIOESCALA = Number.parseInt(data.CAMBIOESCALA);
          if (data.CAMBIONIVEL) itemQueryResult.CAMBIONIVEL = Number.parseInt(data.CAMBIONIVEL);
          if (data.PORCENTAJEINCREMENTO) itemQueryResult.PORCENTAJEINCREMENTO = Number.parseFloat(data.PORCENTAJEINCREMENTO);
          if (data.CONSTANCIA1) itemQueryResult.CONSTANCIA1 = Number.parseInt(data.CONSTANCIA1);
          if (data.CONSTANCIA2) itemQueryResult.CONSTANCIA2 = Number.parseInt(data.CONSTANCIA2);
          if (data.CONSTANCIA3) itemQueryResult.CONSTANCIA3 = Number.parseInt(data.CONSTANCIA3);
          if (data.CONSTANCIA4) itemQueryResult.CONSTANCIA4 = Number.parseInt(data.CONSTANCIA4);
          if (data.CONSTANCIA5) itemQueryResult.CONSTANCIA5 = Number.parseInt(data.CONSTANCIA5);
          if (data.PERIODO1) itemQueryResult.PERIODO1 = data.PERIODO1;
          if (data.PERIODO2) itemQueryResult.PERIODO2 = data.PERIODO2;
          if (data.PERIODO3) itemQueryResult.PERIODO3 = data.PERIODO3;
          if (data.PERIODO4) itemQueryResult.PERIODO4 = data.PERIODO4;
          if (data.PERIODO5) itemQueryResult.PERIODO5 = data.PERIODO5;
          if (data.VTACAMPRET) itemQueryResult.VTACAMPRET = Number.parseFloat(data.VTACAMPRET);
          if (data.VTAACUMPERICAE) itemQueryResult.VTAACUMPERICAE = Number.parseFloat(data.VTAACUMPERICAE);
          if (data.PUNTACUMPDR) itemQueryResult.PUNTACUMPDR = Number.parseInt(data.PUNTACUMPDR);

          if (data.INDCICLNUEV) itemQueryResult.INDCICLONUEVAS = Number.parseInt(data.INDCICLNUEV);
          if (data.INDBRILL) itemQueryResult.INDBRILLANTE = Number.parseInt(data.INDBRILL);
          if (data.MAXNIVELACTIV) itemQueryResult.MAXNIVELACTIVIDAD = Number.parseInt(data.MAXNIVELACTIV);
          if (data.INDCAMBINIVEL) itemQueryResult.INDCAMBIONIVEL = Number.parseInt(data.INDCAMBINIVEL);
          if (data.VALPEDIDCONSE) itemQueryResult.VALPEDIDOCONSECUTIVO = Number.parseInt(data.VALPEDIDCONSE);
          /*
          if (data.VALNUM1) itemQueryResult.VALNUM1 = data.VALNUM1;
          if (data.VALNUM2) itemQueryResult.VALNUM2 = data.VALNUM2;
          if (data.VALNUM3) itemQueryResult.VALNUM3 = data.VALNUM3;
          if (data.VALNUM4) itemQueryResult.VALNUM4 = data.VALNUM4;
          if (data.VALNUM5) itemQueryResult.VALNUM5 = data.VALNUM5;
          if (data.VALTXT1) itemQueryResult.VALTXT1 = data.VALTXT1;
          if (data.VALTXT2) itemQueryResult.VALTXT2 = data.VALTXT2;
          if (data.VALTXT3) itemQueryResult.VALTXT3 = data.VALTXT3;
          if (data.VALTXT4) itemQueryResult.VALTXT4 = data.VALTXT4;
          if (data.VALTXT5) itemQueryResult.VALTXT5 = data.VALTXT5;
          */

          if (data.CAMPPRIMPEDI) itemQueryResult.CAMPPRIMPEDI = data.CAMPPRIMPEDI;
          if (data.VTAACUMCICNUEV) itemQueryResult.VTAACUMCICNUEV = Number.parseFloat(data.VTAACUMCICNUEV);
          if (data.CAMPFACTPERI1) itemQueryResult.CAMPFACTPERI1 = data.CAMPFACTPERI1;
          if (data.CAMPFACTPERI2) itemQueryResult.CAMPFACTPERI2 = data.CAMPFACTPERI2;
          if (data.CAMPFACTPERI3) itemQueryResult.CAMPFACTPERI3 = data.CAMPFACTPERI3;
          if (data.CAMPFACTPERI4) itemQueryResult.CAMPFACTPERI4 = data.CAMPFACTPERI4;
          if (data.CAMPFACTPERI5) itemQueryResult.CAMPFACTPERI5 = data.CAMPFACTPERI5;
          if (data.DESNIVEPDRACT) itemQueryResult.DESNIVEPDRACT = data.DESNIVEPDRACT;
          if (data.DESNIVEPDRSIG) itemQueryResult.DESNIVEPDRSIG = data.DESNIVEPDRSIG;
          if (data.EXIPUNTPDRSIG) itemQueryResult.EXIPUNTPDRSIG = Number.parseFloat(data.EXIPUNTPDRSIG);

          queryResult.push(itemQueryResult);
        }
      }
    }
    ctx.body = queryResult;
  }

  async GetKitsConsultora(ctx) {
    let query = ctx.params;
    Validator.validate(query);
    let queryResult = [];

    if (Settings.isEnableContingencia(query.isoPais)) {
      let dbResult = await dbContextOracle.GetKitsConsultora(query.isoPais, query.consultora, query.periodo);

      if (dbResult && dbResult.length > 0) {
        for (let data of dbResult) {
          let itemQueryResult = new GetKitsConsultoraQueryResult();
          if (data.COD_PAIS) itemQueryResult.ISOPAIS = data.COD_PAIS;
          if (data.COD_KIT) itemQueryResult.CODIGOKIT = data.COD_KIT;
          if (data.COD_CAMP_ATEN) itemQueryResult.CAMPANAATENCION = data.COD_CAMP_ATEN;
          queryResult.push(itemQueryResult);
        }
      }
    } else {
      let dbResult = await dbContextHana.GetKitsConsultora(query.isoPais, query.consultora, query.periodo);
      if (dbResult && dbResult.length > 0) {
        for (let data of dbResult) {
          let itemQueryResult = new GetKitsConsultoraQueryResult();
          if (data.ISOPAIS) itemQueryResult.ISOPAIS = data.ISOPAIS;
          if (data.CODIGOKIT) itemQueryResult.CODIGOKIT = data.CODIGOKIT;
          if (data.CAMPANAATENCION) itemQueryResult.CAMPANAATENCION = data.CAMPANAATENCION;
          queryResult.push(itemQueryResult);
        }
      }
    }
    ctx.body = queryResult;
  }

  async GetOfertas(ctx) {
    let query = ctx.params;
    Validator.validate(query);
    let queryResult = [];

    if (Settings.isEnableContingencia(query.isoPais)) {
      let dbResult = await dbContextOracle.GetOfertas(query.isoPais, query.periodo);

      if (dbResult && dbResult.length > 0) {
        for (let data of dbResult) {
          let itemQueryResult = new GetOfertasQueryResult();
          if (data.COD_PAIS) itemQueryResult.ISOPAIS = data.COD_PAIS;
          if (data.COD_KIT) itemQueryResult.CODIGOKIT = data.COD_KIT;
          if (data.COD_CUV) itemQueryResult.CUV = data.COD_CUV;
          if (data.COD_SAP) itemQueryResult.CODIGOSAP = data.COD_SAP;
          if (data.DES_PROD) itemQueryResult.DESCRIPCION = data.DES_PROD;
          if (data.VAL_PREC) itemQueryResult.PRECIO = Number.parseFloat(data.VAL_PREC);
          if (data.DES_MARCA) itemQueryResult.MARCA = data.DES_MARCA;
          if (data.IND_DIGI) itemQueryResult.DIGITABLE = data.IND_DIGI;
          if (data.DES_OFERT) itemQueryResult.DESCRIPCIONOFERTA = data.DES_OFERT;
          if (data.COD_NIVEL) itemQueryResult.NIVEL = data.COD_NIVEL;
          queryResult.push(itemQueryResult);
        }
      }
    } else {
      let dbResult = await dbContextHana.GetOfertas(query.isoPais, query.periodo);
      if (dbResult && dbResult.length > 0) {
        for (let data of dbResult) {
          let itemQueryResult = new GetOfertasQueryResult();
          if (data.ISOPAIS) itemQueryResult.ISOPAIS = data.ISOPAIS;
          if (data.CODIGOKIT) itemQueryResult.CODIGOKIT = data.CODIGOKIT;
          if (data.CUV) itemQueryResult.CUV = data.CUV;
          if (data.CODIGOSAP) itemQueryResult.CODIGOSAP = data.CODIGOSAP;
          if (data.DESCRIPCION) itemQueryResult.DESCRIPCION = data.DESCRIPCION;
          if (data.PRECIO) itemQueryResult.PRECIO = Number.parseFloat(data.PRECIO);
          if (data.MARCA) itemQueryResult.MARCA = data.MARCA;
          if (data.DIGITABLE) itemQueryResult.DIGITABLE = data.DIGITABLE;
          if (data.DESCRIPCIONOFERTA) itemQueryResult.DESCRIPCIONOFERTA = data.DESCRIPCIONOFERTA;
          if (data.NIVEL) itemQueryResult.NIVEL = data.NIVEL;
          queryResult.push(itemQueryResult);
        }
      }
    }
    ctx.body = queryResult;
  }

  async Health(ctx) {
    ctx.body = { apiName: "CAE", version: "1.0.10" };
  }
}
