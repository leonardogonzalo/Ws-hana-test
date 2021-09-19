'use strict'

const db = require('./dbConnectionHana');

const GetGruposQuery = require('./cmd/GetGruposQuery');
const GetCuvsGrupoQuery = require('./cmd/GetCuvsGrupoQuery');
const GetCuvBajoRankingQuery = require('./cmd/GetCuvBajoRankingQuery');
const GetDatosPosicionCFQuery = require('./cmd/GetDatosPosicionCFQuery');
const GetDatosPosicionQuery = require('./cmd/GetDatosPosicionQuery');
const GetDatosPosicionReemplazoQuery = require('./cmd/GetDatosPosicionReemplazoQuery');
const GetOidPeriodoQuery = require('./cmd/GetOidPeriodoQuery');
const GetOidClienteQuery = require('./cmd/GetOidClienteQuery');
const GetDatosClienteQuery = require('./cmd/GetDatosClienteQuery');
const GetMontoMaximoClienteQuery = require('./cmd/GetMontoMaximoClienteQuery');
const GetMontoMinimoClienteQuery = require('./cmd/GetMontoMinimoClienteQuery');
const GetCuponesNuevasQuery = require('./cmd/GetCuponesNuevasQuery');
const GetLimiteVentaQuery = require('./cmd/GetLimiteVentaQuery');
const GetVentaExigidaQuery = require('./cmd/GetVentaExigidaQuery');
const GetProductoGanadorQuery = require('./cmd/GetProductoGanadorQuery');
const GetDatosSaldoDeudaQuery = require('./cmd/GetDatosSaldoDeudaQuery');
const GetSaldoClienteQuery = require('./cmd/GetSaldoClienteQuery');
const GetSaldoClientePeriodoQuery = require('./cmd/GetSaldoClientePeriodoQuery');
const GetPromocionesQuery = require('./cmd/GetPromocionesQuery');
const GetPromocionesCVQuery = require('./cmd/GetPromocionesCVQuery');
const GetDatosPosicionPromocionCFQuery = require('./cmd/GetDatosPosicionPromocionCFQuery');
const GetCuvsPromocionQuery = require('./cmd/GetCuvsPromocionQuery');
const GetCuvsDespachoAutomaticoQuery = require('./cmd/GetCuvsDespachoAutomaticoQuery');
const GetCuvsDespachoAutomaticoCVQuery = require('./cmd/GetCuvsDespachoAutomaticoCVQuery');
const GetNivelesOfertaQuery = require('./cmd/GetNivelesOfertaQuery');
const GetRangoNivelQuery = require('./cmd/GetRangoNivelQuery');
const GetProductosNivelQuery = require('./cmd/GetProductosNivelQuery');
const GetProductosGratisQuery = require('./cmd/GetProductosGratisQuery');
const GetNivelesOfertaProductosQuery = require('./cmd/GetNivelesOfertaProductosQuery');
const GetNivelesOfertaProductosNXQuery = require('./cmd/GetNivelesOfertaProductosNXQuery');
const GetNivelesOfertaNXQuery = require('./cmd/GetNivelesOfertaNXQuery');
const GetProductosNivelNXQuery = require('./cmd/GetProductosNivelNXQuery');
const GetRangoNivelNXQuery = require('./cmd/GetRangoNivelNXQuery');
const GetCuvNXQuery = require('./cmd/GetCuvNXQuery');
const GetProductosGratisNXQuery = require('./cmd/GetProductosGratisNXQuery');
const GetDescripcionesProductosQuery = require('./cmd/GetDescripcionesProductosQuery');
const GetAlternativosProductosQuery = require('./cmd/GetAlternativosProductosQuery');

const GetConcursosActivosQuery = require('./cmd/GetConcursosActivosQuery');
const GetValidacionAmbitoGeograficoQuery = require('./cmd/GetValidacionAmbitoGeograficoQuery');
const GetValidacionParticipanteQuery = require('./cmd/GetValidacionParticipanteQuery');
const GetMontoAcumuladoQuery = require('./cmd/GetMontoAcumuladoQuery');
const GetValidacionPasoPedidoQuery = require('./cmd/GetValidacionPasoPedidoQuery');
const GetValidacionPasoPedido2Query = require('./cmd/GetValidacionPasoPedido2Query');
const GetProductosExigidosQuery = require('./cmd/GetProductosExigidosQuery');
const GetProductosIncentivosQuery = require('./cmd/GetProductosIncentivosQuery');
const GetCalculoProductosBoniQuery = require('./cmd/GetCalculoProductosBoniQuery');
const GetProductosExigidosObligQuery = require('./cmd/GetProductosExigidosObligQuery');

const GetValidacionEstatusVenta1Query = require('./cmd/GetValidacionEstatusVenta1Query');
const GetValidacionEstatusVenta2Query = require('./cmd/GetValidacionEstatusVenta2Query');
const GetValidacionEstatusVenta3Query = require('./cmd/GetValidacionEstatusVenta3Query');
const GetValidacionEstatusVenta4Query = require('./cmd/GetValidacionEstatusVenta4Query');

const GetTipoComisionQuery = require('./cmd/GetTipoComisionQuery');
const GetDatosProductoQuery = require('./cmd/GetDatosProductoQuery'); 
const GetMontoTipoComision2 = require('./cmd/GetMontoTipoComision2Query');
const GetMontoTipoComision3 = require('./cmd/GetMontoTipoComision3Query');
const GetZonaRetail = require('./cmd/GetZonaRetailQuery');
const GetCodPeriodo = require('./cmd/GetCodPeriodoQuery');
const GetRetailTipoComision3 = require('./cmd/GetRetailTipoComision3Query');
const GetRetailTipoComision4 = require('./cmd/GetRetailTipoComision4Query');
const GetSolicitudReferencia = require('./cmd/GetSolicitudReferenciaQuery');
const GetMontoTipoComision4Ref = require('./cmd/GetMontoTipoComision4RefQuery');
const GetDatosSolicitudReferencia = require('./cmd/GetDatosSolicitudReferenciaQuery');
const GetMontoTipoComision4Soc = require('./cmd/GetMontoTipoComision4SocQuery');
const GetGruposDescuento = require('./cmd/GetGruposDescuentoQuery');
const GetSubTipoCliente = require('./cmd/GetSubTipoClienteQuery');
const GetProductosComisionables = require('./cmd/GetProductosComisionablesQuery');
const GetTipoGrupoDescuento = require('./cmd/GetTipoGrupoDescuentoQuery');
const GetMontoVariableFinal = require('./cmd/GetMontoVariableFinalQuery');
const GetMontoVariableInicio = require('./cmd/GetMontoVariableInicioQuery');
const GetCabeceraAdicional = require('./cmd/GetCabeceraAdicionalQuery');
const GetDetalleAdicional = require('./cmd/GetDetalleAdicionalQuery')
const GetValidarTipoClienteAdicional = require('./cmd/GetValidarTipoClienteAdicionalQuery');
const GetValidarUAClienteAdicional = require('./cmd/GetValidarUAClienteAdicionalQuery');
const GetMatrizDescuentos = require('./cmd/GetMatrizDescuentosQuery');
const GetRangoDescuentoMonto = require('./cmd/GetRangoDescuentoMontoQuery');
const GetRangoDescuento = require('./cmd/GetRangoDescuentoQuery');

module.exports.getGrupos = function(codigoPais, oidOferta)
{
    let statement = GetGruposQuery.statement(codigoPais, oidOferta);
    return db.execute(statement, [], "GetGruposQuery");
}

module.exports.getCuvsGrupo = function(codigoPais, oidOferta, oidGrupoOferta)
{
    let statement = GetCuvsGrupoQuery.statement(codigoPais, oidOferta, oidGrupoOferta);
    return db.execute(statement, [], "GetCuvsGrupoQuery");
}

module.exports.getCuvBajoRanking = function(codigoPais,  oidOferta, oidGrupoOferta)
{
    let statement = GetCuvBajoRankingQuery.statement(codigoPais, oidOferta, oidGrupoOferta);
    return db.execute(statement, [], "getCuvBajoRanking");
}

module.exports.getDatosPosicionCF = function(codigoPais, arrayOidOferta)
{
    let statement = GetDatosPosicionCFQuery.statement(codigoPais, arrayOidOferta);
    return db.execute(statement, [], "GetDatosPosicionCFQuery");
}

module.exports.getDatosPosicion = function(codigoPais, codigoPeriodo, arrayCuv)
{
    let statement = GetDatosPosicionQuery.statement(codigoPais, codigoPeriodo, arrayCuv);
    return db.execute(statement, [], "getDatosPosicion");
}

module.exports.getDatosPosicionReemplazo =  function(codigoPais, codigoPeriodo, codigoCliente, codigoTerrAdmi, tipoReemplazo, arrayCuv)
{
    let statement = GetDatosPosicionReemplazoQuery.statement(codigoPais, codigoPeriodo, codigoCliente, codigoTerrAdmi, tipoReemplazo, arrayCuv);
    return db.execute(statement, [], "getDatosPosicionReemplazo");
}

module.exports.getOidPeriodo = function(codigoPais, codigoPeriodo)
{
    let statement = GetOidPeriodoQuery.statement(codigoPais, codigoPeriodo);
    return db.execute(statement, [], "getOidPeriodo");
}

module.exports.getOidCliente = function(codigoPais, codigoCliente)
{
    let statement = GetOidClienteQuery.statement(codigoPais, codigoCliente);
    return db.execute(statement, [], "getOidCliente");
}

module.exports.getDatosCliente = function(codigoPais, codigoCliente)
{
    let statement = GetDatosClienteQuery.statement(codigoPais, codigoCliente);
    return db.execute(statement, [], "getDatosCliente");
}

module.exports.getMontoMinimoCliente = function(codigoPais, codigoCliente)
{
    let statement = GetMontoMinimoClienteQuery.statement(codigoPais, codigoCliente);
    return db.execute(statement, [], "getMontoMinimoCliente");
}

module.exports.getMontoMaximoCliente = function(codigoPais, codigoCliente)
{
    let statement = GetMontoMaximoClienteQuery.statement(codigoPais, codigoCliente);
    return db.execute(statement, [], "getMontoMaximoCliente");
}

module.exports.getCuponesNuevas = function(codigoPais, codigoPeriodo)
{
    let statement = GetCuponesNuevasQuery.statement(codigoPais, codigoPeriodo);
    return db.execute(statement, [], "getCuponesNuevas");
}

module.exports.getLimiteVenta = function(codigoPais, codigoCliente, codigoTerrAdmi, arrayDetalleOferta)
{
    let statement = GetLimiteVentaQuery.statement(codigoPais, codigoCliente, codigoTerrAdmi, arrayDetalleOferta);
    return db.execute(statement, [], "getLimiteVenta");
}

module.exports.getVentaExigida = function(codigoPais, codigoPeriodo)
{
    let statement = GetVentaExigidaQuery.statement(codigoPais, codigoPeriodo);    
    return db.execute(statement, [], "getVentaExigida");
}

module.exports.getProductoGanador = function(codigoPais, codigoPeriodo, codigoCliente)
{
    let statement = GetProductoGanadorQuery.statement(codigoPais, codigoPeriodo, codigoCliente);    
    return db.execute(statement, [], "getProductoGanador");
}

module.exports.getDatosSaldoDeuda = function(codigoPais, codigoPaisDefault, codigoPeriodo, codigoCliente)
{
    let statement = GetDatosSaldoDeudaQuery.statement(codigoPais, codigoPaisDefault, codigoPeriodo, codigoCliente);
    return db.execute(statement, [], "getDatosSaldoDeuda");
}

module.exports.getSaldoClientePeriodo = function(codigoPais, codigoCliente, codigoPeriodo)
{
    let statement = GetSaldoClientePeriodoQuery.statement(codigoPais, codigoCliente, codigoPeriodo);
    return db.execute(statement, [], "getSaldoClientePeriodo")  ;
}

module.exports.getSaldoCliente = function(codigoPais, codigoCliente)
{
    let statement = GetSaldoClienteQuery.statement(codigoPais, codigoCliente);
    return db.execute(statement, [], "getSaldoCliente");
}

module.exports.getPromociones = function(codigoPais, oidOferta)
{
    let statement = GetPromocionesQuery.statement(codigoPais, oidOferta);
    return db.execute(statement, [], "getPromociones");
}

module.exports.getPromocionesCV = function(codigoPais, oidOferta)
{
    let statement = GetPromocionesCVQuery.statement(codigoPais, oidOferta);
    return db.execute(statement, [], "getPromocionesCV");
}

module.exports.getDatosPosicionPromocionCF = function(codigoPais, oidOferta)
{
    let statement = GetDatosPosicionPromocionCFQuery.statement(codigoPais, oidOferta);
    return db.execute(statement, [], "getDatosPosicionPromocionCF");
}

module.exports.getCuvsPromocion = function(codigoPais, oidPromocion, cuvs)
{
    let statement = GetCuvsPromocionQuery.statement(codigoPais, oidPromocion, cuvs);
    return db.execute(statement, [], "getCuvsPromocion");
}

module.exports.getCuvsDespachoAutomatico = function(codigoPais, oidPeriodo)
{
    let statement = GetCuvsDespachoAutomaticoQuery.statement(codigoPais, oidPeriodo);
    return db.execute(statement, [], "getCuvsDespachoAutomatico");
}

module.exports.getCuvsDespachoAutomaticoCV = function(codigoPais, oidPeriodo)
{
    let statement = GetCuvsDespachoAutomaticoCVQuery.statement(codigoPais, oidPeriodo);
    return db.execute(statement, [], "getCuvsDespachoAutomaticoCV");
}

module.exports.getNivelesOferta = function(codigoPais, oidPeriodo)
{
    let statement = GetNivelesOfertaQuery.statement(codigoPais, oidPeriodo);
    return db.execute(statement, [], "getNivelesOferta");
}

module.exports.getRangoNivel = function(codigoPais, oidNiveOferta, sumaUnidades)
{
    let statement = GetRangoNivelQuery.statement(codigoPais, oidNiveOferta, sumaUnidades);
    return db.execute(statement, [], "getRangoNivel");
}

module.exports.getProductosGratis = function(codigoPais, oidRango)
{
    let statement = GetProductosGratisQuery.statement(codigoPais, oidRango);
    return db.execute(statement, [], "getProductosGratis");
}

module.exports.getProductosNivel = function(codigoPais, oidNiveOferta)
{
    let statement = GetProductosNivelQuery.statement(codigoPais, oidNiveOferta);
    return db.execute(statement, [], "getProductosNivel");
}

module.exports.getNivelesOfertaProductos = function(codigoPais, oidPeriodo)
{
    let statement = GetNivelesOfertaProductosQuery.statement(codigoPais, oidPeriodo);
    return db.execute(statement, [], "getNivelesOfertaProductos");
}

module.exports.getNivelesOfertaProductosNX = function(codigoPais, oidPeriodo)
{
    let statement = GetNivelesOfertaProductosNXQuery.statement(codigoPais, oidPeriodo);
    return db.execute(statement, [], "getNivelesOfertaProductosNX");
}

module.exports.getNivelesOfertaNX = function(codigoPais, oidPeriodo)
{
    let statement = GetNivelesOfertaNXQuery.statement(codigoPais, oidPeriodo);
    return db.execute(statement, [], "getNivelesOfertaNX");
}

module.exports.getProductosNivelNX = function(codigoPais, oidNiveOferta)
{
    let statement = GetProductosNivelNXQuery.statement(codigoPais, oidNiveOferta);
    return db.execute(statement, [], "getProductosNivelNX");
}

module.exports.getRangoNivelNX = function(codigoPais, oidNiveOferta)
{
    let statement = GetRangoNivelNXQuery.statement(codigoPais, oidNiveOferta);
    return db.execute(statement, [], "getRangoNivelNX");
}

module.exports.getCuvNX = function(codigoPais, oidNiveOferta, oidProducto, factorRepeticion)
{
    let statement = GetCuvNXQuery.statement(codigoPais, oidNiveOferta, oidProducto, factorRepeticion);
    return db.execute(statement, [], "getCuvNX");
}

module.exports.getProductosGratisNX = function(codigoPais, oidRango)
{
    let statement = GetProductosGratisNXQuery.statement(codigoPais, oidRango);
    return db.execute(statement, [], "getProductosGratisNX");
}

module.exports.getDescripcionesProductos = function(codigoPais, codigoSAPs)
{
    let statement = GetDescripcionesProductosQuery.statement(codigoPais, codigoSAPs);
    return db.execute(statement, [], "getDescripcionesProductos");
}

module.exports.getAlternativosProductos = function(codigoPais, oidDetaOfertas)
{
    let statement = GetAlternativosProductosQuery.statement(codigoPais, oidDetaOfertas);
    return db.execute(statement, [], "getAlternativosProductos");
}

module.exports.getConcursosActivos = function(codigoPais, codigoPeriodo, oidCliente)
{
    let statement = GetConcursosActivosQuery.statement(codigoPais, codigoPeriodo, oidCliente);
    return db.execute(statement, [], "getConcursosActivos");
}

module.exports.getValidacionAmbitoGeografico = function(codigoPais, oidCliente, oidConcurso)
{
    let statement = GetValidacionAmbitoGeograficoQuery.statement(codigoPais, oidCliente, oidConcurso);
    return db.execute(statement, [], "getValidacionAmbitoGeografico");
}

module.exports.getValidacionParticipante = function(codigoPais, oidCliente, oidConcurso)
{
    let statement = GetValidacionParticipanteQuery.statement(codigoPais, oidCliente, oidConcurso);
    return db.execute(statement, [], "getValidacionParticipante");
}

module.exports.getMontoAcumulado = function(codigoPais, oidPeriodo, oidCliente)
{
    let statement = GetMontoAcumuladoQuery.statement(codigoPais, oidPeriodo, oidCliente);
    return db.execute(statement, [], "getMontoAcumulado");
}

module.exports.getValidacionPasoPedido = function(codigoPais, codigoPeriodoInicio, codigoPeriodoAnterior, oidCliente, oidConcurso)
{
    let statement = GetValidacionPasoPedidoQuery.statement(codigoPais, codigoPeriodoInicio, codigoPeriodoAnterior, oidCliente, oidConcurso);
    return db.execute(statement, [], "getValidacionPasoPedido");
}

module.exports.getValidacionPasoPedido2 = function(codigoPais, codigoPeriodoInicio, codigoPeriodoAnterior, oidCliente)
{
    let statement = GetValidacionPasoPedido2Query.statement(codigoPais, codigoPeriodoInicio, codigoPeriodoAnterior, oidCliente);
    return db.execute(statement, [], "getValidacionPasoPedido2");
}

module.exports.getProductosExigidos = function(codigoPais, oidConcurso)
{
    let statement = GetProductosExigidosQuery.statement(codigoPais, oidConcurso);
    return db.execute(statement, [], "getProductosExigidos");
}

module.exports.getProductosIncentivos = function(codigoPais, codigoPeriodo, oidConcurso, cuvs)
{
    let statement = GetProductosIncentivosQuery.statement(codigoPais, codigoPeriodo, oidConcurso, cuvs);
    return db.execute(statement, [], "getProductosIncentivos");
}

module.exports.getCalculoProductosBoni = function(codigoPais, codigoPeriodo, 
                                                    oidConcurso, oidProducto, 
                                                    oidTipoOferta, oidMarcaProducto, 
                                                    oidNegocio, oidUnidadNegocio, 
                                                    oidGenerico, oidSuperGenerico, 
                                                    oidDetalleOferta, 
                                                    puntajePos, demandaReal)
{
    let statement = GetCalculoProductosBoniQuery.statement(codigoPais, codigoPeriodo, 
                                                            oidConcurso, oidProducto, 
                                                            oidTipoOferta, oidMarcaProducto, 
                                                            oidNegocio, oidUnidadNegocio, 
                                                            oidGenerico, oidSuperGenerico, 
                                                            oidDetalleOferta, 
                                                            puntajePos, demandaReal);
    return db.execute(statement, [], "getCalculoProductosBoni");
}

module.exports.getProductosExigidosOblig = function(codigoPais, codigoPeriodo,
                                                    oidConcurso, oidProducto, 
                                                    oidTipoOferta, oidMarcaProducto,
                                                    oidNegocio, oidUnidadNegocio,
                                                    oidGenerico, oidSuperGenerico,
                                                    oidDetalleOferta)
{
    let statement = GetProductosExigidosObligQuery.statement(codigoPais, codigoPeriodo,
                                                            oidConcurso, oidProducto, 
                                                            oidTipoOferta, oidMarcaProducto,
                                                            oidNegocio, oidUnidadNegocio,
                                                            oidGenerico, oidSuperGenerico,
                                                            oidDetalleOferta);
    return db.execute(statement, [], "getProductosExigidosOblig");
}

module.exports.getValidacionEstatusVenta1 = function(codigoPais, codigoPeriodo, oidConcurso)
{
    let statement = GetValidacionEstatusVenta1Query.statement(codigoPais, codigoPeriodo, oidConcurso);
    return db.execute(statement, [], "getValidacionEstatusVenta1");
}

module.exports.getValidacionEstatusVenta2 = function(codigoPais, codigoPeriodoDesde, codigoPeriodoAnterior, oidCliente, oidEstatus)
{
    let statement = GetValidacionEstatusVenta2Query.statement(codigoPais, codigoPeriodoDesde, codigoPeriodoAnterior, oidCliente, oidEstatus);
    return db.execute(statement, [], "getValidacionEstatusVenta2");
}

module.exports.getValidacionEstatusVenta3 = function(codigoPais, codigoPeriodoAnterior, oidCliente, oidEstatus2)
{
    let statement = GetValidacionEstatusVenta3Query.statement(codigoPais, codigoPeriodoAnterior, oidCliente, oidEstatus2);
    return db.execute(statement, [], "getValidacionEstatusVenta3");
}

module.exports.getValidacionEstatusVenta4 = function(codigoPais, codigoPeriodo, oidCliente, oidEstatus, oidEstatus2)
{
    let statement = GetValidacionEstatusVenta4Query.statement(codigoPais, codigoPeriodo, oidCliente, oidEstatus, oidEstatus2);
    return db.execute(statement, [], "getValidacionEstatusVenta4");
}

module.exports.getTipoComision = function(codigoPais, tipoSolicitud)
{
    let statement = GetTipoComisionQuery.statement(codigoPais, tipoSolicitud);
    return db.execute(statement, [], "getTipoComision", true);
}

module.exports.getDatosProducto = function(codigoPais, oidPeriodo, arrayCuv)
{
    let statement = GetDatosProductoQuery.statement(codigoPais, oidPeriodo, arrayCuv);
    return db.execute(statement, [], "getDatosProducto");
}

module.exports.getMontoTipoComision2 = function(codigoPais, oidPeriodo, oidCliente)
{
    let statement = GetMontoTipoComision2.statement(codigoPais, oidPeriodo, oidCliente);
    return db.execute(statement, [], "getMontoTipoComision2", true);
}

module.exports.getMontoTipoComision3 = function(codigoPais, oidPeriodo, oidCliente)
{
    let statement = GetMontoTipoComision3.statement(codigoPais, oidPeriodo, oidCliente);
    return db.execute(statement, [], "getMontoTipoComision3", true);
}

module.exports.getZonaRetail = function(codigoPais, oidZona)
{
    let statement = GetZonaRetail.statement(codigoPais, oidZona);
    return db.execute(statement, [], "getZonaRetail", true);
}

module.exports.getCodPeriodo = function(codigoPais, oidPeriodo)
{
    let statement = GetCodPeriodo.statement(codigoPais, oidPeriodo);
    return db.execute(statement, [], "getCodPeriodo");
}

module.exports.getRetailTipoComision3 = function(codigoPais, codigoPaisDefault, codigoPeriodo, codigoPeriodoAnt, codigoCliente)
{
    let statement = GetRetailTipoComision3.statement(codigoPais, codigoPaisDefault, codigoPeriodo, codigoPeriodoAnt, codigoCliente);
    return db.execute(statement, [], "getRetailTipoComision3", true);
}

module.exports.getRetailTipoComision4 = function(codigoPais, codigoPaisDefault, codigoPeriodoRef, codigoPeriodoRefAnt, codigoCliente, fechaFacturacionRef)
{
    let statement = GetRetailTipoComision4.statement(codigoPais, codigoPaisDefault, codigoPeriodoRef, codigoPeriodoRefAnt, codigoCliente, fechaFacturacionRef);
    return db.execute(statement, [], "getRetailTipoComision4", true);
}

module.exports.getSolicitudReferencia = function(codigoPais, oidSolicitud)
{
    let statement = GetSolicitudReferencia.statement(codigoPais, oidSolicitud);
    return db.execute(statement, [], "getSolicitudReferencia");
}

module.exports.getMontoTipoComision4Ref = function(codigoPais, oidSolicitud)
{
    let statement = GetMontoTipoComision4Ref.statement(codigoPais, oidSolicitud);
    return db.execute(statement, [], "getMontoTipoComision4Ref", true);
}

module.exports.getDatosSolicitudReferencia = function(codigoPais, oidSolicitudRef)
{
    let statement = GetDatosSolicitudReferencia.statement(codigoPais, oidSolicitudRef);
    return db.execute(statement, [], "getDatosSolicitudReferencia", true);
}

module.exports.getMontoTipoComision4Soc = function(codigoPais, oidPeriodoRef, oidCliente, fechaFacturacionRef)
{
    let statement = GetMontoTipoComision4Soc.statement(codigoPais, oidPeriodoRef, oidCliente, fechaFacturacionRef);
    return db.execute(statement, [], "getMontoTipoComision4Soc", true);
}

module.exports.getGruposDescuento = function(codigoPais)
{
    let statement = GetGruposDescuento.statement(codigoPais);
    return db.execute(statement, [], "getGruposDescuento");
}

module.exports.getSubTipoCliente = function(codigoPais, oidCliente)
{
    let statement = GetSubTipoCliente.statement(codigoPais, oidCliente);
    return db.execute(statement, [], "getSubTipoCliente", true);
}

module.exports.getProductosComisionables = function(codigoPais, oidPeriodo, arrayCuvs)
{
    let statement = GetProductosComisionables.statement(codigoPais, oidPeriodo, arrayCuvs);
    return db.execute(statement, [], "getProductosComisionables");
}

module.exports.getTipoGrupoDescuento = function(codigoPais, codigoGrupoDescuento)
{
    let statement = GetTipoGrupoDescuento.statement(codigoPais, codigoGrupoDescuento);
    return db.execute(statement, [], "getTipoGrupoDescuento", true);
}

module.exports.getMontoVariableFinal = function(codigoPais, grupoDescuentoVari, rangoDescuentoVari)
{
    let statement = GetMontoVariableFinal.statement(codigoPais, grupoDescuentoVari, rangoDescuentoVari);
    return db.execute(statement, [], "getMontoVariableFinal", true);
}

module.exports.getMontoVariableInicio = function(codigoPais, grupoDescuentoVari, rangoDescuentoVari)
{
    let statement = GetMontoVariableInicio.statement(codigoPais, grupoDescuentoVari, rangoDescuentoVari);
    return db.execute(statement, [], "getMontoVariableInicio", true);
}

module.exports.getCabeceraAdicional = function(codigoPais, codigoPeriodo, codGrupoDescuento)
{
    let statement = GetCabeceraAdicional.statement(codigoPais, codigoPeriodo, codGrupoDescuento);
    return db.execute(statement, [], "getCabeceraAdicional");
}

module.exports.getDetalleAdicional = function(codigoPais, codDescuestoAdic)
{
    let statement = GetDetalleAdicional.statement(codigoPais, codDescuestoAdic);
    return db.execute(statement, [], "getDetalleAdicional");
}

module.exports.getValidarTipoClienteAdicional = function(codigoPais, codTipoClasificacion, codClasificacion, codTipoCliente, codSubTipoCliente, oidCliente)
{
    let statement = GetValidarTipoClienteAdicional.statement(codigoPais, codTipoClasificacion, codClasificacion, codTipoCliente, codSubTipoCliente, oidCliente);
    return db.execute(statement, [], "getValidarTipoClienteAdicional", true);
}

module.exports.getValidarUAClienteAdicional = function(codigoPais, codigoRegion, codigoZona, oidCliente)
{
    let statement = GetValidarUAClienteAdicional.statement(codigoPais, codigoRegion, codigoZona, oidCliente);
    return db.execute(statement, [], "getValidarUAClienteAdicional", true);
}

module.exports.getMatrizDescuentos = function(codigoPais, codigoPeriodo, categoriaDescuento)
{
    let statement = GetMatrizDescuentos.statement(codigoPais, codigoPeriodo, categoriaDescuento);
    return db.execute(statement, [], "getMatrizDescuentos");
}

module.exports.getRangoDescuentoMonto = function(codigoPais, codGrupoDescuento, montoPedido)
{
    let statement = GetRangoDescuentoMonto.statement(codigoPais, codGrupoDescuento, montoPedido);
    return db.execute(statement, [], "getRangoDescuentoMonto", true);
}

module.exports.getRangoDescuento = function(codigoPais, codGrupoDescuento)
{
    let statement = GetRangoDescuento.statement(codigoPais, codGrupoDescuento);
    return db.execute(statement, [], "getRangoDescuento", true);
}