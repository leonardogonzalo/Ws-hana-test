class PedidoConsolidado 
{

    constructor()
    {
        this.codigoCliente = "";
        this.codigoPeriodo = "";
        this.codigoPais = "";
        this.oidTerrAdmi = "";
        this.indValiProl = "";
        this.estadoPedidoMontoMinimo = "";
        this.montoPedidoMontoMinimo = "";
        this.codigoVentaGanador = "";
        this.oidOfertaGanador = "";
        this.oidProductoGanador = "";
        this.precioGanador = "";
        this.formaPagoGanador = "";
        this.estadoPedidoMontoMaximo = "";
        this.montoPedidoMontoMaximo = "0";
        this.montoMaximo = "0";
        this.montoBaseDcto = "0";
        this.montoBaseDctoAcum = "0";
        this.montoVentaRetail = "0";
        this.porcDescVariAlca = "0";
        this.porcDescFijoAlca = "0";
        this.valRangInicVari = "0";
        this.valRangFinaVari = "0";
        this.montoTiendaVirtual = "0";
        this.indicadorErrorDeuda = "0";
        this.montoSaldoDeuda = "0";
        this.montoReclamoPendiente = "0";
        this.montoSaldoRechazo = "0";
        this.oidCliente = "";
        this.oidPeriodo = "";
        this.montoTotalDcto = "0";
        this.montoTotalOpAhorro = "0";        
        this.indNueva = "0";
        this.posiciones = [];
        this.concursos = [];
    }
}

exports.PedidoConsolidado = PedidoConsolidado;

class PedidoConsolidadoPosicion 
{

    constructor()
    {
        this.cuv = "";
        this.unidadesDemandadas = "0";
        this.unidadesPorAtender = "0";
        this.indLimiteVenta = "";
        this.oidOferta = "";
        this.oidDetaOferta = "";
        this.oidEstrategia = "";
        this.oidFormaPago = "";
        this.pagina = "";
        this.oidCatalogo = "";
        this.precioUnitario = "0";
        this.precioCatalogo = "0";
        this.precioContable = "0";
        this.factorRepeticion = "";
        this.oidGrupoOferta = "";
        this.oidIndicadorCuadre = "";
        this.factorCuadre = "";
        this.ranking = "";
        this.oidTipoPosicion = "";
        this.oidSubtipoPosicion = "";
        this.observaciones = "";
        this.oidNiveOferta = "";
        this.oidNiveOfertaRango = "";
        this.numUnidOrig = "";
        this.valCodiOrig = "";
        this.indAccion = "";
        this.oidProducto = "";
        this.oidNiveOfertaGratis = "";
        this.oidPosicion = "";
        this.codigoSap = "";
        this.numeroSeccionDetalle = "";
        this.precioPublico = "0";
        this.indicadorRecuperacion = "";
        this.porcentajeDescuento = "0";
        this.grupoDescuento = "0";
        this.escalaDescuento = "";
        this.importeDescuento1 = "0";
        this.importeDescuento2 = "0";
        this.descripcionSap = "";
        this.alternativos = [];
        this.montoOpAhorro = "";
    } 

}
exports.PedidoConsolidadoPosicion = PedidoConsolidadoPosicion;

class PedidoConsolidadoAlternativo
{

    constructor()
    {
        this.oidDetaOferta = "";
        this.oidProducto = "";
        this.codigoSap = "";
        this.cuv = "";
        this.numeroOrden = "";
    }

}
exports.PedidoConsolidadoAlternativo = PedidoConsolidadoAlternativo;

class PedidoConsolidadoConcurso
{
    constructor()
    {
        this.codigoConcurso = "";
        this.nombreConcurso = "";
        this.puntajeTotal = "";
        this.puntajeBonificado = "";
        this.puntajeExigido = "";
    }

}

exports.PedidoConsolidadoConcurso = PedidoConsolidadoConcurso;