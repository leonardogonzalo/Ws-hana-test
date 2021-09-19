"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _koaRouter = _interopRequireDefault(require("koa-router"));

var _home = _interopRequireDefault(require("../controllers/home"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let router = new _koaRouter.default();
let home = new _home.default();
router.get("/ObtenerCantGananciaYSaldoRefac/:codPais/:campania/:codRegi?/:codZona?/:codSecc?", home.GetCantGananciaYSaldoRefac);
router.get("/ObtenerCantListActividadRefac/:codPais/:campania/:facturacion/:codRegi?/:codZona?/:codSecc?", home.GetCantListActividadRefac);
router.get("/ObtenerCantListCicloNuevas/:codPais/:campania/:tipo/:codRegi?/:codZona?", home.GetCantListCicloNuevas);
router.get("/ObtenerCantListPedidosVentaRefac/:codPais/:campania/:tipo/:facturacion/:codRegi?/:codZona?/:codSecc?", home.GetCantListPedidosVentaRefac);
router.get("/ObtenerCountListPegRefac/:codPais/:campania/:facturacion/:codRegi?/:codZona?", home.GetCountListPegRefac);
router.get("/ObtenerCantListPosiblesConsecutivasRefac/:codPais/:campania/:codRegi?/:codZona?/:codSecc?", home.GetCantListPosiblesConsecutivasRefac);
router.get("/ObtenerCantSaldoPendienteRefac/:codPais/:campania/:codRegi?/:codZona?/:codSecc?", home.GetCantSaldoPendienteRefac);
router.get("/ObtenerIndicadorCicloNuevas/:codPais/:campania/:tipo/:codRegi?/:codZona?/:codSecc?", home.GetIndicadorCicloNuevas);
router.get("/ObtenerGananciaSaldoRefac/:codPais/:campania/:codRegi/:codZona/:codSecc", home.GetGananciaSaldoRefac);
router.get("/ObtenerIndicadorPosibleConsecu/:codPais/:campania/:tipo/:codRegi?/:codZona?/:codSecc?", home.GetIndicadorPosibleConsecu);
router.get("/ObtenerSeccionZona/:codPais/:codRegi/:codZona", home.GetSeccionZona);
router.get("/ObtenerCampaniaActualRefac/:codPais/:codRol/:codRegi?/:codZona?", home.GetCampaniaActualRefac);
router.get("/ObtenerCampania/:codPais/:campania/:periodos", home.GetCampania);
router.get("/ObtenerCantListCapitalizacionRefac/:codPais/:campania/:tipo/:facturacion/:codRegi?/:codZona?/:codSecc?", home.GetCantListCapitalizacionRefac);
router.get("/ObtenerCantListPedido/:codPais/:campania/:tipo/:facturacion/:codRegi?/:codZona?", home.GetCantListPedido);
router.get("/ObtenerCantListVentaNeta/:codPais/:campania/:tipo/:facturacion/:codRegi?/:codZona?", home.GetCantListVentaNeta);
router.get("/ObtenerEstadoConsultora/:codPais", home.GetEstadoConsultora);
router.get("/ObtenerIndicadorActividad/:codPais/:campania/:tipo/:codRegi?/:codZona?/:codSecc?", home.GetIndicadorActividad);
router.get("/ObtenerIndicadorCapitalizacion/:codPais/:campania/:tipo/:codRegi?/:codZona?/:codSecc?", home.GetIndicadorCapitalizacion);
router.get("/ObtenerIndicadorPedidos/:codPais/:campania/:codRegi?/:codZona?/:codSecc?", home.GetIndicadorPedidos);
router.get("/ObtenerIndicadorPosiblesEgresos/:codPais/:campania/:tipo/:codRegi?/:codZona?/:codSecc?", home.GetIndicadorPosiblesEgresos);
router.get("/ObtenerIndicadorVentas/:codPais/:campania/:tipo/:codRegi?/:codZona?/:codSecc?", home.GetIndicadorVentas);
router.get("/ObtenerListActividad_dev/:codPais/:campania/:facturacion/:codRegi?/:codZona?/:codSecc?", home.GetListActividadDev);
router.get("/ObtenerListActividad/:codPais/:campania/:facturacion/:codRegi?/:codZona?/:codSecc?", home.GetListActividad);
router.get("/ObtenerListCapitalizacionRefac/:codPais/:campania/:tipo/:facturacion/:codRegi?/:codZona?/:codSecc?", home.GetListCapitalizacionRefac);
router.get("/ObtenerListCicloNuevasAll/:codPais/:campania/:tipo/:indConsul/:codZona?/:codSecc?", home.GetListCicloNuevasAll);
router.get("/ObtenerListCicloNuevas/:codPais/:campania/:tipo/:codZona?/:codSecc?", home.GetListCicloNuevas);
router.get("/ObtenerListGananciaYSaldo/:codPais/:campania/:codRegi?/:codZona?/:codSecc?", home.GetListGananciaYSaldo);
router.get("/ObtenerListPedidosVentaRefac/:codPais/:campania/:tipo/:ordenamiento/:facturacion/:codRegi?/:codZona?/:codSecc?", home.GetListPedidosVentaRefac);
router.get("/ObtenerListPegRefac/:codPais/:campania/:esPEGCx/:facturacion/:codRegi?/:codZona?/:codSecc?", home.GetListPegRefac);
router.get("/ObtenerListPosiblesConsecutivasRefac/:codPais/:campania/:ordenamiento/:codRegi?/:codZona?/:codSecc?", home.GetListPosiblesConsecutivasRefac);
router.get("/ObtenerListSaldoPendiente/:codPais/:campania/:codRegi?/:codZona?/:codSecc?", home.GetListSaldoPendiente);
router.get("/ObtenerListVentaNeta/:codPais/:campania/:tipo/:facturacion/:codZona?/:codSecc?", home.GetListVentaNeta);
router.get("/ObtenerRegionZonaSeccionActividad/:codPais/:campania/:tipo/:codRegi?/:codZona?", home.GetRegionZonaSeccionActividad);
router.get("/ObtenerRegionZonaSeccionCapitalizacion/:codPais/:campania/:tipo/:codRegi?/:codZona?", home.GetRegionZonaSeccionCapitalizacion);
router.get("/ObtenerRegionZonaSeccionCicloNuevas/:codPais/:campania/:facturacion/:codRegi?/:codZona?", home.GetRegionZonaSeccionCicloNuevas);
router.get("/ObtenerRegionZonaSeccionCobranza/:codPais/:campania/:codRegi?/:codZona?", home.GetRegionZonaSeccionCobranza);
router.get("/ObtenerRegionZonaSeccionPedido/:codPais/:campania/:tipo/:codRegi?/:codZona?", home.GetRegionZonaSeccionPedido);
router.get("/ObtenerRegionZonaSeccionPosiblesConsecutivas/:codPais/:campania/:facturacion/:codRegi?/:codZona?", home.GetRegionZonaSeccionPosiblesConsecutivas);
router.get("/ObtenerRegionZonaSeccionVenta/:codPais/:campania/:facturacion/:codRegi?/:codZona?", home.GetRegionZonaSeccionVenta);
router.get("/ObtenerRegiZonaSeccPeg/:codPais/:campania/:facturacion/:codRegi?/:codZona?", home.GetRegiZonaSeccPeg);
router.get("/ObtenerSaldoPendiente/:codPais/:campania/:tipo/:codRegi?/:codZona?/:codSecc?", home.GetSaldoPendiente);
router.get("/ObtenerZonaRegion/:codPais/:codRegi", home.GetZonaRegion);
router.get("/ValidarZonaRegion/:codPais/:codRegi/:codZona", home.ValidateZonaRegion);
/*
router.get(
  "/ObtenerCantListActividadRefacQuery/:codPais/:campania/:facturacion/:codRegi/:codZona/:codSecc",
  home.ObtenerCantListActividadRefacQuery
);*/

var _default = router;
exports.default = _default;