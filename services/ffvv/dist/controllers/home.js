"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _settings = _interopRequireDefault(require("../utils/settings"));

var _hanaDbContext = _interopRequireDefault(require("../repositories/hanaDbContext"));

var _oracleDbContext = _interopRequireDefault(require("../repositories/oracleDbContext"));

var _validator = _interopRequireDefault(require("../models/validators/validator"));

var _getCantGananciaYSaldoRefac = _interopRequireDefault(require("../models/responses/getCantGananciaYSaldoRefac"));

var _getCantListActividadRefac = _interopRequireDefault(require("../models/responses/getCantListActividadRefac"));

var _getCantListCicloNuevas = _interopRequireDefault(require("../models/responses/getCantListCicloNuevas"));

var _getCantListPedidosVentaRefac = _interopRequireDefault(require("../models/responses/getCantListPedidosVentaRefac"));

var _getCountListPegRefac = _interopRequireDefault(require("../models/responses/getCountListPegRefac"));

var _getCantListPosiblesConsecutivasRefac = _interopRequireDefault(require("../models/responses/getCantListPosiblesConsecutivasRefac"));

var _getCantSaldoPendienteRefac = _interopRequireDefault(require("../models/responses/getCantSaldoPendienteRefac"));

var _getIndicadorCicloNuevas = _interopRequireDefault(require("../models/responses/getIndicadorCicloNuevas"));

var _getGananciaSaldoRefac = _interopRequireDefault(require("../models/responses/getGananciaSaldoRefac"));

var _getIndicadorPosibleConsecu = _interopRequireDefault(require("../models/responses/getIndicadorPosibleConsecu"));

var _getSeccionZona = _interopRequireDefault(require("../models/responses/getSeccionZona"));

var _getCampaniaActualRefac = _interopRequireDefault(require("../models/responses/getCampaniaActualRefac"));

var _getCampania = _interopRequireDefault(require("../models/responses/getCampania"));

var _getCantListCapitalizacionRefac = _interopRequireDefault(require("../models/responses/getCantListCapitalizacionRefac"));

var _getCantListPedido = _interopRequireDefault(require("../models/responses/getCantListPedido"));

var _getCantListVentaNeta = _interopRequireDefault(require("../models/responses/getCantListVentaNeta"));

var _getEstadoConsultora = _interopRequireDefault(require("../models/responses/getEstadoConsultora"));

var _getIndicadorActividad = _interopRequireDefault(require("../models/responses/getIndicadorActividad"));

var _getIndicadorCapitalizacion = _interopRequireDefault(require("../models/responses/getIndicadorCapitalizacion"));

var _getIndicadorPedidos = _interopRequireDefault(require("../models/responses/getIndicadorPedidos"));

var _getIndicadorPosiblesEgresos = _interopRequireDefault(require("../models/responses/getIndicadorPosiblesEgresos"));

var _getIndicadorVentas = _interopRequireDefault(require("../models/responses/getIndicadorVentas"));

var _getListActividadDev = _interopRequireDefault(require("../models/responses/getListActividadDev"));

var _getListActividad = _interopRequireDefault(require("../models/responses/getListActividad"));

var _getListCapitalizacionRefac = _interopRequireDefault(require("../models/responses/getListCapitalizacionRefac"));

var _getListCicloNuevasAll = _interopRequireDefault(require("../models/responses/getListCicloNuevasAll"));

var _getListCicloNuevas = _interopRequireDefault(require("../models/responses/getListCicloNuevas"));

var _getListGananciaYSaldo = _interopRequireDefault(require("../models/responses/getListGananciaYSaldo"));

var _getListPedidosVentaRefac = _interopRequireDefault(require("../models/responses/getListPedidosVentaRefac"));

var _getListPegRefac = _interopRequireDefault(require("../models/responses/getListPegRefac"));

var _getListPosiblesConsecutivasRefac = _interopRequireDefault(require("../models/responses/getListPosiblesConsecutivasRefac"));

var _getListSaldoPendiente = _interopRequireDefault(require("../models/responses/getListSaldoPendiente"));

var _getListVentaNeta = _interopRequireDefault(require("../models/responses/getListVentaNeta"));

var _getRegionZonaSeccionActividad = _interopRequireDefault(require("../models/responses/getRegionZonaSeccionActividad"));

var _getRegionZonaSeccionCapitalizacion = _interopRequireDefault(require("../models/responses/getRegionZonaSeccionCapitalizacion"));

var _getRegionZonaSeccionCicloNuevas = _interopRequireDefault(require("../models/responses/getRegionZonaSeccionCicloNuevas"));

var _getRegionZonaSeccionCobranza = _interopRequireDefault(require("../models/responses/getRegionZonaSeccionCobranza"));

var _getRegionZonaSeccionPedido = _interopRequireDefault(require("../models/responses/getRegionZonaSeccionPedido"));

var _getRegionZonaSeccionPosiblesConsecutivas = _interopRequireDefault(require("../models/responses/getRegionZonaSeccionPosiblesConsecutivas"));

var _getRegionZonaSeccionVenta = _interopRequireDefault(require("../models/responses/getRegionZonaSeccionVenta"));

var _getRegiZonaSeccPeg = _interopRequireDefault(require("../models/responses/getRegiZonaSeccPeg"));

var _getSaldoPendiente = _interopRequireDefault(require("../models/responses/getSaldoPendiente"));

var _getZonaRegion = _interopRequireDefault(require("../models/responses/getZonaRegion"));

var _validateZonaRegion = _interopRequireDefault(require("../models/responses/validateZonaRegion"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let dbContextHana = new _hanaDbContext.default();
let dbContextOracle = new _oracleDbContext.default();

class HomeController {
  async GetCampaniaActualRefac(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = new _getCampaniaActualRefac.default();
    let dbResult = await dbContextHana.GetCampaniaActualRefac(query.codPais, query.codRegi, query.codZona, query.codRol);

    if (dbResult && dbResult.length > 0) {
      let data = dbResult[0];
      if (data.NOMBREPAIS) queryResult.NOMBREPAIS = data.NOMBREPAIS;
      if (data.FECHAINICIO) queryResult.FECHAINICIO = data.FECHAINICIO;
      if (data.FECHAFIN) queryResult.FECHAFIN = data.FECHAFIN;
      if (data.ANIO) queryResult.ANIO = data.ANIO;
      if (data.CAMPANA) queryResult.CAMPANIA = data.CAMPANA;
      if (data.CORTO) queryResult.DESCRIPCIONCORTA = data.CORTO;
      if (data.FASE) queryResult.FASE = data.FASE;
      if (data.NRODIAS) queryResult.NUMERODIAS = Number.parseInt(data.NRODIAS);
      if (data.ULTIMACAMPANA) queryResult.ULTIMACAMPANIA = data.ULTIMACAMPANA;
      if (data.CAMPANAFACTURA) queryResult.CAMPANIAFACTURACION = data.CAMPANAFACTURA;
      if (data.INICIOFACTURA) queryResult.INICIOFACTURACION = data.INICIOFACTURA;
    }

    ctx.body = queryResult;
  }

  async GetCampania(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = new _getCampania.default();
    let dbResult = await dbContextHana.GetCampania(query.codPais, query.campania, query.periodos);

    if (dbResult && dbResult.length > 0) {
      let data = dbResult[0];
      if (data.CAMPANIA) queryResult.CAMPANIA = data.CAMPANIA;
    }

    ctx.body = queryResult;
  }

  async GetCantGananciaYSaldoRefac(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = new _getCantGananciaYSaldoRefac.default();

    if (_settings.default.isEnableContingencia(query.codPais) === true) {
      let dbResult = await dbContextOracle.GetCantGananciaYSaldoRefac(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc);

      if (dbResult && dbResult.length > 0) {
        let data = dbResult[0];
        if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) queryResult.CAMPANIA = data.CAMPANIA;
        if (data.CANTIDADPOSIBLES) queryResult.TOTALPOSIBLES = Number.parseInt(data.CANTIDADPOSIBLES);
      }
    } else {
      let dbResult = await dbContextHana.GetCantGananciaYSaldoRefac(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc);

      if (dbResult && dbResult.length > 0) {
        let data = dbResult[0];
        if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) queryResult.CAMPANIA = data.CAMPANIA;
        if (data.TOTALPOSIBLES) queryResult.TOTALPOSIBLES = Number.parseInt(data.TOTALPOSIBLES);
      }
    }

    ctx.body = queryResult;
  }

  async GetCantListActividadRefac(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = new _getCantListActividadRefac.default();

    if (_settings.default.isEnableContingencia(query.codPais) === true) {
      let dbResult = await dbContextOracle.GetCantListActividadRefac(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc, query.facturacion);

      if (dbResult && dbResult.length > 0) {
        let data = dbResult[0];
        if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) queryResult.CAMPANIA = data.CAMPANIA;
        if (data.TOTALCONSULTORAS) queryResult.TOTALCONSULTORAS = Number.parseInt(data.TOTALCONSULTORAS);
      }
    } else {
      let dbResult = await dbContextHana.GetCantListActividadRefac(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc, query.facturacion);

      if (dbResult && dbResult.length > 0) {
        let data = dbResult[0];
        if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) queryResult.CAMPANIA = data.CAMPANIA;
        if (data.TOTALCONSULTORAS) queryResult.TOTALCONSULTORAS = Number.parseInt(data.TOTALCONSULTORAS);
      }
    }

    ctx.body = queryResult;
  }

  async GetCantListCapitalizacionRefac(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = new _getCantListCapitalizacionRefac.default();
    let dbResult = await dbContextHana.GetCantListCapitalizacionRefac(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc, query.tipo, query.facturacion);

    if (dbResult && dbResult.length > 0) {
      let data = dbResult[0];
      if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
      if (data.CAMPANIA) queryResult.CAMPANIA = data.CAMPANIA;
      if (data.TOTALCONSULTORAS) queryResult.TOTALCONSULTORAS = Number.parseInt(data.TOTALCONSULTORAS);
    }

    ctx.body = queryResult;
  }

  async GetCantListCicloNuevas(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = new _getCantListCicloNuevas.default();

    if (_settings.default.isEnableContingencia(query.codPais) === true) {
      let dbResult = await dbContextOracle.GetCantListCicloNuevas(query.codPais, query.campania, query.codRegi, query.codZona, query.tipo);

      if (dbResult && dbResult.length > 0) {
        let data = dbResult[0];
        if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) queryResult.CAMPANIA = data.CAMPANIA;
        if (data.TOTALCONSULTORA) queryResult.TOTALCONSULTORA = Number.parseInt(data.TOTALCONSULTORA);
      }
    } else {
      let dbResult = await dbContextHana.GetCantListCicloNuevas(query.codPais, query.campania, query.codRegi, query.codZona, query.tipo);

      if (dbResult && dbResult.length > 0) {
        let data = dbResult[0];
        if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) queryResult.CAMPANIA = data.CAMPANIA;
        if (data.TOTALCONSULTORAS) queryResult.TOTALCONSULTORA = Number.parseInt(data.TOTALCONSULTORAS);
      }
    }

    ctx.body = queryResult;
  }

  async GetCantListPedido(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = new _getCantListPedido.default();
    let dbResult = await dbContextHana.GetCantListPedido(query.codPais, query.campania, query.codZona, query.tipo, query.codRegi, query.facturacion);

    if (dbResult && dbResult.length > 0) {
      let data = dbResult[0];
      if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
      if (data.CAMPANIA) queryResult.CAMPANIA = data.CAMPANIA;
      if (data.TOTALPOSIBLES) queryResult.TOTALPOSIBLES = Number.parseInt(data.TOTALPOSIBLES);
    }

    ctx.body = queryResult;
  }

  async GetCantListPedidosVentaRefac(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = new _getCantListPedidosVentaRefac.default();

    if (_settings.default.isEnableContingencia(query.codPais) === true) {
      let dbResult = await dbContextOracle.GetCantListPedidosVentaRefac(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc, query.tipo, query.facturacion);

      if (dbResult && dbResult.length > 0) {
        let data = dbResult[0];
        if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) queryResult.CAMPANIA = data.CAMPANIA;
        if (data.TOTALCONSULTORAS) queryResult.TOTALCONSULTORAS = Number.parseInt(data.TOTALCONSULTORAS);
      }
    } else {
      let dbResult = await dbContextHana.GetCantListPedidosVentaRefac(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc, query.tipo, query.facturacion);

      if (dbResult && dbResult.length > 0) {
        let data = dbResult[0];
        if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) queryResult.CAMPANIA = data.CAMPANIA;
        if (data.TOTALCONSULTORAS) queryResult.TOTALCONSULTORAS = Number.parseInt(data.TOTALCONSULTORAS);
      }
    }

    ctx.body = queryResult;
  }

  async GetCantListPosiblesConsecutivasRefac(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = new _getCantListPosiblesConsecutivasRefac.default();

    if (_settings.default.isEnableContingencia(query.codPais) === true) {
      let dbResult = await dbContextOracle.GetCantListPosiblesConsecutivasRefac(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc);

      if (dbResult && dbResult.length > 0) {
        let data = dbResult[0];
        if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) queryResult.CAMPANIA = data.CAMPANIA;
        if (data.TOTALPOSIBLES) queryResult.TOTALPOSIBLES = Number.parseInt(data.TOTALPOSIBLES);
      }
    } else {
      let dbResult = await dbContextHana.GetCantListPosiblesConsecutivasRefac(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc);

      if (dbResult && dbResult.length > 0) {
        let data = dbResult[0];
        if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) queryResult.CAMPANIA = data.CAMPANIA;
        if (data.PED) queryResult.TOTALPOSIBLES = Number.parseInt(data.PED);
      }
    }

    ctx.body = queryResult;
  }

  async GetCantListVentaNeta(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = new _getCantListVentaNeta.default();
    let dbResult = await dbContextHana.GetCantListVentaNeta(query.codPais, query.campania, query.codRegi, query.codZona, query.tipo, query.facturacion);

    if (dbResult && dbResult.length > 0) {
      let data = dbResult[0];
      if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
      if (data.CAMPANIA) queryResult.CAMPANIA = data.CAMPANIA;
      if (data.TOTALCONSULTORAS) queryResult.TOTALCONSULTORAS = Number.parseInt(data.TOTALCONSULTORAS);
    }

    ctx.body = queryResult;
  }

  async GetCantSaldoPendienteRefac(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = new _getCantSaldoPendienteRefac.default();

    if (_settings.default.isEnableContingencia(query.codPais) === true) {
      let dbResult = await dbContextOracle.GetCantSaldoPendienteRefac(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc);

      if (dbResult && dbResult.length > 0) {
        let data = dbResult[0];
        if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) queryResult.CAMPANIA = data.CAMPANIA;
        if (data.TOTALPOSIBLES) queryResult.TOTALPOSIBLES = Number.parseInt(data.TOTALPOSIBLES);
      }
    } else {
      let dbResult = await dbContextHana.GetCantSaldoPendienteRefac(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc);

      if (dbResult && dbResult.length > 0) {
        let data = dbResult[0];
        if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) queryResult.CAMPANIA = data.CAMPANIA;
        if (data.TOTALPOSIBLES) queryResult.TOTALPOSIBLES = Number.parseInt(data.TOTALPOSIBLES);
      }
    }

    ctx.body = queryResult;
  }

  async GetCountListPegRefac(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = new _getCountListPegRefac.default();

    if (_settings.default.isEnableContingencia(query.codPais) === true) {
      let dbResult = await dbContextOracle.GetCountListPegRefac(query.codPais, query.campania, query.codRegi, query.codZona, query.facturacion);

      if (dbResult && dbResult.length > 0) {
        let data = dbResult[0];
        if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) queryResult.CAMPANIA = data.CAMPANIA;
        if (data.TOTALPEGS) queryResult.TOTALPEGS = Number.parseInt(data.TOTALPEGS);
      }
    } else {
      let dbResult = await dbContextHana.GetCountListPegRefac(query.codPais, query.campania, query.codRegi, query.codZona, query.facturacion);

      if (dbResult && dbResult.length > 0) {
        let data = dbResult[0];
        if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) queryResult.CAMPANIA = data.CAMPANIA;
        if (data.TOTALPEGS) queryResult.TOTALPEGS = Number.parseInt(data.TOTALPEGS);
      }
    }

    ctx.body = queryResult;
  }

  async GetEstadoConsultora(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = [];

    if (_settings.default.isEnableContingencia(query.codPais) === true) {
      let dbResult = await dbContextOracle.GetEstadoConsultora(query.codPais);

      if (dbResult && dbResult.length > 0) {
        for (let data of dbResult) {
          let itemQueryResult = new _getEstadoConsultora.default();
          if (data.IDESTADOACTIVIDAD) itemQueryResult.IDESTADOACTIVIDAD = Number.parseInt(data.IDESTADOACTIVIDAD);
          if (data.PAISID) itemQueryResult.PAISID = Number.parseInt(data.PAISID);
          if (data.CODIGOESTADOACTIVIDAD) itemQueryResult.CODIGOESTADOACTIVIDAD = data.CODIGOESTADOACTIVIDAD;
          if (data.DESCRIPCION) itemQueryResult.DESCRIPCION = data.DESCRIPCION;
          if (data.ESTADOACTIVO) itemQueryResult.ESTADOACTIVO = Number.parseInt(data.ESTADOACTIVO);
          queryResult.push(itemQueryResult);
        }
      }
    } else {
      let dbResult = await dbContextHana.GetEstadoConsultora(query.codPais);

      if (dbResult && dbResult.length > 0) {
        for (let data of dbResult) {
          let itemQueryResult = new _getEstadoConsultora.default();
          if (data.IDESTADOACTIVIDAD) itemQueryResult.IDESTADOACTIVIDAD = Number.parseInt(data.IDESTADOACTIVIDAD);
          if (data.PAISID) itemQueryResult.PAISID = Number.parseInt(data.PAISID);
          if (data.CODIGOESTADOACTIVIDAD) itemQueryResult.CODIGOESTADOACTIVIDAD = data.CODIGOESTADOACTIVIDAD;
          if (data.DESCRIPCION) itemQueryResult.DESCRIPCION = data.DESCRIPCION;
          if (data.ESTADOACTIVO) itemQueryResult.ESTADOACTIVO = Number.parseInt(data.ESTADOACTIVO);
          queryResult.push(itemQueryResult);
        }
      }
    }

    ctx.body = queryResult;
  }

  async GetGananciaSaldoRefac(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = new _getGananciaSaldoRefac.default();

    if (_settings.default.isEnableContingencia(query.codPais) === true) {
      let dbResult = await dbContextOracle.GetGananciaSaldoRefac(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc);

      if (dbResult && dbResult.length > 0) {
        let data = dbResult[0];
        if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) queryResult.CAMPANIA = data.CAMPANIA;
        if (data.FACTURADONETO) queryResult.FACTURADONETO = data.FACTURADONETO.toLocaleString(undefined, {
          maximumFractionDigits: 2
        });
        if (data.RECUPERADO) queryResult.RECUPERADO = data.RECUPERADO.toLocaleString(undefined, {
          maximumFractionDigits: 2
        });
        if (data.PORCENTAJE) queryResult.PORCENTAJE = Number.parseFloat(data.PORCENTAJE);
        if (data.GANANCIAPARCIAL) queryResult.GANANCIAPARCIAL = Number.parseFloat(data.GANANCIAPARCIAL);
        if (data.PORCENTAJERECUPERACION) queryResult.PORCENTAJERECUPERACION = Number.parseFloat(data.PORCENTAJERECUPERACION);
        if (data.GANANCIAPOTENCIAL) queryResult.GANANCIAPOTENCIAL = Number.parseFloat(data.GANANCIAPOTENCIAL);
        if (data.MONEDA) queryResult.MONEDA = data.MONEDA;
      }
    } else {
      let dbResult = await dbContextHana.GetGananciaSaldoRefac(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc);

      if (dbResult && dbResult.length > 0) {
        let data = dbResult[0];
        if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) queryResult.CAMPANIA = data.CAMPANIA;
        if (data.FACTURADONETO) queryResult.FACTURADONETO = data.FACTURADONETO.toLocaleString(undefined, {
          maximumFractionDigits: 2
        });
        if (data.RECUPERADO) queryResult.RECUPERADO = data.RECUPERADO.toLocaleString(undefined, {
          maximumFractionDigits: 2
        });
        if (data.PORCENTAJE) queryResult.PORCENTAJE = Number.parseFloat(data.PORCENTAJE);
        if (data.GANANCIAPARCIAL) queryResult.GANANCIAPARCIAL = Number.parseFloat(data.GANANCIAPARCIAL);
        if (data.PORCENTAJERECUPERACION) queryResult.PORCENTAJERECUPERACION = Number.parseFloat(data.PORCENTAJERECUPERACION);
        if (data.GANANCIAPOTENCIAL) queryResult.GANANCIAPOTENCIAL = Number.parseFloat(data.GANANCIAPOTENCIAL);
        if (data.MONEDA) queryResult.MONEDA = data.MONEDA;
      }
    }

    ctx.body = queryResult;
  }

  async GetIndicadorActividad(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = new _getIndicadorActividad.default();
    let dbResult = await dbContextHana.GetIndicadorActividad(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc, query.tipo);

    if (dbResult && dbResult.length > 0) {
      let data = dbResult[0];
      if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
      if (data.CAMPANIA) queryResult.CAMPANIA = data.CAMPANIA;
      if (data.CAMPANIAANT) queryResult.CAMPANIAANT = data.CAMPANIAANT;
      if (data.ACTIVIDADFDV) queryResult.ACTIVIDADFDV = Number.parseFloat(data.ACTIVIDADFDV);
      if (data.ACTIVIDADREAL) queryResult.ACTIVIDADREAL = Number.parseFloat(data.ACTIVIDADREAL);
      if (data.ACTIVASREAL) queryResult.ACTIVASREAL = Number.parseInt(data.ACTIVASREAL);
    }

    ctx.body = queryResult;
  }

  async GetIndicadorCapitalizacion(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = new _getIndicadorCapitalizacion.default();
    let dbResult = await dbContextHana.GetIndicadorCapitalizacion(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc, query.tipo);

    if (dbResult && dbResult.length > 0) {
      let data = dbResult[0];
      if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
      if (data.CAMPANIA) queryResult.CAMPANIA = data.CAMPANIA;
      if (data.CAMPANIAANT) queryResult.CAMPANIAANT = data.CAMPANIAANT;
      if (data.CAPITALIZACIONFDV) queryResult.CAPITALIZACIONFDV = Number.parseFloat(data.CAPITALIZACIONFDV);
      if (data.CAPITALIZACIONREAL) queryResult.CAPITALIZACIONREAL = Number.parseFloat(data.CAPITALIZACIONREAL);
      if (data.INGRESOSFDV) queryResult.INGRESOSFDV = Number.parseInt(data.INGRESOSFDV);
      if (data.INGRESOSREAL) queryResult.INGRESOSREAL = Number.parseInt(data.INGRESOSREAL);
      if (data.REINGRESOSFDV) queryResult.REINGRESOSFDV = Number.parseInt(data.REINGRESOSFDV);
      if (data.REINGRESOSREAL) queryResult.REINGRESOSREAL = Number.parseInt(data.REINGRESOSREAL);
      if (data.EGRESOSFDV) queryResult.EGRESOSFDV = Number.parseInt(data.EGRESOSFDV);
      if (data.EGRESOSREAL) queryResult.EGRESOSREAL = Number.parseInt(data.EGRESOSREAL);
    }

    ctx.body = queryResult;
  }

  async GetIndicadorCicloNuevas(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = new _getIndicadorCicloNuevas.default();

    if (_settings.default.isEnableContingencia(query.codPais) === true) {
      let dbResult = await dbContextOracle.GetIndicadorCicloNuevas(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc, query.tipo);

      if (dbResult && dbResult.length > 0) {
        let data = dbResult[0];
        if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
        if (data.C2D2FDV) queryResult.C2D2FDV = Number.parseInt(data.C2D2FDV);
        if (data.C2D2REAL) queryResult.C2D2REAL = Number.parseInt(data.C2D2REAL);
        if (data.C3D3FDV) queryResult.C3D3FDV = Number.parseInt(data.C3D3FDV);
        if (data.C3D3REAL) queryResult.C3D3REAL = Number.parseInt(data.C3D3REAL);
        if (data.C4D4FDV) queryResult.C4D4FDV = Number.parseInt(data.C4D4FDV);
        if (data.C4D4REAL) queryResult.C4D4REAL = Number.parseInt(data.C4D4REAL);
        if (data.C5D5FDV) queryResult.C5D5FDV = Number.parseInt(data.C5D5FDV);
        if (data.C5D5REAL) queryResult.C5D5REAL = Number.parseInt(data.C5D5REAL);
        if (data.C6D6REAL) queryResult.C6D6REAL = Number.parseInt(data.C6D6REAL);
      }
    } else {
      let dbResult = await dbContextHana.GetIndicadorCicloNuevas(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc, query.tipo);

      if (dbResult && dbResult.length > 0) {
        let data = dbResult[0];
        if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
        if (data.C2D2FDV) queryResult.C2D2FDV = Number.parseInt(data.C2D2FDV);
        if (data.C2D2REAL) queryResult.C2D2REAL = Number.parseInt(data.C2D2REAL);
        if (data.C3D3FDV) queryResult.C3D3FDV = Number.parseInt(data.C3D3FDV);
        if (data.C3D3REAL) queryResult.C3D3REAL = Number.parseInt(data.C3D3REAL);
        if (data.C4D4FDV) queryResult.C4D4FDV = Number.parseInt(data.C4D4FDV);
        if (data.C4D4REAL) queryResult.C4D4REAL = Number.parseInt(data.C4D4REAL);
        if (data.C5D5FDV) queryResult.C5D5FDV = Number.parseInt(data.C5D5FDV);
        if (data.C5D5REAL) queryResult.C5D5REAL = Number.parseInt(data.C5D5REAL);
        if (data.C6D6REAL) queryResult.C6D6REAL = Number.parseInt(data.C6D6REAL);
      }
    }

    ctx.body = queryResult;
  }

  async GetIndicadorPedidos(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = new _getIndicadorPedidos.default();
    let dbResult = await dbContextHana.GetIndicadorPedidos(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc);

    if (dbResult && dbResult.length > 0) {
      let data = dbResult[0];
      if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
      if (data.CAMPANIA) queryResult.CAMPANIA = data.CAMPANIA;
      if (data.PEDIDOSFDV) queryResult.PEDIDOSFDV = Number.parseInt(data.PEDIDOSFDV);
      if (data.PEDIDOSREAL) queryResult.PEDIDOSREAL = Number.parseInt(data.PEDIDOSREAL);
      if (data.PEDIDOSRESTANTES) queryResult.PEDIDOSRESTANTES = Number.parseInt(data.PEDIDOSRESTANTES);
    }

    ctx.body = queryResult;
  }

  async GetIndicadorPosibleConsecu(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = new _getIndicadorPosibleConsecu.default();

    if (_settings.default.isEnableContingencia(query.codPais) === true) {
      let dbResult = await dbContextOracle.GetIndicadorPosibleConsecu(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc, query.tipo);

      if (dbResult && dbResult.length > 0) {
        let data = dbResult[0];
        if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIAANT) queryResult.CAMPANIAANT = data.CAMPANIAANT;
        if (data.TOTALPOSIBLES) queryResult.TOTALPOSIBLES = Number.parseInt(data.TOTALPOSIBLES);
        if (data.NROPEDIDOS) queryResult.NROPEDIDOS = Number.parseInt(data.NROPEDIDOS);
        if (data.PEDCONSECUTIVO) queryResult.PEDCONSECUTIVO = Number.parseInt(data.PEDCONSECUTIVO);
        if (data.PEDCONSECUTIVOAV) queryResult.PEDCONSECUTIVOAV = Number.parseInt(data.PEDCONSECUTIVOAV);
        if (data.PEDCONSECUTIVOBV) queryResult.PEDCONSECUTIVOBV = Number.parseInt(data.PEDCONSECUTIVOBV);
        if (data.PEDNOCONSECUTIVO) queryResult.PEDNOCONSECUTIVO = Number.parseInt(data.PEDNOCONSECUTIVO);
        if (data.PORCONSECUTIVO) queryResult.PORCONSECUTIVO = Number.parseFloat(data.PORCONSECUTIVO);
        if (data.PORCONSECUTIVOAV) queryResult.PORCONSECUTIVOAV = Number.parseFloat(data.PORCONSECUTIVOAV);
        if (data.PORCONSECUTIVOBV) queryResult.PORCONSECUTIVOBV = Number.parseFloat(data.PORCONSECUTIVOBV);
        if (data.PORNOCONSECUTIVO) queryResult.PORNOCONSECUTIVO = Number.parseFloat(data.PORNOCONSECUTIVO);
        if (data.VTANETACONSECUTIVO) queryResult.VTANETACONSECUTIVO = Number.parseFloat(data.VTANETACONSECUTIVO);
        if (data.VTANETACONSECUTIVOAV) queryResult.VTANETACONSECUTIVOAV = Number.parseFloat(data.VTANETACONSECUTIVOAV);
        if (data.VTANETACONSECUTIVOBV) queryResult.VTANETACONSECUTIVOBV = Number.parseFloat(data.VTANETACONSECUTIVOBV);
        if (data.VTANETANOCONSECUTIVO) queryResult.VTANETANOCONSECUTIVO = Number.parseFloat(data.VTANETANOCONSECUTIVO);
      }
    } else {
      let dbResult = await dbContextHana.GetIndicadorPosibleConsecu(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc, query.tipo);

      if (dbResult && dbResult.length > 0) {
        let data = dbResult[0];

        if (data.ISOPAIS) {
          queryResult.ISOPAIS = data.ISOPAIS;
        }

        if (data.CAMPANIA) queryResult.CAMPANIA = data.CAMPANIA;
        if (data.TOTALPOSIBLES) queryResult.TOTALPOSIBLES = Number.parseInt(data.TOTALPOSIBLES);
        if (data.NROPEDIDOS) queryResult.NROPEDIDOS = Number.parseInt(data.NROPEDIDOS);
        if (data.PEDCONSECUTIVO) queryResult.PEDCONSECUTIVO = Number.parseInt(data.PEDCONSECUTIVO);
        if (data.PEDCONSECUTIVOAV) queryResult.PEDCONSECUTIVOAV = Number.parseInt(data.PEDCONSECUTIVOAV);
        if (data.PEDCONSECUTIVOBV) queryResult.PEDCONSECUTIVOBV = Number.parseInt(data.PEDCONSECUTIVOBV);
        if (data.PEDNOCONSECUTIVO) queryResult.PEDNOCONSECUTIVO = Number.parseInt(data.PEDNOCONSECUTIVO);
        if (data.PORCCONSECUTIVO) queryResult.PORCONSECUTIVO = Number.parseFloat(data.PORCCONSECUTIVO);
        if (data.PORCCONSECUTIVOAV) queryResult.PORCONSECUTIVOAV = Number.parseFloat(data.PORCCONSECUTIVOAV);
        if (data.PORCCONSECUTIVOBV) queryResult.PORCONSECUTIVOBV = Number.parseFloat(data.PORCCONSECUTIVOBV);
        if (data.PORCNOCONSECUTIVO) queryResult.PORNOCONSECUTIVO = Number.parseFloat(data.PORCNOCONSECUTIVO);
        if (data.VTANETACONSECUTIVO) queryResult.VTANETACONSECUTIVO = Number.parseFloat(data.VTANETACONSECUTIVO);
        if (data.VTANETACONSECUTIVOAV) queryResult.VTANETACONSECUTIVOAV = Number.parseFloat(data.VTANETACONSECUTIVOAV);
        if (data.VTANETACONSECUTIVOBV) queryResult.VTANETACONSECUTIVOBV = Number.parseFloat(data.VTANETACONSECUTIVOBV);
        if (data.VTANETANOCONSECUTIVO) queryResult.VTANETANOCONSECUTIVO = Number.parseFloat(data.VTANETANOCONSECUTIVO);
      }
    }

    ctx.body = queryResult;
  }

  async GetIndicadorPosiblesEgresos(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = new _getIndicadorPosiblesEgresos.default();
    let dbResult = await dbContextHana.GetIndicadorPosiblesEgresos(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc, query.tipo);

    if (dbResult && dbResult.length > 0) {
      let data = dbResult[0];
      if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
      if (data.CAMPANIAANTE) queryResult.CAMPANIAANT = data.CAMPANIAANTE;
      if (data.TOTALPEGS) queryResult.TOTALPEGS = Number.parseInt(data.TOTALPEGS);
    }

    ctx.body = queryResult;
  }

  async GetIndicadorVentas(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = new _getIndicadorVentas.default();
    let dbResult = await dbContextHana.GetIndicadorVentas(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc, query.tipo);

    if (dbResult && dbResult.length > 0) {
      let data = dbResult[0];
      if (data.ISOPAIS) queryResult.ISOPAIS = data.ISOPAIS;
      if (data.CAMPANIA) queryResult.CAMPANIA = data.CAMPANIA;
      if (data.VENTASFDV) queryResult.VENTASFDV = Number.parseFloat(data.VENTASFDV);
      if (data.VENTASREAL) queryResult.VENTASREAL = Number.parseFloat(data.VENTASREAL);
      if (data.VENTASRESTANTE) queryResult.VENTASRESTANTE = Number.parseFloat(data.VENTASRESTANTE);
      if (data.VENTASCATALOGO) queryResult.VENTASCATALOGO = Number.parseFloat(data.VENTASCATALOGO);
      if (data.MONEDA) queryResult.MONEDA = data.MONEDA;
    }

    ctx.body = queryResult;
  }

  async GetListActividadDev(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = [];
    let dbResult = await dbContextHana.GetListActividadDev(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc, query.facturacion);

    if (dbResult && dbResult.length > 0) {
      for (let data of dbResult) {
        let itemQueryResult = new _getListActividadDev.default();
        if (data.ISOPAIS) itemQueryResult.ISOPAIS = data.ISOPAIS;
        itemQueryResult.CAMPANIA = query.campania; //if (data.CAMPANIA)) itemQueryResult.CAMPANIA = data.CAMPANIA;

        if (data.REGION) itemQueryResult.REGION = data.REGION;
        if (data.ZONA) itemQueryResult.ZONA = data.ZONA;
        if (data.SECCION) itemQueryResult.SECCION = data.SECCION;
        if (data.NOMBRECOMPLETO) itemQueryResult.NOMBRECOMPLETO = data.NOMBRECOMPLETO;
        if (data.CODIGOCONSULTORA) itemQueryResult.CODIGOCONSULTORA = data.CODIGOCONSULTORA;
        if (data.TERRITORIO) itemQueryResult.TERRITORIO = data.TERRITORIO;
        if (data.TELEFONOCASA) itemQueryResult.TELEFONOCASA = data.TELEFONOCASA;
        if (data.TELEFONOCELULAR) itemQueryResult.TELEFONOCELULAR = data.TELEFONOCELULAR;
        if (data.CONSTANCIA) itemQueryResult.CONSTANCIA = data.CONSTANCIA;
        if (data.NIVEL) itemQueryResult.NIVEL = data.NIVEL;
        if (data.SALDOPENDIENTE) itemQueryResult.SALDOPENDIENTE = Number.parseFloat(data.SALDOPENDIENTE);
        if (data.DOCUMENTODEIDENTIDAD) itemQueryResult.DOCUMENTODEIDENTIDAD = data.DOCUMENTODEIDENTIDAD;
        if (data.DIRECCION) itemQueryResult.DIRECCION = data.DIRECCION;
        if (data.EMAIL) itemQueryResult.EMAIL = data.EMAIL;
        if (data.CUMPLEANIOS) itemQueryResult.CUMPLEANIOS = data.CUMPLEANIOS;
        if (data.FAMILIAPROTEGIDA) itemQueryResult.FAMILIAPROTEGIDA = data.FAMILIAPROTEGIDA;
        if (data.ESBRILLANTE) itemQueryResult.ESBRILLANTE = data.ESBRILLANTE;
        if (data.USAFLEXIPAGO) itemQueryResult.USAFLEXIPAGO = data.USAFLEXIPAGO;
        if (data.CAMPANIAINGRESO) itemQueryResult.CAMPANIAINGRESO = data.CAMPANIAINGRESO;
        if (data.ULTIMAFACTURACION) itemQueryResult.ULTIMAFACTURACION = data.ULTIMAFACTURACION;
        if (data.VAL_ORIG_PEDI) itemQueryResult.ORIGENPEDIDO = data.VAL_ORIG_PEDI;
        if (data.VENTAGANANCIA) itemQueryResult.VENTAGANANCIA = data.VENTAGANANCIA;
        if (data.PROMVENTACONSULTORA) itemQueryResult.PROMVENTACONSULTORA = data.PROMVENTACONSULTORA;
        if (data.VENTACONSULTORA) itemQueryResult.VENTACONSULTORA = data.VENTACONSULTORA;
        if (data.SEGMENTOORDEN) itemQueryResult.SEGMENTOORDEN = data.SEGMENTOORDEN;
        if (data.VtaCatalogoCX) itemQueryResult.VTACATALOGOCX = Number.parseFloat(data.VtaCatalogoCX);
        if (data.VtaCatalogoCX_1) itemQueryResult.VTACATALOGOCX_1 = Number.parseFloat(data.VtaCatalogoCX_1);
        if (data.VtaCatalogoCX_2) itemQueryResult.VTACATALOGOCX_2 = Number.parseFloat(data.VtaCatalogoCX_2);
        if (data.VtaCatalogoCX_3) itemQueryResult.VTACATALOGOCX_3 = Number.parseFloat(data.VtaCatalogoCX_3);
        if (data.VtaCatalogoCX_4) itemQueryResult.VTACATALOGOCX_4 = Number.parseFloat(data.VtaCatalogoCX_4);
        if (data.VtaCatalogoCX_5) itemQueryResult.VTACATALOGOCX_5 = Number.parseFloat(data.VtaCatalogoCX_5);
        if (data.VtaCatalogoCX_6) itemQueryResult.VTACATALOGOCX_6 = Number.parseFloat(data.VtaCatalogoCX_6);
        if (data.flagAV) itemQueryResult.FLAGAV = Number.parseInt(data.flagAV);
        if (data.flagAV_1) itemQueryResult.FLAGAV_1 = Number.parseInt(data.flagAV_1);
        if (data.flagAV_2) itemQueryResult.FLAGAV_2 = Number.parseInt(data.flagAV_2);
        if (data.flagAV_3) itemQueryResult.FLAGAV_3 = Number.parseInt(data.flagAV_3);
        if (data.flagAV_4) itemQueryResult.FLAGAV_4 = Number.parseInt(data.flagAV_4);
        if (data.flagAV_5) itemQueryResult.FLAGAV_5 = Number.parseInt(data.flagAV_5);
        if (data.flagAV_6) itemQueryResult.FLAGAV_6 = Number.parseInt(data.flagAV_6);
        if (data.VisibilidadVtaCx) itemQueryResult.VISIBILIDADVTACX = Number.parseInt(data.VisibilidadVtaCx);
        if (data.VisibilidadVtaCxMenos1) itemQueryResult.VISIBILIDADVTACXMENOS1 = Number.parseInt(data.VisibilidadVtaCxMenos1);
        if (data.VisibilidadVtaCxMenos2) itemQueryResult.VISIBILIDADVTACXMENOS2 = Number.parseInt(data.VisibilidadVtaCxMenos2);
        if (data.VisibilidadVtaCxMenos3) itemQueryResult.VISIBILIDADVTACXMENOS3 = Number.parseInt(data.VisibilidadVtaCxMenos3);
        if (data.VisibilidadVtaCxMenos4) itemQueryResult.VISIBILIDADVTACXMENOS4 = Number.parseInt(data.VisibilidadVtaCxMenos4);
        if (data.VisibilidadVtaCxMenos5) itemQueryResult.VISIBILIDADVTACXMENOS5 = Number.parseInt(data.VisibilidadVtaCxMenos5);
        if (data.VisibilidadVtaCxMenos6) itemQueryResult.VISIBILIDADVTACXMENOS6 = Number.parseInt(data.VisibilidadVtaCxMenos6);
        if (data.VAL_NOM1) itemQueryResult.PRIMERNOMBRE = data.VAL_NOM1;
        if (data.VAL_NOM2) itemQueryResult.SEGUNDONOMBRE = data.VAL_NOM2;
        if (data.VAL_APE1) itemQueryResult.PRIMERAPELLIDO = data.VAL_APE1;
        if (data.VAL_APE2) itemQueryResult.SEGUNDOAPELLIDO = data.VAL_APE2;
        if (data.RANGO) itemQueryResult.RANGO = data.RANGO;
        if (data.TOTALTOVALOR) itemQueryResult.TOTALALTOVALO = Number.parseInt(data.TOTALTOVALOR);
        queryResult.push(itemQueryResult);
      }
    }

    ctx.body = queryResult;
  }

  async GetListActividad(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = [];
    let dbResult = await dbContextHana.GetListActividad(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc, query.facturacion);

    if (dbResult && dbResult.length > 0) {
      for (let data of dbResult) {
        let itemQueryResult = new _getListActividad.default();
        if (data.ISOPAIS) itemQueryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) itemQueryResult.CAMPANIA = data.CAMPANIA;
        if (data.REGION) itemQueryResult.REGION = data.REGION;
        if (data.ZONA) itemQueryResult.ZONA = data.ZONA;
        if (data.SECCION) itemQueryResult.SECCION = data.SECCION;
        if (data.NOMBRECOMPLETO) itemQueryResult.NOMBRECOMPLETO = data.NOMBRECOMPLETO;
        if (data.CODIGOCONSULTORA) itemQueryResult.CODIGOCONSULTORA = data.CODIGOCONSULTORA;
        if (data.TERRITORIO) itemQueryResult.TERRITORIO = data.TERRITORIO;
        if (data.TELEFONOCASA) itemQueryResult.TELEFONOCASA = data.TELEFONOCASA;
        if (data.TELEFONOCELULAR) itemQueryResult.TELEFONOCELULAR = data.TELEFONOCELULAR;
        if (data.CONSTANCIA) itemQueryResult.CONSTANCIA = data.CONSTANCIA.toString();
        if (data.NIVEL) itemQueryResult.NIVEL = data.NIVEL;
        if (data.SALDOPENDIENTE) itemQueryResult.SALDOPENDIENTE = Number.parseFloat(data.SALDOPENDIENTE);
        if (data.DOCUMENTODEIDENTIDAD) itemQueryResult.DOCUMENTODEIDENTIDAD = data.DOCUMENTODEIDENTIDAD;
        if (data.DIRECCION) itemQueryResult.DIRECCION = data.DIRECCION;
        if (data.EMAIL) itemQueryResult.EMAIL = data.EMAIL;
        if (data.CUMPLEANIOS) itemQueryResult.CUMPLEANIOS = data.CUMPLEANIOS;
        if (data.FAMILIAPROTEGIDA) itemQueryResult.FAMILIAPROTEGIDA = data.FAMILIAPROTEGIDA;
        if (data.ESBRILLANTE) itemQueryResult.ESBRILLANTE = data.ESBRILLANTE;
        if (data.USAFLEXIPAGO) itemQueryResult.USAFLEXIPAGO = data.USAFLEXIPAGO;
        if (data.CAMPANIAINGRESO) itemQueryResult.CAMPANIAINGRESO = data.CAMPANIAINGRESO;
        if (data.ULTIMAFACTURACION) itemQueryResult.ULTIMAFACTURACION = data.ULTIMAFACTURACION;
        if (data.ORIGENPEDIDO) itemQueryResult.ORIGENPEDIDO = data.ORIGENPEDIDO;
        if (data.VENTAGANANCIA) itemQueryResult.VENTAGANANCIA = data.VENTAGANANCIA.toString();
        if (data.PROMVENTACONSULTORA) itemQueryResult.PROMVENTACONSULTORA = data.PROMVENTACONSULTORA.toString();
        if (data.VENTACONSULTORA) itemQueryResult.VENTACONSULTORA = data.VENTACONSULTORA.toString();
        if (data.SEGMENTOORDEN) itemQueryResult.SEGMENTOORDEN = data.SEGMENTOORDEN;
        if (data.VTACATALOGOCX) itemQueryResult.VTACATALOGOCX = Number.parseFloat(data.VTACATALOGOCX);
        if (data.VTACATALOGOCX_1) itemQueryResult.VTACATALOGOCX_1 = Number.parseFloat(data.VTACATALOGOCX_1);
        if (data.VTACATALOGOCX_2) itemQueryResult.VTACATALOGOCX_2 = Number.parseFloat(data.VTACATALOGOCX_2);
        if (data.VTACATALOGOCX_3) itemQueryResult.VTACATALOGOCX_3 = Number.parseFloat(data.VTACATALOGOCX_3);
        if (data.VTACATALOGOCX_4) itemQueryResult.VTACATALOGOCX_4 = Number.parseFloat(data.VTACATALOGOCX_4);
        if (data.VTACATALOGOCX_5) itemQueryResult.VTACATALOGOCX_5 = Number.parseFloat(data.VTACATALOGOCX_5);
        if (data.VTACATALOGOCX_6) itemQueryResult.VTACATALOGOCX_6 = Number.parseFloat(data.VTACATALOGOCX_6);
        if (data.FLAGAV) itemQueryResult.FLAGAV = Number.parseInt(data.FLAGAV);
        if (data.FLAGAV_1) itemQueryResult.FLAGAV_1 = Number.parseInt(data.FLAGAV_1);
        if (data.FLAGAV_2) itemQueryResult.FLAGAV_2 = Number.parseInt(data.FLAGAV_2);
        if (data.FLAGAV_3) itemQueryResult.FLAGAV_3 = Number.parseInt(data.FLAGAV_3);
        if (data.FLAGAV_4) itemQueryResult.FLAGAV_4 = Number.parseInt(data.FLAGAV_4);
        if (data.FLAGAV_5) itemQueryResult.FLAGAV_5 = Number.parseInt(data.FLAGAV_5);
        if (data.FLAGAV_6) itemQueryResult.FLAGAV_6 = Number.parseInt(data.FLAGAV_6);
        if (data.VISIBILIDADVTACX) itemQueryResult.VISIBILIDADVTACX = Number.parseInt(data.VISIBILIDADVTACX);
        if (data.VISIBILIDADVTACXMENOS1) itemQueryResult.VISIBILIDADVTACXMENOS1 = Number.parseInt(data.VISIBILIDADVTACXMENOS1);
        if (data.VISIBILIDADVTACXMENOS2) itemQueryResult.VISIBILIDADVTACXMENOS2 = Number.parseInt(data.VISIBILIDADVTACXMENOS2);
        if (data.VISIBILIDADVTACXMENOS3) itemQueryResult.VISIBILIDADVTACXMENOS3 = Number.parseInt(data.VISIBILIDADVTACXMENOS3);
        if (data.VISIBILIDADVTACXMENOS4) itemQueryResult.VISIBILIDADVTACXMENOS4 = Number.parseInt(data.VISIBILIDADVTACXMENOS4);
        if (data.VISIBILIDADVTACXMENOS5) itemQueryResult.VISIBILIDADVTACXMENOS5 = Number.parseInt(data.VISIBILIDADVTACXMENOS5);
        if (data.VISIBILIDADVTACXMENOS6) itemQueryResult.VISIBILIDADVTACXMENOS6 = Number.parseInt(data.VISIBILIDADVTACXMENOS6);
        if (data.PRIMERNOMBRE) itemQueryResult.PRIMERNOMBRE = data.PRIMERNOMBRE;
        if (data.SEGUNDONOMBRE) itemQueryResult.SEGUNDONOMBRE = data.SEGUNDONOMBRE;
        if (data.PRIMERAPELLIDO) itemQueryResult.PRIMERAPELLIDO = data.PRIMERAPELLIDO;
        if (data.SEGUNDOAPELLIDO) itemQueryResult.SEGUNDOAPELLIDO = data.SEGUNDOAPELLIDO;
        if (data.RANGO) itemQueryResult.RANGO = data.RANGO;
        if (data.TOTALALTOVALO) itemQueryResult.TOTALALTOVALO = Number.parseInt(data.TOTALALTOVALO);
        queryResult.push(itemQueryResult);
      }
    }

    ctx.body = queryResult;
  }

  async GetListCapitalizacionRefac(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = [];
    let dbResult = await dbContextHana.GetListCapitalizacionRefac(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc, query.tipo, query.facturacion);

    if (dbResult && dbResult.length > 0) {
      for (let data of dbResult) {
        let itemQueryResult = new _getListCapitalizacionRefac.default();
        if (data.ISOPAIS) itemQueryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) itemQueryResult.CAMPANIA = data.CAMPANIA;
        if (data.REGION) itemQueryResult.REGION = data.REGION;
        if (data.ZONA) itemQueryResult.ZONA = data.ZONA;
        if (data.SECCION) itemQueryResult.SECCION = data.SECCION;
        if (data.NOMBRECOMPLETO) itemQueryResult.NOMBRECOMPLETO = data.NOMBRECOMPLETO;
        if (data.CODIGOCONSULTORA) itemQueryResult.CODIGOCONSULTORA = data.CODIGOCONSULTORA;
        if (data.TERRITORIO) itemQueryResult.TERRITORIO = data.TERRITORIO;
        if (data.TELEFONOCASA) itemQueryResult.TELEFONOCASA = data.TELEFONOCASA;
        if (data.TELEFONOCELULAR) itemQueryResult.TELEFONOCELULAR = data.TELEFONOCELULAR;
        if (data.CONSTANCIA) itemQueryResult.CONSTANCIA = data.CONSTANCIA.toString();
        if (data.NIVEL) itemQueryResult.NIVEL = data.NIVEL;
        if (data.SALDOPENDIENTE) itemQueryResult.SALDOPENDIENTE = data.SALDOPENDIENTE.toString();
        if (data.DOCUMENTODEIDENTIDAD) itemQueryResult.DOCUMENTODEIDENTIDAD = data.DOCUMENTODEIDENTIDAD;
        if (data.DIRECCION) itemQueryResult.DIRECCION = data.DIRECCION;
        if (data.EMAIL) itemQueryResult.EMAIL = data.EMAIL;
        if (data.CUMPLEANIOS) itemQueryResult.CUMPLEANIOS = data.CUMPLEANIOS;
        if (data.FAMILIAPROTEGIDA) itemQueryResult.FAMILIAPROTEGIDA = data.FAMILIAPROTEGIDA;
        if (data.ESBRILLANTE) itemQueryResult.ESBRILLANTE = data.ESBRILLANTE;
        if (data.USAFLEXIPAGO) itemQueryResult.USAFLEXIPAGO = data.USAFLEXIPAGO;
        if (data.CAMPANIAINGRESO) itemQueryResult.CAMPANIAINGRESO = data.CAMPANIAINGRESO;
        if (data.ULTIMAFACTURACION) itemQueryResult.ULTIMAFACTURACION = data.ULTIMAFACTURACION;
        if (data.ORIGENPEDIDO) itemQueryResult.ORIGENPEDIDO = data.ORIGENPEDIDO;
        if (data.VENTAGANANCIA) itemQueryResult.VENTAGANANCIA = data.VENTAGANANCIA.toString();
        if (data.PROMVENTACONSULTORA) itemQueryResult.PROMVENTACONSULTORA = data.PROMVENTACONSULTORA.toString();
        if (data.VENTACONSULTORA) itemQueryResult.VENTACONSULTORA = data.VENTACONSULTORA.toString();
        if (data.SEGMENTOORDEN) itemQueryResult.SEGMENTOORDEN = data.SEGMENTOORDEN;
        if (data.VTACATALOGOCX) itemQueryResult.VTACATALOGOCX = data.VTACATALOGOCX.toString();
        if (data.VTACATALOGOCX_1) itemQueryResult.VTACATALOGOCX_1 = data.VTACATALOGOCX_1.toString();
        if (data.VTACATALOGOCX_2) itemQueryResult.VTACATALOGOCX_2 = data.VTACATALOGOCX_2.toString();
        if (data.VTACATALOGOCX_3) itemQueryResult.VTACATALOGOCX_3 = data.VTACATALOGOCX_3.toString();
        if (data.VTACATALOGOCX_4) itemQueryResult.VTACATALOGOCX_4 = data.VTACATALOGOCX_4.toString();
        if (data.VTACATALOGOCX_5) itemQueryResult.VTACATALOGOCX_5 = data.VTACATALOGOCX_5.toString();
        if (data.VTACATALOGOCX_6) itemQueryResult.VTACATALOGOCX_6 = data.VTACATALOGOCX_6.toString();
        if (data.FLAGAV) itemQueryResult.FLAGAV = data.FLAGAV.toString();
        if (data.FLAGAV_1) itemQueryResult.FLAGAV_1 = data.FLAGAV_1.toString();
        if (data.FLAGAV_2) itemQueryResult.FLAGAV_2 = data.FLAGAV_2.toString();
        if (data.FLAGAV_3) itemQueryResult.FLAGAV_3 = data.FLAGAV_3.toString();
        if (data.FLAGAV_4) itemQueryResult.FLAGAV_4 = data.FLAGAV_4.toString();
        if (data.FLAGAV_5) itemQueryResult.FLAGAV_5 = data.FLAGAV_5.toString();
        if (data.FLAGAV_6) itemQueryResult.FLAGAV_6 = data.FLAGAV_6.toString();
        if (data.VISIBILIDADVTACX) itemQueryResult.VISIBILIDADVTACX = data.VISIBILIDADVTACX.toString();
        if (data.VISIBILIDADVTACXMENOS1) itemQueryResult.VISIBILIDADVTACXMENOS1 = data.VISIBILIDADVTACXMENOS1.toString();
        if (data.VISIBILIDADVTACXMENOS2) itemQueryResult.VISIBILIDADVTACXMENOS2 = data.VISIBILIDADVTACXMENOS2.toString();
        if (data.VISIBILIDADVTACXMENOS3) itemQueryResult.VISIBILIDADVTACXMENOS3 = data.VISIBILIDADVTACXMENOS3.toString();
        if (data.VISIBILIDADVTACXMENOS4) itemQueryResult.VISIBILIDADVTACXMENOS4 = data.VISIBILIDADVTACXMENOS4.toString();
        if (data.VISIBILIDADVTACXMENOS5) itemQueryResult.VISIBILIDADVTACXMENOS5 = data.VISIBILIDADVTACXMENOS5.toString();
        if (data.VISIBILIDADVTACXMENOS6) itemQueryResult.VISIBILIDADVTACXMENOS6 = data.VISIBILIDADVTACXMENOS6.toString();
        if (data.PRIMERNOMBRE) itemQueryResult.PRIMERNOMBRE = data.PRIMERNOMBRE;
        if (data.SEGUNDONOMBRE) itemQueryResult.SEGUNDONOMBRE = data.SEGUNDONOMBRE;
        if (data.PRIMERAPELLIDO) itemQueryResult.PRIMERAPELLIDO = data.PRIMERAPELLIDO50;
        if (data.SEGUNDOAPELLIDO) itemQueryResult.SEGUNDOAPELLIDO = data.SEGUNDOAPELLIDO;
        if (data.RANGO) itemQueryResult.RANGO = data.RANGO;
        if (data.TOTALALTOVALOR) itemQueryResult.TOTALALTOVALOR = data.TOTALALTOVALOR.toString();
        queryResult.push(itemQueryResult);
      }
    }

    ctx.body = queryResult;
  }

  async GetListCicloNuevasAll(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = [];
    let dbResult = await dbContextHana.GetListCicloNuevasAll(query.codPais, query.campania, query.codZona, query.codSecc, query.tipo, query.indConsul);

    if (dbResult && dbResult.length > 0) {
      for (let data of dbResult) {
        let itemQueryResult = new _getListCicloNuevasAll.default();
        if (data.ISOPAIS) itemQueryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) itemQueryResult.CAMPANIA = data.CAMPANIA;
        if (data.NOMBRECOMPLETO) itemQueryResult.CAMPANIA = data.NOMBRECOMPLETO;
        if (data.CODIGOCONSULTORA) itemQueryResult.CODIGOCONSULTORA = data.CODIGOCONSULTORA;
        if (data.REGION) itemQueryResult.REGION = data.REGION;
        if (data.ZONA) itemQueryResult.ZONA = data.ZONA;
        if (data.SECCION) itemQueryResult.SECCION = data.SECCION;
        if (data.TERRITORIO) itemQueryResult.TERRITORIO = data.TERRITORIO;
        if (data.TELEFONOCASA) itemQueryResult.TELEFONOCASA = data.TELEFONOCASA;
        if (data.TELEFONOCELULAR) itemQueryResult.TELEFONOCELULAR = data.TELEFONOCELULAR;
        if (data.CONSTANCIA) itemQueryResult.CONSTANCIA = data.CONSTANCIA;
        if (data.NIVEL) itemQueryResult.NIVEL = data.NIVEL;
        if (data.SALDOPENDIENTE) itemQueryResult.SALDOPENDIENTE = data.SALDOPENDIENTE;
        if (data.DOCUMENTODEIDENTIDAD) itemQueryResult.DOCUMENTODEIDENTIDAD = data.DOCUMENTODEIDENTIDAD;
        if (data.DIRECCION) itemQueryResult.DIRECCION = data.DIRECCION;
        if (data.EMAIL) itemQueryResult.EMAIL = data.EMAIL;
        if (data.CUMPLEANIOS) itemQueryResult.CUMPLEANIOS = data.CUMPLEANIOS;
        if (data.FAMILIAPROTEGIDA) itemQueryResult.FAMILIAPROTEGIDA = data.FAMILIAPROTEGIDA;
        if (data.ESBRILLANTE) itemQueryResult.ESBRILLANTE = data.ESBRILLANTE;
        if (data.USAFLEXIPAGO) itemQueryResult.USAFLEXIPAGO = data.USAFLEXIPAGO;
        if (data.CAMPANIAINGRESO) itemQueryResult.CAMPANIAINGRESO = data.CAMPANIAINGRESO;
        if (data.ULTIMAFACTURACION) itemQueryResult.ULTIMAFACTURACION = data.ULTIMAFACTURACION;
        if (data.ORIGENPEDIDO) itemQueryResult.ORIGENPEDIDO = data.ORIGENPEDIDO;
        if (data.VENTAGANANCIA) itemQueryResult.VENTAGANANCIA = data.VENTAGANANCIA;
        if (data.PROMVENTACONSULTORA) itemQueryResult.PROMVENTACONSULTORA = data.PROMVENTACONSULTORA;
        if (data.VENTACONSULTORA) itemQueryResult.VENTACONSULTORA = data.VENTACONSULTORA;
        if (data.SEGMENTOORDEN) itemQueryResult.SEGMENTOORDEN = data.SEGMENTOORDEN;
        if (data.VTACATALOGOCX) itemQueryResult.VTACATALOGOCX = data.VTACATALOGOCX;
        if (data.VTACATALOGOCX_1) itemQueryResult.VTACATALOGOCX_1 = data.VTACATALOGOCX_1;
        if (data.VTACATALOGOCX_2) itemQueryResult.VTACATALOGOCX_2 = data.VTACATALOGOCX_2;
        if (data.VTACATALOGOCX_3) itemQueryResult.VTACATALOGOCX_3 = data.VTACATALOGOCX_3;
        if (data.VTACATALOGOCX_4) itemQueryResult.VTACATALOGOCX_4 = data.VTACATALOGOCX_4;
        if (data.VTACATALOGOCX_5) itemQueryResult.VTACATALOGOCX_5 = data.VTACATALOGOCX_5;
        if (data.VTACATALOGOCX_6) itemQueryResult.VTACATALOGOCX_6 = data.VTACATALOGOCX_6;
        if (data.FLAGAV) itemQueryResult.FLAGAV = data.FLAGAV;
        if (data.FLAGAV_1) itemQueryResult.FLAGAV_1 = data.FLAGAV_1;
        if (data.FLAGAV_2) itemQueryResult.FLAGAV_2 = data.FLAGAV_2;
        if (data.FLAGAV_3) itemQueryResult.FLAGAV_3 = data.FLAGAV_3;
        if (data.FLAGAV_4) itemQueryResult.FLAGAV_4 = data.FLAGAV_4;
        if (data.FLAGAV_5) itemQueryResult.FLAGAV_5 = data.FLAGAV_5;
        if (data.FLAGAV_6) itemQueryResult.FLAGAV_6 = data.FLAGAV_6;
        if (data.VISIBILIDADVTACX) itemQueryResult.VISIBILIDADVTACX = data.VISIBILIDADVTACX;
        if (data.VISIBILIDADVTACXMENOS1) itemQueryResult.VISIBILIDADVTACXMENOS1 = data.VISIBILIDADVTACXMENOS1;
        if (data.VISIBILIDADVTACXMENOS2) itemQueryResult.VISIBILIDADVTACXMENOS2 = data.VISIBILIDADVTACXMENOS2;
        if (data.VISIBILIDADVTACXMENOS3) itemQueryResult.VISIBILIDADVTACXMENOS3 = data.VISIBILIDADVTACXMENOS3;
        if (data.VISIBILIDADVTACXMENOS4) itemQueryResult.VISIBILIDADVTACXMENOS4 = data.VISIBILIDADVTACXMENOS4;
        if (data.VISIBILIDADVTACXMENOS5) itemQueryResult.VISIBILIDADVTACXMENOS5 = data.VISIBILIDADVTACXMENOS5;
        if (data.VISIBILIDADVTACXMENOS6) itemQueryResult.VISIBILIDADVTACXMENOS6 = data.VISIBILIDADVTACXMENOS6;
        if (data.RANGO) itemQueryResult.RANGO = data.RANGO;
        if (data.TOTALALTOVALOR) itemQueryResult.TOTALALTOVALOR = data.TOTALALTOVALOR;
        if (data.PRIMERNOMBRE) itemQueryResult.PRIMERNOMBRE = data.PRIMERNOMBRE;
        if (data.SEGUNDONOMBRE) itemQueryResult.SEGUNDONOMBRE = data.SEGUNDONOMBRE;
        if (data.PRIMERAPELLIDO) itemQueryResult.PRIMERAPELLIDO = data.PRIMERAPELLIDO;
        if (data.SEGUNDOAPELLIDO) itemQueryResult.SEGUNDOAPELLIDO = data.SEGUNDOAPELLIDO;
        if (data.FASE) itemQueryResult.FASE = data.FASE;
        if (data.INDTAB) itemQueryResult.INDTAB = data.INDTAB;
        queryResult.push(itemQueryResult);
      }
    }

    ctx.body = queryResult;
  }

  async GetListCicloNuevas(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = [];
    let dbResult = await dbContextHana.GetListCicloNuevas(query.codPais, query.campania, query.codZona, query.codSecc, query.tipo);

    if (dbResult && dbResult.length > 0) {
      for (let data of dbResult) {
        let itemQueryResult = new _getListCicloNuevas.default();
        if (data.ISOPAIS) itemQueryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) itemQueryResult.CAMPANIA = data.CAMPANIA;
        if (data.NOMBRECOMPLETO) itemQueryResult.NOMBRECOMPLETO = data.NOMBRECOMPLETO;
        if (data.CODIGOCONSULTORA) itemQueryResult.CODIGOCONSULTORA = data.CODIGOCONSULTORA;
        if (data.REGION) itemQueryResult.REGION = data.REGION;
        if (data.ZONA) itemQueryResult.ZONA = data.ZONA;
        if (data.SECCION) itemQueryResult.SECCION = data.SECCION;
        if (data.TERRITORRIO) itemQueryResult.TERRITORIO = data.TERRITORIO;
        if (data.TELEFONOCASA) itemQueryResult.TELEFONOCASA = data.TELEFONOCASA;
        if (data.TELEFONOCELULAR) itemQueryResult.TELEFONOCELULAR = data.TELEFONOCELULAR;
        if (data.CONSTANCIA) itemQueryResult.CONSTANCIA = data.CONSTANCIA.toString();
        if (data.NIVEL) itemQueryResult.NIVEL = data.NIVEL;
        if (data.SALDOPENDIENTE) itemQueryResult.SALDOPENDIENTE = Number.parseFloat(data.SALDOPENDIENTE);
        if (data.DOCUMENTODEIDENTIDAD) itemQueryResult.DOCUMENTODEIDENTIDAD = data.DOCUMENTODEIDENTIDAD;
        if (data.DIRECCION) itemQueryResult.DIRECCION = data.DIRECCION;
        if (data.EMAIL) itemQueryResult.EMAIL = data.EMAIL;
        if (data.CUMPLEANIOS) itemQueryResult.CUMPLEANIOS = data.CUMPLEANIOS;
        if (data.FAMILIAPROTEGIDA) itemQueryResult.FAMILIAPROTEGIDA = data.FAMILIAPROTEGIDA;
        if (data.ESBRILLANTE) itemQueryResult.ESBRILLANTE = data.ESBRILLANTE;
        if (data.USAFLEXIPAGO) itemQueryResult.USAFLEXIPAGO = data.USAFLEXIPAGO;
        if (data.CAMPANIAINGRESO) itemQueryResult.CAMPANIAINGRESO = data.CAMPANIAINGRESO;
        if (data.ULTIMAFACTURACION) itemQueryResult.ULTIMAFACTURACION = data.ULTIMAFACTURACION;
        if (data.ORIGENPEDIDO) itemQueryResult.ORIGENPEDIDO = data.ORIGENPEDIDO;
        if (data.VENTAGANANCIA) itemQueryResult.VENTAGANANCIA = Number.parseFloat(data.VENTAGANANCIA);
        if (data.PROMVENTACONSULTORA) itemQueryResult.PROMVENTACONSULTORA = Number.parseFloat(data.PROMVENTACONSULTORA);
        if (data.VENTACONSULTORA) itemQueryResult.VENTACONSULTORA = Number.parseFloat(data.VENTACONSULTORA);
        if (data.SEGMENTOORDEN) itemQueryResult.SEGMENTOORDEN = data.SEGMENTOORDEN;
        if (data.VTACATALOGOCX) itemQueryResult.VTACATALOGOCX = Number.parseFloat(data.VTACATALOGOCX);
        if (data.VTACATALOGOCX_1) itemQueryResult.VTACATALOGOCX_1 = Number.parseFloat(data.VTACATALOGOCX_1);
        if (data.VTACATALOGOCX_2) itemQueryResult.VTACATALOGOCX_2 = Number.parseFloat(data.VTACATALOGOCX_2);
        if (data.VTACATALOGOCX_3) itemQueryResult.VTACATALOGOCX_3 = Number.parseFloat(data.VTACATALOGOCX_3);
        if (data.VTACATALOGOCX_4) itemQueryResult.VTACATALOGOCX_4 = Number.parseFloat(data.VTACATALOGOCX_4);
        if (data.VTACATALOGOCX_5) itemQueryResult.VTACATALOGOCX_5 = Number.parseFloat(data.VTACATALOGOCX_5);
        if (data.VTACATALOGOCX_6) itemQueryResult.VTACATALOGOCX_6 = Number.parseFloat(data.VTACATALOGOCX_6);
        if (data.FLAGAV) itemQueryResult.FLAGAV = Number.parseInt(data.FLAGAV);
        if (data.FLAGAV_1) itemQueryResult.FLAGAV_1 = Number.parseInt(data.FLAGAV_1);
        if (data.FLAGAV_2) itemQueryResult.FLAGAV_2 = Number.parseInt(data.FLAGAV_2);
        if (data.FLAGAV_3) itemQueryResult.FLAGAV_3 = Number.parseInt(data.FLAGAV_3);
        if (data.FLAGAV_4) itemQueryResult.FLAGAV_4 = Number.parseInt(data.FLAGAV_4);
        if (data.FLAGAV_5) itemQueryResult.FLAGAV_5 = Number.parseInt(data.FLAGAV_5);
        if (data.FLAGAV_6) itemQueryResult.FLAGAV_6 = Number.parseInt(data.FLAGAV_6);
        if (data.VISIBILIDADVTACX) itemQueryResult.VISIBILIDADVTACX = Number.parseInt(data.VISIBILIDADVTACX);
        if (data.VISIBILIDADVTACXMENOS1) itemQueryResult.VISIBILIDADVTACXMENOS1 = Number.parseInt(data.VISIBILIDADVTACXMENOS1);
        if (data.VISIBILIDADVTACXMENOS2) itemQueryResult.VISIBILIDADVTACXMENOS2 = Number.parseInt(data.VISIBILIDADVTACXMENOS2);
        if (data.VISIBILIDADVTACXMENOS3) itemQueryResult.VISIBILIDADVTACXMENOS3 = Number.parseInt(data.VISIBILIDADVTACXMENOS3);
        if (data.VISIBILIDADVTACXMENOS4) itemQueryResult.VISIBILIDADVTACXMENOS4 = Number.parseInt(data.VISIBILIDADVTACXMENOS4);
        if (data.VISIBILIDADVTACXMENOS5) itemQueryResult.VISIBILIDADVTACXMENOS5 = Number.parseInt(data.VISIBILIDADVTACXMENOS5);
        if (data.VISIBILIDADVTACXMENOS6) itemQueryResult.VISIBILIDADVTACXMENOS6 = Number.parseInt(data.VISIBILIDADVTACXMENOS6);
        if (data.RANGO) itemQueryResult.RANGO = data.RANGO;
        if (data.TOTALALTOVALOR) itemQueryResult.TOTALALTOVALOR = Number.parseInt(data.TOTALALTOVALOR);
        if (data.PRIMERNOMBRE) itemQueryResult.PRIMERNOMBRE = data.PRIMERNOMBRE;
        if (data.SEGUNDONOMBRE) itemQueryResult.SEGUNDONOMBRE = data.SEGUNDONOMBRE;
        if (data.PRIMERAPELLIDO) itemQueryResult.PRIMERAPELLIDO = data.PRIMERAPELLIDO;
        if (data.SEGUNDOAPELLIDO) itemQueryResult.SEGUNDOAPELLIDO = data.SEGUNDOAPELLIDO;
        queryResult.push(itemQueryResult);
      }
    }

    ctx.body = queryResult;
  }

  async GetListGananciaYSaldo(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = [];
    let dbResult = await dbContextHana.GetListGananciaYSaldo(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc);

    if (dbResult && dbResult.length > 0) {
      for (let data of dbResult) {
        let itemQueryResult = new _getListGananciaYSaldo.default();
        if (data.ISOPAIS) itemQueryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) itemQueryResult.CAMPANIA = data.CAMPANIA;
        if (data.REGION) itemQueryResult.REGION = data.REGION;
        if (data.ZONA) itemQueryResult.ZONA = data.ZONA;
        if (data.SECCION) itemQueryResult.SECCION = data.SECCION;
        if (data.NOMBRECOMPLETO) itemQueryResult.NOMBRECOMPLETO = data.NOMBRECOMPLETO;
        if (data.PRIMERNOMBRE) itemQueryResult.PRIMERNOMBRE = data.PRIMERNOMBRE;
        if (data.SEGUNDONOMBRE) itemQueryResult.SEGUNDONOMBRE = data.SEGUNDONOMBRE;
        if (data.PRIMERAPELLIDO) itemQueryResult.PRIMERAPELLIDO = data.PRIMERAPELLIDO;
        if (data.SEGUNDOAPELLIDO) itemQueryResult.SEGUNDOAPELLIDO = data.SEGUNDOAPELLIDO;
        if (data.CODIGOCONSULTORA) itemQueryResult.CODIGOCONSULTORA = data.CODIGOCONSULTORA;
        if (data.CONSECUTIVA) itemQueryResult.CONSECUTIVA = data.CONSECUTIVA;
        if (data.SALDOPENDIENTE) itemQueryResult.SALDOPENDIENTE = Number.parseFloat(data.SALDOPENDIENTE);
        if (data.VENTAFACTURA) itemQueryResult.VENTAFACTURA = Number.parseFloat(data.VENTAFACTURA);
        if (data.RECAUDOTOTAL) itemQueryResult.RECAUDOTOTAL = Number.parseFloat(data.RECAUDOTOTAL);
        if (data.RECAUDOCOMISIONABLE) itemQueryResult.RECAUDOCOMISIONABLE = Number.parseFloat(data.RECAUDOCOMISIONABLE);
        if (data.GANANCIA) itemQueryResult.GANANCIA = Number.parseFloat(data.GANANCIA);
        if (data.DOCUMENTODEIDENTIDAD) itemQueryResult.DOCUMENTODEIDENTIDAD = data.DOCUMENTODEIDENTIDAD;
        if (data.DIRECCION) itemQueryResult.DIRECCION = data.DIRECCION;
        if (data.TELEFONOCELULAR) itemQueryResult.TELEFONOCELULAR = data.TELEFONOCELULAR;
        if (data.EMAIL) itemQueryResult.EMAIL = data.EMAIL;
        if (data.CAMPANIAINGRESO) itemQueryResult.CAMPANIAINGRESO = data.CAMPANIAINGRESO;
        if (data.VENTAGANANCIA) itemQueryResult.VENTAGANANCIA = Number.parseFloat(data.VENTAGANANCIA);
        if (data.RECAUDONOCOMISIONABLE) itemQueryResult.RECAUDONOCOMISIONABLE = Number.parseFloat(data.RECAUDONOCOMISIONABLE);
        if (data.VENTARETAIL) itemQueryResult.VENTARETAIL = Number.parseFloat(data.VENTARETAIL);
        if (data.GANANCIAVENTARETAIL) itemQueryResult.GANANCIAVENTARETAIL = Number.parseFloat(data.GANANCIAVENTARETAIL);
        if (data.VENTACONSULTORA) itemQueryResult.VENTACONSULTORA = Number.parseFloat(data.VENTACONSULTORA);
        if (data.TERRITORIO) itemQueryResult.TERRITORIO = data.TERRITORIO;
        if (data.NIVEL) itemQueryResult.NIVEL = data.NIVEL;
        if (data.CONSTANCIA) itemQueryResult.CONSTANCIA = data.CONSTANCIA;
        if (data.SEGMENTOORDEN) itemQueryResult.SEGMENTOORDEN = data.SEGMENTOORDEN;
        queryResult.push(itemQueryResult);
      }
    }

    ctx.body = queryResult;
  }

  async GetListPedidosVentaRefac(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = [];
    let dbResult = await dbContextHana.GetListPedidosVentaRefac(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc, query.tipo, query.ordenamiento, query.facturacion);

    if (dbResult && dbResult.length > 0) {
      for (let data of dbResult) {
        let itemQueryResult = new _getListPedidosVentaRefac.default();
        if (data.ISOPAIS) itemQueryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) itemQueryResult.CAMPANIA = data.CAMPANIA;
        if (data.REGION) itemQueryResult.REGION = data.REGION;
        if (data.ZONA) itemQueryResult.ZONA = data.ZONA;
        if (data.SECCION) itemQueryResult.SECCION = data.SECCION;
        if (data.NOMBRECOMPLETO) itemQueryResult.NOMBRECOMPLETO = data.NOMBRECOMPLETO;
        if (data.CODIGOCONSULTORA) itemQueryResult.CODIGOCONSULTORA = data.CODIGOCONSULTORA;
        if (data.TERRITORIO) itemQueryResult.TERRITORIO = data.TERRITORIO;
        if (data.TELEFONOCASA) itemQueryResult.TELEFONOCASA = data.TELEFONOCASA;
        if (data.TELEFONOCELULAR) itemQueryResult.TELEFONOCELULAR = data.TELEFONOCELULAR;
        if (data.CONSTANCIA) itemQueryResult.CONSTANCIA = data.CONSTANCIA.toString();
        if (data.NIVEL) itemQueryResult.NIVEL = data.NIVEL;
        if (data.SALDOPENDIENTE) itemQueryResult.SALDOPENDIENTE = Number.parseFloat(data.SALDOPENDIENTE);
        if (data.SALDOPENDIENTEDECIMAL) itemQueryResult.SALDOPENDIENTEDECIMAL = Number.parseFloat(data.SALDOPENDIENTEDECIMAL);
        if (data.DOCUMENTOIDENTIDAD) itemQueryResult.DOCUMENTODEIDENTIDAD = data.DOCUMENTOIDENTIDAD;
        if (data.DIRECCION) itemQueryResult.DIRECCION = data.DIRECCION;
        if (data.EMAIL) itemQueryResult.EMAIL = data.EMAIL;
        if (data.CUMPLEANIOS) itemQueryResult.CUMPLEANIOS = data.CUMPLEANIOS;
        if (data.FAMILIAPROTEGIDA) itemQueryResult.FAMILIAPROTEGIDA = data.FAMILIAPROTEGIDA;
        if (data.ESBRILLANTE) itemQueryResult.ESBRILLANTE = data.ESBRILLANTE;
        if (data.USAFLEXIPAGO) itemQueryResult.USAFLEXIPAGO = data.USAFLEXIPAGO;
        if (data.CAMPANIAINGRESO) itemQueryResult.CAMPANIAINGRESO = data.CAMPANIAINGRESO;
        if (data.ULTIMAFACTURACION) itemQueryResult.ULTIMAFACTURACION = data.ULTIMAFACTURACION;
        if (data.ORIGENPEDIDO) itemQueryResult.ORIGENPEDIDO = data.ORIGENPEDIDO;
        if (data.VENTAGANANCIA) itemQueryResult.VENTAGANANCIA = Number.parseFloat(data.VENTAGANANCIA);
        if (data.PROMVENTACONSULTORA) itemQueryResult.PROMVENTACONSULTORA = Number.parseFloat(data.PROMVENTACONSULTORA);
        if (data.VENTACONSULTORA) itemQueryResult.VENTACONSULTORA = Number.parseFloat(data.VENTACONSULTORA);
        if (data.SEGMENTOORDEN) itemQueryResult.SEGMENTOORDEN = data.SEGMENTOORDEN;
        if (data.VTACATALOGOCX) itemQueryResult.VTACATALOGOCX = Number.parseFloat(data.VTACATALOGOCX);
        if (data.VTACATALOGOCX_1) itemQueryResult.VTACATALOGOCX_1 = Number.parseFloat(data.VTACATALOGOCX_1);
        if (data.VTACATALOGOCX_2) itemQueryResult.VTACATALOGOCX_2 = Number.parseFloat(data.VTACATALOGOCX_2);
        if (data.VTACATALOGOCX_3) itemQueryResult.VTACATALOGOCX_3 = Number.parseFloat(data.VTACATALOGOCX_3);
        if (data.VTACATALOGOCX_4) itemQueryResult.VTACATALOGOCX_4 = Number.parseFloat(data.VTACATALOGOCX_4);
        if (data.VTACATALOGOCX_5) itemQueryResult.VTACATALOGOCX_5 = Number.parseFloat(data.VTACATALOGOCX_5);
        if (data.VTACATALOGOCX_6) itemQueryResult.VTACATALOGOCX_6 = Number.parseFloat(data.VTACATALOGOCX_6);
        if (data.FLAGAV) itemQueryResult.FLAGAV = Number.parseInt(data.FLAGAV);
        if (data.FLAGAV_1) itemQueryResult.FLAGAV_1 = Number.parseInt(data.FLAGAV_1);
        if (data.FLAGAV_2) itemQueryResult.FLAGAV_2 = Number.parseInt(data.FLAGAV_2);
        if (data.FLAGAV_3) itemQueryResult.FLAGAV_3 = Number.parseInt(data.FLAGAV_3);
        if (data.FLAGAV_4) itemQueryResult.FLAGAV_4 = Number.parseInt(data.FLAGAV_4);
        if (data.FLAGAV_5) itemQueryResult.FLAGAV_5 = Number.parseInt(data.FLAGAV_5);
        if (data.FLAGAV_6) itemQueryResult.FLAGAV_6 = Number.parseInt(data.FLAGAV_6);
        if (data.VISIBILIDADVTACX) itemQueryResult.VISIBILIDADVTACX = Number.parseInt(data.VISIBILIDADVTACX);
        if (data.VISIBILIDADVTACXMENOS1) itemQueryResult.VISIBILIDADVTACXMENOS1 = Number.parseInt(data.VISIBILIDADVTACXMENOS1);
        if (data.VISIBILIDADVTACXMENOS2) itemQueryResult.VISIBILIDADVTACXMENOS2 = Number.parseInt(data.VISIBILIDADVTACXMENOS2);
        if (data.VISIBILIDADVTACXMENOS3) itemQueryResult.VISIBILIDADVTACXMENOS3 = Number.parseInt(data.VISIBILIDADVTACXMENOS3);
        if (data.VISIBILIDADVTACXMENOS4) itemQueryResult.VISIBILIDADVTACXMENOS4 = Number.parseInt(data.VISIBILIDADVTACXMENOS4);
        if (data.VISIBILIDADVTACXMENOS5) itemQueryResult.VISIBILIDADVTACXMENOS5 = Number.parseInt(data.VISIBILIDADVTACXMENOS5);
        if (data.VISIBILIDADVTACXMENOS6) itemQueryResult.VISIBILIDADVTACXMENOS6 = Number.parseInt(data.VISIBILIDADVTACXMENOS6);
        if (data.PRIMERNOMBRE) itemQueryResult.PRIMERNOMBRE = data.PRIMERNOMBRE;
        if (data.SEGUNDONOMBRE) itemQueryResult.SEGUNDONOMBRE = data.SEGUNDONOMBRE;
        if (data.PRIMERAPELLIDO) itemQueryResult.PRIMERAPELLIDO = data.PRIMERAPELLIDO;
        if (data.SEGUNDOAPELLIDO) itemQueryResult.SEGUNDOAPELLIDO = data.SEGUNDOAPELLIDO;
        if (data.RANGO) itemQueryResult.RANGO = data.RANGO;
        if (data.TOTALALTOVALOR) itemQueryResult.TOTALALTOVALOR = data.TOTALALTOVALOR.toString();
        queryResult.push(itemQueryResult);
      }
    }

    ctx.body = queryResult;
  }

  async GetListPegRefac(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = [];
    let dbResult = await dbContextHana.GetListPegRefac(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc, query.esPEGCx, query.facturacion);

    if (dbResult && dbResult.length > 0) {
      for (let data of dbResult) {
        let itemQueryResult = new _getListPegRefac.default();
        if (data.ISOPAIS) itemQueryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) itemQueryResult.CAMPANIA = data.CAMPANIA;
        if (data.NOMBRECOMPLETO) itemQueryResult.NOMBRECOMPLETO = data.NOMBRECOMPLETO;
        if (data.CODIGOCONSULTORA) itemQueryResult.CODIGOCONSULTORA = data.CODIGOCONSULTORA;
        if (data.REGION) itemQueryResult.REGION = data.REGION;
        if (data.ZONA) itemQueryResult.ZONA = data.ZONA;
        if (data.SECCION) itemQueryResult.SECCION = data.SECCION;
        if (data.TERRITORIO) itemQueryResult.TERRITORIO = data.TERRITORIO;
        if (data.TELEFONOCASA) itemQueryResult.TELEFONOCASA = data.TELEFONOCASA;
        if (data.TELEFONOCELULAR) itemQueryResult.TELEFONOCELULAR = data.TELEFONOCELULAR;
        if (data.CONSTANCIA) itemQueryResult.CONSTANCIA = data.CONSTANCIA.toString();
        if (data.NIVEL) itemQueryResult.NIVEL = data.NIVEL;
        if (data.SALDOPENDIENTE) itemQueryResult.SALDOPENDIENTE = Number.parseFloat(data.SALDOPENDIENTE);
        if (data.DOCUMENTODEIDENTIDAD) itemQueryResult.DOCUMENTODEIDENTIDAD = data.DOCUMENTODEIDENTIDAD;
        if (data.DIRECCION) itemQueryResult.DIRECCION = data.DIRECCION;
        if (data.EMAIL) itemQueryResult.EMAIL = data.EMAIL;
        if (data.CUMPLEANIOS) itemQueryResult.CUMPLEANIOS = data.CUMPLEANIOS;
        if (data.FAMILIAPROTEGIDA) itemQueryResult.FAMILIAPROTEGIDA = data.FAMILIAPROTEGIDA;
        if (data.ESBRILLANTE) itemQueryResult.ESBRILLANTE = data.ESBRILLANTE;
        if (data.USAFLEXIPAGO) itemQueryResult.USAFLEXIPAGO = data.USAFLEXIPAGO;
        if (data.CAMPANIAINGRESO) itemQueryResult.CAMPANIAINGRESO = data.CAMPANIAINGRESO;
        if (data.ULTIMAFACTURACION) itemQueryResult.ULTIMAFACTURACION = data.ULTIMAFACTURACION;
        if (data.ORIGENPEDIDO) itemQueryResult.ORIGENPEDIDO = data.ORIGENPEDIDO;
        if (data.VENTAGANANCIA) itemQueryResult.VENTAGANANCIA = Number.parseFloat(data.VENTAGANANCIA);
        if (data.PROMVENTACONSULTORA) itemQueryResult.PROMVENTACONSULTORA = Number.parseFloat(data.PROMVENTACONSULTORA);
        if (data.VENTACONSULTORA) itemQueryResult.VENTACONSULTORA = Number.parseFloat(data.VENTACONSULTORA);
        if (data.SEGMENTOORDEN) itemQueryResult.SEGMENTOORDEN = data.SEGMENTOORDEN;
        if (data.VTACATALOGOCX) itemQueryResult.VTACATALOGOCX = Number.parseFloat(data.VTACATALOGOCX);
        if (data.VTACATALOGOCX_1) itemQueryResult.VTACATALOGOCX_1 = Number.parseFloat(data.VTACATALOGOCX_1);
        if (data.VTACATALOGOCX_2) itemQueryResult.VTACATALOGOCX_2 = Number.parseFloat(data.VTACATALOGOCX_2);
        if (data.VTACATALOGOCX_3) itemQueryResult.VTACATALOGOCX_3 = Number.parseFloat(data.VTACATALOGOCX_3);
        if (data.VTACATALOGOCX_4) itemQueryResult.VTACATALOGOCX_4 = Number.parseFloat(data.VTACATALOGOCX_4);
        if (data.VTACATALOGOCX_5) itemQueryResult.VTACATALOGOCX_5 = Number.parseFloat(data.VTACATALOGOCX_5);
        if (data.VTACATALOGOCX_6) itemQueryResult.VTACATALOGOCX_6 = Number.parseFloat(data.VTACATALOGOCX_6);
        if (data.FLAGAV) itemQueryResult.FLAGAV = Number.parseInt(data.FLAGAV);
        if (data.FLAGAV_1) itemQueryResult.FLAGAV_1 = Number.parseInt(data.FLAGAV_1);
        if (data.FLAGAV_2) itemQueryResult.FLAGAV_2 = Number.parseInt(data.FLAGAV_2);
        if (data.FLAGAV_3) itemQueryResult.FLAGAV_3 = Number.parseInt(data.FLAGAV_3);
        if (data.FLAGAV_4) itemQueryResult.FLAGAV_4 = Number.parseInt(data.FLAGAV_4);
        if (data.FLAGAV_5) itemQueryResult.FLAGAV_5 = Number.parseInt(data.FLAGAV_5);
        if (data.FLAGAV_6) itemQueryResult.FLAGAV_6 = Number.parseInt(data.FLAGAV_6);
        if (data.VISIBILIDADVTACX) itemQueryResult.VISIBILIDADVTACX = Number.parseInt(data.VISIBILIDADVTACX);
        if (data.VISIBILIDADVTACXMENOS1) itemQueryResult.VISIBILIDADVTACXMENOS1 = Number.parseInt(data.VISIBILIDADVTACXMENOS1);
        if (data.VISIBILIDADVTACXMENOS2) itemQueryResult.VISIBILIDADVTACXMENOS2 = Number.parseInt(data.VISIBILIDADVTACXMENOS2);
        if (data.VISIBILIDADVTACXMENOS3) itemQueryResult.VISIBILIDADVTACXMENOS3 = Number.parseInt(data.VISIBILIDADVTACXMENOS3);
        if (data.VISIBILIDADVTACXMENOS4) itemQueryResult.VISIBILIDADVTACXMENOS4 = Number.parseInt(data.VISIBILIDADVTACXMENOS4);
        if (data.VISIBILIDADVTACXMENOS5) itemQueryResult.VISIBILIDADVTACXMENOS5 = Number.parseInt(data.VISIBILIDADVTACXMENOS5);
        if (data.VISIBILIDADVTACXMENOS6) itemQueryResult.VISIBILIDADVTACXMENOS6 = Number.parseInt(data.VISIBILIDADVTACXMENOS6);
        if (data.RANGO) itemQueryResult.RANGO = data.RANGO;
        if (data.TOTALALTOVALOR) itemQueryResult.TOTALALTOVALOR = data.TOTALALTOVALOR;
        if (data.PRIMERNOMBRE) itemQueryResult.PRIMERNOMBRE = data.PRIMERNOMBRE;
        if (data.SEGUNDONOMBRE) itemQueryResult.SEGUNDONOMBRE = data.SEGUNDONOMBRE;
        if (data.PRIMERAPELLIDO) itemQueryResult.PRIMERAPELLIDO = data.PRIMERAPELLIDO;
        if (data.SEGUNDOAPELLIDO) itemQueryResult.SEGUNDOAPELLIDO = data.SEGUNDOAPELLIDO;
        queryResult.push(itemQueryResult);
      }
    }

    ctx.body = queryResult;
  }

  async GetListPosiblesConsecutivasRefac(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = [];
    let dbResult = await dbContextHana.GetListPosiblesConsecutivasRefac(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc, query.ordenamiento);

    if (dbResult && dbResult.length > 0) {
      for (let data of dbResult) {
        let itemQueryResult = new _getListPosiblesConsecutivasRefac.default();
        if (data.ISOPAIS) itemQueryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) itemQueryResult.CAMPANIA = data.CAMPANIA;
        if (data.REGION) itemQueryResult.REGION = data.REGION;
        if (data.ZONA) itemQueryResult.ZONA = data.ZONA;
        if (data.SECCION) itemQueryResult.SECCION = data.SECCION;
        if (data.NOMBRECOMPLETO) itemQueryResult.NOMBRECOMPLETO = data.NOMBRECOMPLETO;
        if (data.CODIGOCONSULTORA) itemQueryResult.CODIGOCONSULTORA = data.CODIGOCONSULTORA;
        if (data.TERRITORIO) itemQueryResult.TERRITORIO = data.TERRITORIO;
        if (data.TELEFONOCASA) itemQueryResult.TELEFONOCASA = data.TELEFONOCASA;
        if (data.TELEFONOCELULAR) itemQueryResult.TELEFONOCELULAR = data.TELEFONOCELULAR;
        if (data.CONSTANCIA) itemQueryResult.CONSTANCIA = data.CONSTANCIA;
        if (data.NIVEL) itemQueryResult.NIVEL = data.NIVEL;
        if (data.SALDOPENDIENTE) itemQueryResult.SALDOPENDIENTE = Number.parseFloat(data.SALDOPENDIENTE);
        if (data.SALDOPENDIENTEDECIMAL) itemQueryResult.SALDOPENDIENTEDECIMAL = Number.parseFloat(data.SALDOPENDIENTEDECIMAL);
        if (data.DOCUMENTODEIDENTIDAD) itemQueryResult.DOCUMENTODEIDENTIDAD = data.DOCUMENTODEIDENTIDAD;
        if (data.DIRECCION) itemQueryResult.DIRECCION = data.DIRECCION;
        if (data.EMAIL) itemQueryResult.EMAIL = data.EMAIL;
        if (data.CUMPLEANIOS) itemQueryResult.CUMPLEANIOS = data.CUMPLEANIOS;
        if (data.FAMILIAPROTEGIDA) itemQueryResult.FAMILIAPROTEGIDA = data.FAMILIAPROTEGIDA;
        if (data.ESBRILLANTE) itemQueryResult.ESBRILLANTE = data.ESBRILLANTE;
        if (data.USAFLEXIPAGO) itemQueryResult.USAFLEXIPAGO = data.USAFLEXIPAGO;
        if (data.CAMPANIAINGRESO) itemQueryResult.CAMPANIAINGRESO = data.CAMPANIAINGRESO;
        if (data.ULTIMAFACTURACION) itemQueryResult.ULTIMAFACTURACION = data.ULTIMAFACTURACION;
        if (data.ORIGENPEDIDO) itemQueryResult.ORIGENPEDIDO = data.ORIGENPEDIDO;
        if (data.VENTAGANANCIA) itemQueryResult.VENTAGANANCIA = Number.parseFloat(data.VENTAGANANCIA);
        if (data.PROMVENTACONSULTORA) itemQueryResult.PROMVENTACONSULTORA = Number.parseFloat(data.PROMVENTACONSULTORA);
        if (data.VENTACONSULTORA) itemQueryResult.VENTACONSULTORA = Number.parseFloat(data.VENTACONSULTORA);
        if (data.SEGMENTOORDEN) itemQueryResult.SEGMENTOORDEN = data.SEGMENTOORDEN;
        if (data.VTACATALOGOCX) itemQueryResult.VTACATALOGOCX = Number.parseFloat(data.VTACATALOGOCX);
        if (data.VTACATALOGOCX_1) itemQueryResult.VTACATALOGOCX_1 = Number.parseFloat(data.VTACATALOGOCX_1);
        if (data.VTACATALOGOCX_2) itemQueryResult.VTACATALOGOCX_2 = Number.parseFloat(data.VTACATALOGOCX_2);
        if (data.VTACATALOGOCX_3) itemQueryResult.VTACATALOGOCX_3 = Number.parseFloat(data.VTACATALOGOCX_3);
        if (data.VTACATALOGOCX_4) itemQueryResult.VTACATALOGOCX_4 = Number.parseFloat(data.VTACATALOGOCX_4);
        if (data.VTACATALOGOCX_5) itemQueryResult.VTACATALOGOCX_5 = Number.parseFloat(data.VTACATALOGOCX_5);
        if (data.VTACATALOGOCX_6) itemQueryResult.VTACATALOGOCX_6 = Number.parseFloat(data.VTACATALOGOCX_6);
        if (data.FLAGAV) itemQueryResult.FLAGAV = Number.parseInt(data.FLAGAV);
        if (data.FLAGAV_1) itemQueryResult.FLAGAV_1 = Number.parseInt(data.FLAGAV_1);
        if (data.FLAGAV_2) itemQueryResult.FLAGAV_2 = Number.parseInt(data.FLAGAV_2);
        if (data.FLAGAV_3) itemQueryResult.FLAGAV_3 = Number.parseInt(data.FLAGAV_3);
        if (data.FLAGAV_4) itemQueryResult.FLAGAV_4 = Number.parseInt(data.FLAGAV_4);
        if (data.FLAGAV_5) itemQueryResult.FLAGAV_5 = Number.parseInt(data.FLAGAV_5);
        if (data.FLAGAV_6) itemQueryResult.FLAGAV_6 = Number.parseInt(data.FLAGAV_6);
        if (data.VISIBILIDADVTACX) itemQueryResult.VISIBILIDADVTACX = Number.parseInt(data.VISIBILIDADVTACX);
        if (data.VISIBILIDADVTACXMENOS1) itemQueryResult.VISIBILIDADVTACXMENOS1 = Number.parseInt(data.VISIBILIDADVTACXMENOS1);
        if (data.VISIBILIDADVTACXMENOS2) itemQueryResult.VISIBILIDADVTACXMENOS2 = Number.parseInt(data.VISIBILIDADVTACXMENOS2);
        if (data.VISIBILIDADVTACXMENOS3) itemQueryResult.VISIBILIDADVTACXMENOS3 = Number.parseInt(data.VISIBILIDADVTACXMENOS3);
        if (data.VISIBILIDADVTACXMENOS4) itemQueryResult.VISIBILIDADVTACXMENOS4 = Number.parseInt(data.VISIBILIDADVTACXMENOS4);
        if (data.VISIBILIDADVTACXMENOS5) itemQueryResult.VISIBILIDADVTACXMENOS5 = Number.parseInt(data.VISIBILIDADVTACXMENOS5);
        if (data.VISIBILIDADVTACXMENOS6) itemQueryResult.VISIBILIDADVTACXMENOS6 = Number.parseInt(data.VISIBILIDADVTACXMENOS6);
        if (data.PRIMERNOMBRE) itemQueryResult.PRIMERNOMBRE = data.PRIMERNOMBRE;
        if (data.SEGUNDONOMBRE) itemQueryResult.SEGUNDONOMBRE = data.SEGUNDONOMBRE;
        if (data.PRIMERAPELLIDO) itemQueryResult.PRIMERAPELLIDO = data.PRIMERAPELLIDO;
        if (data.SEGUNDOAPELLIDO) itemQueryResult.SEGUNDOAPELLIDO = data.SEGUNDOAPELLIDO;
        if (data.RANGO) itemQueryResult.RANGO = data.RANGO;
        if (data.TOTALALTOVALOR) itemQueryResult.TOTALALTOVALOR = data.TOTALALTOVALOR;
        queryResult.push(itemQueryResult);
      }
    }

    ctx.body = queryResult;
  }

  async GetListSaldoPendiente(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = [];
    let dbResult = await dbContextHana.GetListSaldoPendiente(query.codPais, query.campania, query.codRegi, query.codZona, query.codSecc);

    if (dbResult && dbResult.length > 0) {
      for (let data of dbResult) {
        let itemQueryResult = new _getListSaldoPendiente.default();
        if (data.ISOPAIS) itemQueryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) itemQueryResult.CAMPANIA = data.CAMPANIA;
        if (data.REGION) itemQueryResult.REGION = data.REGION;
        if (data.ZONA) itemQueryResult.ZONA = data.ZONA;
        if (data.SECCION) itemQueryResult.SECCION = data.SECCION;
        if (data.NOMBRECOMPLETO) itemQueryResult.NOMBRECOMPLETO = data.NOMBRECOMPLETO;
        if (data.CODIGOCONSULTORA) itemQueryResult.CODIGOCONSULTORA = data.CODIGOCONSULTORA;
        if (data.TERRITORIO) itemQueryResult.TERRITORIO = data.TERRITORIO;
        if (data.TELEFONOCASA) itemQueryResult.TELEFONOCASA = data.TELEFONOCASA;
        if (data.TELEFONOCELULAR) itemQueryResult.TELEFONOCELULAR = data.TELEFONOCELULAR;
        if (data.CONSTANCIA) itemQueryResult.CONSTANCIA = data.CONSTANCIA.toString();
        if (data.NIVEL) itemQueryResult.NIVEL = data.NIVEL;
        if (data.SALDOPENDIENTE) itemQueryResult.SALDOPENDIENTE = Number.parseFloat(data.SALDOPENDIENTE);
        if (data.VENTA_GANANCIA) itemQueryResult.VENTAGANANCIA = Number.parseFloat(data.VENTA_GANANCIA);
        if (data.PROMVENTACONSULTORA) itemQueryResult.PROMVENTACONSULTORA = Number.parseFloat(data.PROMVENTACONSULTORA);
        if (data.VENTACONSULTORA) itemQueryResult.VENTACONSULTORA = Number.parseFloat(data.VENTACONSULTORA);
        if (data.DOCUMENTOIDENTIDAD) itemQueryResult.DOCUMENTODEIDENTIDAD = data.DOCUMENTOIDENTIDAD;
        if (data.DIRECCION) itemQueryResult.DIRECCION = data.DIRECCION;
        if (data.EMAIL) itemQueryResult.EMAIL = data.EMAIL;
        if (data.CAMPANIAINGRESO) itemQueryResult.CAMPANIAINGRESO = data.CAMPANIAINGRESO;
        if (data.CUMPLEANIOS) itemQueryResult.CUMPLEANIOS = data.CUMPLEANIOS;
        if (data.ULTIMAFACTURACION) itemQueryResult.ULTIMAFACTURACION = data.ULTIMAFACTURACION;
        if (data.ORIGENPEDIDO) itemQueryResult.ORIGENPEDIDO = data.ORIGENPEDIDO;
        if (data.FAMILIAPROTEGIDA) itemQueryResult.FAMILIAPROTEGIDA = data.FAMILIAPROTEGIDA;
        if (data.USAFLEXIPAGO) itemQueryResult.USAFLEXIPAGO = data.USAFLEXIPAGO;
        if (data.ESBRILLANTE) itemQueryResult.ESBRILLANTE = data.ESBRILLANTE;
        if (data.SEGMENTOORDEN) itemQueryResult.SEGMENTOORDEN = data.SEGMENTOORDEN;
        if (data.PRIMERNOMBRE) itemQueryResult.PRIMERNOMBRE = data.PRIMERNOMBRE;
        if (data.SEGUNDONOMBRE) itemQueryResult.SEGUNDONOMBRE = data.SEGUNDONOMBRE;
        if (data.PRIMERAPELLIDO) itemQueryResult.PRIMERAPELLIDO = data.PRIMERAPELLIDO;
        if (data.SEGUNDOAPELLIDO) itemQueryResult.SEGUNDOAPELLIDO = data.SEGUNDOAPELLIDO;
        queryResult.push(itemQueryResult);
      }
    }

    ctx.body = queryResult;
  }

  async GetListVentaNeta(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = [];
    let dbResult = await dbContextHana.GetListVentaNeta(query.codPais, query.campania, query.codZona, query.codSecc, query.tipo, query.facturacion);

    if (dbResult && dbResult.length > 0) {
      for (let data of dbResult) {
        let itemQueryResult = new _getListVentaNeta.default();
        if (data.ISOPAIS) itemQueryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) itemQueryResult.CAMPANIA = data.CAMPANIA;
        if (data.NOMBRECOMPLETO) itemQueryResult.NOMBRECOMPLETO = data.NOMBRECOMPLETO;
        if (data.CODIGOCONSULTORA) itemQueryResult.CODIGOCONSULTORA = data.CODIGOCONSULTORA;
        if (data.REGION) itemQueryResult.REGION = data.REGION.toString();
        if (data.ZONA) itemQueryResult.ZONA = data.ZONA.toString();
        if (data.SECCION) itemQueryResult.SECCION = data.SECCION.toString();
        if (data.TERRITORIO) itemQueryResult.TERRITORIO = data.TERRITORIO.toString();
        if (data.TELEFONOCASA) itemQueryResult.TELEFONOCASA = data.TELEFONOCASA;
        if (data.TELEFONOCELULAR) itemQueryResult.TELEFONOCELULAR = data.TELEFONOCELULAR;
        if (data.CONSTANCIA) itemQueryResult.CONSTANCIA = data.CONSTANCIA.toString();
        if (data.NIVEL) itemQueryResult.NIVEL = data.NIVEL;
        if (data.SALDOPENDIENTE) itemQueryResult.SALDOPENDIENTE = data.SALDOPENDIENTE.toString();
        if (data.VENTAGANANCIA) itemQueryResult.VENTAGANANCIA = data.VENTAGANANCIA.toString();
        if (data.PROMVENTACONSULTORA) itemQueryResult.PROMVENTACONSULTORA = data.PROMVENTACONSULTORA.toString();
        if (data.VENTACONSULTORA) itemQueryResult.VENTACONSULTORA = data.VENTACONSULTORA.toString();
        if (data.DOCUMENTODEIDENTIDAD) itemQueryResult.DOCUMENTODEIDENTIDAD = data.DOCUMENTODEIDENTIDAD;
        if (data.DIRECCION) itemQueryResult.DIRECCION = data.DIRECCION;
        if (data.EMAIL) itemQueryResult.EMAIL = data.EMAIL;
        if (data.CUMPLEANIOS) itemQueryResult.CUMPLEANIOS = data.CUMPLEANIOS;
        if (data.CAMPANIAINGRESO) itemQueryResult.CAMPANIAINGRESO = data.CAMPANIAINGRESO;
        if (data.ULTIMAFACTURACION) itemQueryResult.ULTIMAFACTURACION = data.ULTIMAFACTURACION;
        if (data.ORIGENPEDIDO) itemQueryResult.ORIGENPEDIDO = data.ORIGENPEDIDO;
        if (data.FAMILIAPROTEGIDA) itemQueryResult.FAMILIAPROTEGIDA = data.FAMILIAPROTEGIDA;
        if (data.USAFLEXIPAGO) itemQueryResult.USAFLEXIPAGO = data.USAFLEXIPAGO;
        if (data.ESBRILLANTE) itemQueryResult.ESBRILLANTE = data.ESBRILLANTE;
        if (data.VTACATALOGOCX) itemQueryResult.VTACATALOGOCX = data.VTACATALOGOCX.toString();
        if (data.VTACATALOGOCX_1) itemQueryResult.VTACATALOGOCX_1 = data.VTACATALOGOCX_1.toString();
        if (data.VTACATALOGOCX_2) itemQueryResult.VTACATALOGOCX_2 = data.VTACATALOGOCX_2.toString();
        if (data.VTACATALOGOCX_3) itemQueryResult.VTACATALOGOCX_3 = data.VTACATALOGOCX_3.toString();
        if (data.VTACATALOGOCX_4) itemQueryResult.VTACATALOGOCX_4 = data.VTACATALOGOCX_4.toString();
        if (data.VTACATALOGOCX_5) itemQueryResult.VTACATALOGOCX_5 = data.VTACATALOGOCX_5.toString();
        if (data.VTACATALOGOCX_6) itemQueryResult.VTACATALOGOCX_6 = data.VTACATALOGOCX_6.toString();
        if (data.FLAGAV) itemQueryResult.FLAGAV = data.FLAGAV.toString();
        if (data.FLAGAV_1) itemQueryResult.FLAGAV_1 = data.FLAGAV_1.toString();
        if (data.FLAGAV_2) itemQueryResult.FLAGAV_2 = data.FLAGAV_2.toString();
        if (data.FLAGAV_3) itemQueryResult.FLAGAV_3 = data.FLAGAV_3.toString();
        if (data.FLAGAV_4) itemQueryResult.FLAGAV_4 = data.FLAGAV_4.toString();
        if (data.FLAGAV_5) itemQueryResult.FLAGAV_5 = data.FLAGAV_5.toString();
        if (data.FLAGAV_6) itemQueryResult.FLAGAV_6 = data.FLAGAV_6.toString();
        if (data.VISIBILIDADVTACX) itemQueryResult.VISIBILIDADVTACX = data.VISIBILIDADVTACX.toString();
        if (data.VISIBILIDADVTACXMENOS1) itemQueryResult.VISIBILIDADVTACXMENOS1 = data.VISIBILIDADVTACXMENOS1.toString();
        if (data.VISIBILIDADVTACXMENOS2) itemQueryResult.VISIBILIDADVTACXMENOS2 = data.VISIBILIDADVTACXMENOS2.toString();
        if (data.VISIBILIDADVTACXMENOS3) itemQueryResult.VISIBILIDADVTACXMENOS3 = data.VISIBILIDADVTACXMENOS3.toString();
        if (data.VISIBILIDADVTACXMENOS4) itemQueryResult.VISIBILIDADVTACXMENOS4 = data.VISIBILIDADVTACXMENOS4.toString();
        if (data.VISIBILIDADVTACXMENOS5) itemQueryResult.VISIBILIDADVTACXMENOS5 = data.VISIBILIDADVTACXMENOS5.toString();
        if (data.VISIBILIDADVTACXMENOS6) itemQueryResult.VISIBILIDADVTACXMENOS6 = data.VISIBILIDADVTACXMENOS6.toString();
        if (data.PRIMERNOMBRE) itemQueryResult.PRIMERNOMBRE = data.PRIMERNOMBRE;
        if (data.SEGUNDONOMBRE) itemQueryResult.SEGUNDONOMBRE = data.SEGUNDONOMBRE;
        if (data.PRIMERAPELLIDO) itemQueryResult.PRIMERAPELLIDO = data.PRIMERAPELLIDO;
        if (data.SEGUNDOAPELLIDO) itemQueryResult.SEGUNDOAPELLIDO = data.SEGUNDOAPELLIDO;
        if (data.SEGMENTOORDEN) itemQueryResult.SEGMENTOORDEN = data.SEGMENTOORDEN.toString();
        if (data.RANGO) itemQueryResult.RANGO = data.RANGO.toString();
        if (data.TOTALALTOVALOR) itemQueryResult.TOTALALTOVALOR = data.TOTALALTOVALOR.toString();
        if (data.MONTOULTIMOPEDIDO) itemQueryResult.MONTOULTIMOPEDIDO = data.MONTOULTIMOPEDIDO.toString();
        if (data.MONTOPEDIDOSOLICITADO) itemQueryResult.MONTOPEDIDOSOLICITADO = data.MONTOPEDIDOSOLICITADO.toString();
        if (data.MOTIVORECHAZO) itemQueryResult.MOTIVORECHAZO = data.MOTIVORECHAZO;
        queryResult.push(itemQueryResult);
      }
    }

    ctx.body = queryResult;
  }

  async GetRegionZonaSeccionActividad(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = [];
    let dbResult = await dbContextHana.GetRegionZonaSeccionActividad(query.codPais, query.campania, query.codRegi, query.codZona, query.tipo);

    if (dbResult && dbResult.length > 0) {
      for (let data of dbResult) {
        let itemQueryResult = new _getRegionZonaSeccionActividad.default();
        if (data.ISOPAIS) itemQueryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) itemQueryResult.CAMPANIA = data.CAMPANIA;
        if (data.CODIGO) itemQueryResult.CODIGO = data.CODIGO;
        if (data.NOMBRECARGO) itemQueryResult.NOMBRECARGO = data.NOMBRECARGO;
        if (data.ACTIVAS) itemQueryResult.ACTIVAS = Number.parseInt(data.ACTIVAS);
        if (data.PEDIDOS) itemQueryResult.PEDIDOS = Number.parseInt(data.PEDIDOS);
        if (data.ACTIVIDAD) itemQueryResult.ACTIVIDAD = Number.parseFloat(data.ACTIVIDAD);
        queryResult.push(itemQueryResult);
      }
    }

    ctx.body = queryResult;
  }

  async GetRegionZonaSeccionCapitalizacion(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = [];
    let dbResult = await dbContextHana.GetRegionZonaSeccionCapitalizacion(query.codPais, query.campania, query.codRegi, query.codZona, query.tipo);

    if (dbResult && dbResult.length > 0) {
      for (let data of dbResult) {
        let itemQueryResult = new _getRegionZonaSeccionCapitalizacion.default();
        if (data.ISOPAIS) itemQueryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) itemQueryResult.CAMPANIA = data.CAMPANIA;
        if (data.CODIGO) itemQueryResult.CODIGO = data.CODIGO;
        if (data.NOMBRECARGO) itemQueryResult.NOMBRE = data.NOMBRECARGO;
        if (data.INGRESOS) itemQueryResult.INGRESOS = Number.parseInt(data.INGRESOS);
        if (data.EGRESOS) itemQueryResult.EGRESOS = Number.parseInt(data.EGRESOS);
        if (data.REINGRESOS) itemQueryResult.REINGRESOS = Number.parseInt(data.REINGRESOS);
        if (data.CAPITALIZACION) itemQueryResult.CAPITALIZACION = Number.parseInt(data.CAPITALIZACION);
        queryResult.push(itemQueryResult);
      }
    }

    ctx.body = queryResult;
  }

  async GetRegionZonaSeccionCicloNuevas(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = [];
    let dbResult = await dbContextHana.GetRegionZonaSeccionCicloNuevas(query.codPais, query.campania, query.codRegi, query.codZona, query.facturacion);

    if (dbResult && dbResult.length > 0) {
      for (let data of dbResult) {
        let itemQueryResult = new _getRegionZonaSeccionCicloNuevas.default();
        if (data.ISOPAIS) itemQueryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) itemQueryResult.CAMPANIA = data.CAMPANIA;
        if (data.CODIGO) itemQueryResult.CODIGO = data.CODIGO;
        if (data.NOMBRECARGO) itemQueryResult.NOMBRECARGO = data.NOMBRECARGO;
        if (data.C2D2FDV) itemQueryResult.C2D2FDV = Number.parseInt(data.C2D2FDV);
        if (data.C2D2REAL) itemQueryResult.C2D2REAL = Number.parseInt(data.C2D2REAL);
        if (data.C3D3FDV) itemQueryResult.C3D3FDV = Number.parseInt(data.C3D3FDV);
        if (data.C3D3REAL) itemQueryResult.C3D3REAL = Number.parseInt(data.C3D3REAL);
        if (data.C4D4FDV) itemQueryResult.C4D4FDV = Number.parseInt(data.C4D4FDV);
        if (data.C4D4REAL) itemQueryResult.C4D4REAL = Number.parseInt(data.C4D4REAL);
        if (data.C5D5FDV) itemQueryResult.C5D5FDV = Number.parseInt(data.C5D5FDV);
        if (data.C5D5REAL) itemQueryResult.C5D5REAL = Number.parseInt(data.C5D5REAL);
        if (data.C6D6FDV) itemQueryResult.C6D6FDV = Number.parseInt(data.C6D6FDV);
        if (data.C6D6REAL) itemQueryResult.C6D6REAL = Number.parseInt(data.C6D6REAL);
        queryResult.push(itemQueryResult);
      }
    }

    ctx.body = queryResult;
  }

  async GetRegionZonaSeccionCobranza(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = [];
    let dbResult = await dbContextHana.GetRegionZonaSeccionCobranza(query.codPais, query.campania, query.codRegi, query.codZona);

    if (dbResult && dbResult.length > 0) {
      for (let data of dbResult) {
        let itemQueryResult = new _getRegionZonaSeccionCobranza.default();
        if (data.ISOPAIS) itemQueryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) itemQueryResult.CAMPANIA = data.CAMPANIA;
        if (data.CODIGO) itemQueryResult.CODIGO = data.CODIGO;
        if (data.NOMBRECARGO) itemQueryResult.NOMBRECARGO = data.NOMBRECARGO;
        if (data.PORCENTAJE) itemQueryResult.PORCENTAJE = Number.parseFloat(data.PORCENTAJE);
        if (data.FACTURADONETO) itemQueryResult.FACTURADONETO = Number.parseFloat(data.FACTURADONETO);
        if (data.RECUPERADO) itemQueryResult.RECUPERADO = Number.parseFloat(data.RECUPERADO);
        if (data.CONSULTORAS) itemQueryResult.CONSULTORAS = Number.parseInt(data.CONSULTORAS);
        queryResult.push(itemQueryResult);
      }
    }

    ctx.body = queryResult;
  }

  async GetRegionZonaSeccionPedido(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = [];

    if (_settings.default.isEnableContingencia(query.codPais) === true) {
      let dbResult = await dbContextOracle.GetRegionZonaSeccionPedido(query.codPais, query.campania, query.codRegi, query.codZona, query.tipo);

      if (dbResult && dbResult.length > 0) {
        for (let data of dbResult) {
          let itemQueryResult = new _getRegionZonaSeccionPedido.default();
          if (data.ISOPAIS) itemQueryResult.ISOPAIS = data.COD_PAIS;
          if (data.CAMPANIAACTUAL) itemQueryResult.CAMPANIAACTUAL = data.COD_PERI;
          if (data.CAMPANIAANTERIOR) itemQueryResult.CAMPANIAANTERIOR = data.COD_PERI_ANTE;
          if (data.CODIGO) itemQueryResult.CODIGO = data.VAL_CODI;
          if (data.NOMBRECARGO) itemQueryResult.NOMBRECARGO = data.NOM_CARGO;
          if (data.METAPEDIDOS) itemQueryResult.METAPEDIDOS = Number.parseInt(data.MET_PED);
          if (data.PEDIDOS) itemQueryResult.PEDIDOS = Number.parseInt(data.PED_REAL);
          if (data.CUMPLIMIENTO) itemQueryResult.CUMPLIMIENTO = Number.parseFloat(data.VAL_CUMP);
          if (data.PEDCONSECUTIVO_AV) itemQueryResult.PEDCONSECUTIVO_AV = Number.parseInt(data.PED_CONSE_AV);
          if (data.PEDCONSECUTIVO_BV) itemQueryResult.PEDCONSECUTIVO_BV = Number.parseInt(data.PED_CONSE_BV);
          queryResult.push(itemQueryResult);
        }
      }
    } else {
      let dbResult = await dbContextHana.GetRegionZonaSeccionPedido(query.codPais, query.campania, query.codRegi, query.codZona, query.tipo);

      if (dbResult && dbResult.length > 0) {
        for (let data of dbResult) {
          let itemQueryResult = new _getRegionZonaSeccionPedido.default();
          if (data.ISOPAIS) itemQueryResult.ISOPAIS = data.ISOPAIS;
          if (data.CAMPANIAACTUAL) itemQueryResult.CAMPANIAACTUAL = data.CAMPANIAACTUAL;
          if (data.CAMPANIAANTERIOR) itemQueryResult.CAMPANIAANTERIOR = data.CAMPANIAANTERIOR;
          if (data.CODIGO) itemQueryResult.CODIGO = data.CODIGO;
          if (data.NOMBRECARGO) itemQueryResult.NOMBRECARGO = data.NOMBRECARGO;
          if (data.METAPEDIDOS) itemQueryResult.METAPEDIDOS = Number.parseInt(data.METAPEDIDOS);
          if (data.PEDIDOS) itemQueryResult.PEDIDOS = Number.parseInt(data.PEDIDOS);
          if (data.CUMPLIMIENTO) itemQueryResult.CUMPLIMIENTO = Number.parseFloat(data.CUMPLIMIENTO);
          if (data.PEDCONSECUTIVO_AV) itemQueryResult.PEDCONSECUTIVO_AV = Number.parseInt(data.PEDCONSECUTIVO_AV);
          if (data.PEDCONSECUTIVO_BV) itemQueryResult.PEDCONSECUTIVO_BV = Number.parseInt(data.PEDCONSECUTIVO_BV);
          queryResult.push(itemQueryResult);
        }
      }
    }

    ctx.body = queryResult;
  }

  async GetRegionZonaSeccionPosiblesConsecutivas(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = [];
    let dbResult = await dbContextHana.GetRegionZonaSeccionPosiblesConsecutivas(query.codPais, query.campania, query.codRegi, query.codZona, query.facturacion);

    if (dbResult && dbResult.length > 0) {
      for (let data of dbResult) {
        let itemQueryResult = new _getRegionZonaSeccionPosiblesConsecutivas.default();
        if (data.ISOPAIS) itemQueryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) itemQueryResult.CAMPANIA = data.ISOPAIS;
        if (data.CAMPANIAANT) itemQueryResult.CAMPANIAANT = data.CAMPANIAANT;
        if (data.CODIGO) itemQueryResult.CODIGO = data.CODIGO;
        if (data.NOMBRECARGO) itemQueryResult.NOMBRECARGO = data.NOMBRECARGO;
        if (data.MAXPEDIDOS) itemQueryResult.MAXPEDIDOS = Number.parseInt(data.MAXPEDIDOS);
        if (data.AVANCEPEDIDOSCONSECUTIVOS) itemQueryResult.AVANCEPEDIDOSCONSECUTIVOS = Number.parseInt(data.AVANCEPEDIDOSCONSECUTIVOS);
        if (data.PORCCONSECUTIVO) itemQueryResult.PORCCONSECUTIVO = Number.parseFloat(data.PORCCONSECUTIVO);
        if (data.AVANCEVENTACONSECUTIVA) itemQueryResult.AVANCEVENTACONSECUTIVA = Number.parseFloat(data.AVANCEVENTACONSECUTIVA);
        if (data.PROMEDIO) itemQueryResult.PROMEDIO = Number.parseFloat(data.PROMEDIO);
        queryResult.push(itemQueryResult);
      }
    }

    ctx.body = queryResult;
  }

  async GetRegionZonaSeccionVenta(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = [];
    let dbResult = await dbContextHana.GetRegionZonaSeccionVenta(query.codPais, query.campania, query.codRegi, query.codZona, query.facturacion);

    if (dbResult && dbResult.length > 0) {
      for (let data of dbResult) {
        let itemQueryResult = new _getRegionZonaSeccionVenta.default();
        if (data.ISOPAIS) itemQueryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) itemQueryResult.CAMPANIA = data.CAMPANIA;
        if (data.CODIGO) itemQueryResult.CODIGO = data.CODIGO;
        if (data.NOMBRECARGO) itemQueryResult.NOMBRECARGO = data.NOMBRECARGO;
        if (data.VTA) itemQueryResult.VTA = Number.parseFloat(data.VTA);
        if (data.PEDIDOS) itemQueryResult.PEDIDOS = Number.parseInt(data.PEDIDOS);
        if (data.PROM) itemQueryResult.PROM = Number.parseFloat(data.PROM);
        queryResult.push(itemQueryResult);
      }
    }

    ctx.body = queryResult;
  }

  async GetRegiZonaSeccPeg(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = [];
    let dbResult = await dbContextHana.GetRegiZonaSeccPeg(query.codPais, query.campania, query.codRegi, query.codZona, query.facturacion);

    if (dbResult && dbResult.length > 0) {
      for (let data of dbResult) {
        let itemQueryResult = new _getRegiZonaSeccPeg.default();
        if (data.ISOPAIS) itemQueryResult.ISOPAIS = data.ISOPAIS;
        if (data.CAMPANIA) itemQueryResult.CAMPANIA = data.CAMPANIA;
        if (data.CODIGO) itemQueryResult.CODIGO = data.CODIGO;
        if (data.NOMBRECARGO) itemQueryResult.NOMBREACARGO = data.NOMBRECARGO;
        if (data.NROPEGS) itemQueryResult.NRPEGS = Number.parseInt(data.NROPEGS);
        if (data.RETENCION) itemQueryResult.RETENCION = Number.parseFloat(data.RETENCION);
        if (data.POSPEG) itemQueryResult.POSPEG = Number.parseFloat(data.POSPEG);
        queryResult.push(itemQueryResult);
      }
    }

    ctx.body = queryResult;
  }

  async GetSaldoPendiente(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = new _getSaldoPendiente.default();
    let dbResult = await dbContextHana.GetSaldoPendiente(query.codPais, query.codRegi, query.codZona, query.codSecc, query.campania, query.tipo);

    if (dbResult && dbResult.length > 0) {
      let data = dbResult[0];
      if (data.TOTALPENDIENTE) queryResult.TOTALPENDIENTE = Number.parseFloat(data.TOTALPENDIENTE);
    }

    ctx.body = queryResult;
  }

  async GetSeccionZona(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = [];

    if (_settings.default.isEnableContingencia(query.codPais) === true) {
      let dbResult = await dbContextOracle.GetSeccionZona(query.codPais, query.codRegi, query.codZona);

      if (dbResult && dbResult.length > 0) {
        for (let data of dbResult) {
          let itemQueryResult = new _getSeccionZona.default();
          if (data.SECCIONID) itemQueryResult.SECCID = Number.parseInt(data.SECCIONID);
          if (data.CODIGO) itemQueryResult.CODIGO = data.CODIGO;
          if (data.DESCRIPCION) itemQueryResult.DESCRIPCION = data.DESCRIPCION;
          if (data.SOCIAEMPRESARIA) itemQueryResult.SOCIAEMPRESARIA = data.SOCIAEMPRESARIA;
          queryResult.push(itemQueryResult);
        }
      }
    } else {
      let dbResult = await dbContextHana.GetSeccionZona(query.codPais, query.codRegi, query.codZona);

      if (dbResult && dbResult.length > 0) {
        for (let data of dbResult) {
          let itemQueryResult = new _getSeccionZona.default();
          if (data.ZONAID) itemQueryResult.SECCID = Number.parseInt(data.ZONAID);
          if (data.CODIGO) itemQueryResult.CODIGO = data.CODIGO;
          if (data.DESCRIPCION) itemQueryResult.DESCRIPCION = data.DESCRIPCION;
          if (data.SOCIAEMPRESARIA) itemQueryResult.SOCIAEMPRESARIA = data.SOCIAEMPRESARIA;
          queryResult.push(itemQueryResult);
        }
      }
    }

    ctx.body = queryResult;
  }

  async GetZonaRegion(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = [];

    if (_settings.default.isEnableContingencia(query.codPais) === true) {
      let dbResult = await dbContextOracle.GetZonaRegion(query.codPais, query.codRegi);

      if (dbResult && dbResult.length > 0) {
        for (let data of dbResult) {
          let itemQueryResult = new _getZonaRegion.default();
          if (data.ZONAID) itemQueryResult.ZONAID = Number.parseInt(data.ZonaID);
          if (data.CODIGO) itemQueryResult.CODIGO = data.CODIGO;
          if (data.DESCRIPCION) itemQueryResult.DESCRIPCION = data.DESCRIPCION;
          if (data.GERENTEZONA) itemQueryResult.GERENTEZONA = data.GERENTEZONA;
          if (data.GZEMAIL) itemQueryResult.GZEMAIL = data.GZEMAIL;
          queryResult.push(itemQueryResult);
        }
      }
    } else {
      let dbResult = await dbContextHana.GetZonaRegion(query.codPais, query.codRegi);

      if (dbResult && dbResult.length > 0) {
        for (let data of dbResult) {
          let itemQueryResult = new _getZonaRegion.default();
          if (data.ZONAID) itemQueryResult.ZONAID = Number.parseInt(data.ZONAID);
          if (data.CODIGO) itemQueryResult.CODIGO = data.CODIGO;
          if (data.DESCRIPCION) itemQueryResult.DESCRIPCION = data.DESCRIPCION;
          if (data.GERENTEZONA) itemQueryResult.GERENTEZONA = data.GERENTEZONA;
          if (data.GZEMAIL) itemQueryResult.GZEMAIL = data.GZEMAIL;
          queryResult.push(itemQueryResult);
        }
      }
    }

    ctx.body = queryResult;
  }

  async ValidateZonaRegion(ctx) {
    let query = ctx.params;

    _validator.default.validate(query);

    let queryResult = new _validateZonaRegion.default();

    if (_settings.default.isEnableContingencia(query.codPais) === true) {
      let dbResult = await dbContextOracle.ValidateZonaRegion(query.codPais, query.codRegi, query.codZona);

      if (dbResult && dbResult.length > 0) {
        let data = dbResult[0];
        if (data.REGIONID) queryResult.REGIONID = Number.parseInt(data.REGIONID);
        if (data.CODIGOREGION) queryResult.CODIGOREGION = data.CODIGOREGION;
        if (data.ZONAID) queryResult.ZONAID = Number.parseInt(data.ZONAID);
        if (data.CODIGO) queryResult.CODIGO = data.CODIGO;
        if (data.DESCRIPCION) queryResult.DESCRIPCION = data.DESCRIPCION;
        if (data.GERENTEZONA) queryResult.GERENTEZONA = data.GERENTEZONA;
        if (data.GZEMAIL) queryResult.GZEMAIL = data.GZEMAIL;
      }
    } else {
      let dbResult = await dbContextHana.ValidateZonaRegion(query.codPais, query.codRegi, query.codZona);

      if (dbResult && dbResult.length > 0) {
        let data = dbResult[0];
        if (data.REGIONID) queryResult.REGIONID = Number.parseInt(data.REGIONID);
        if (data.CODIGOREGION) queryResult.CODIGOREGION = data.CODIGOREGION;
        if (data.ZONAID) queryResult.ZONAID = Number.parseInt(data.ZONAID);
        if (data.CODIGO) queryResult.CODIGO = data.CODIGO;
        if (data.DESCRIPCION) queryResult.DESCRIPCION = data.DESCRIPCION;
        if (data.GERENTEZONA) queryResult.GERENTEZONA = data.GERENTEZONA;
        if (data.GZEMAIL) queryResult.GZEMAIL = data.GZEMAIL;
      }
    }

    ctx.body = queryResult;
    return ctx;
  }

}

exports.default = HomeController;