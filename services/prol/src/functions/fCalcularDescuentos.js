'use strict'

const logger = require('./../utility/Logger');
const dbContext = require('../data-access/dbContextValidaciones');
const common = require('./common/base');
const funciones = require('../utility/funciones');
const constantes = require('../utility/constantes');

async function validate(objPedidoConsolidado) 
{    
    let performance = logger.start("Starting Descuentos");  

    let porcDescVariAlca = 0;
    let porcDescFijoAlca = 0;
    let grupoDescuentoVari;
    let rangoDescuentoVari;
    let indOtCanales = '0';
    let aplicarDcto = true;

    //La funcion obtenerDatosPedido ya fue cargada en el CuadreOfertas
    // Datos del Pedido
    /*
    let objDatosPedido = await common.obtenerDatosPedido(objPedidoConsolidado.codigoPais, objPedidoConsolidado.codigoPeriodo, objPedidoConsolidado.codigoCliente);
    objPedidoConsolidado.oidCliente = objDatosPedido.oidCliente;
    objPedidoConsolidado.oidZona = objDatosPedido.oidZona;
    objPedidoConsolidado.oidPeriodo = objDatosPedido.oidPeriodo;
    */

    //Obtener Pais Default
    let codigoPaisDefault = funciones.obtenerPaisDefault(objPedidoConsolidado.codigoPais);
    
    //Extraido de Cuadre Ofertas Consolidado
    objPedidoConsolidado.tipoSolicitud = "SOC";

    if(objPedidoConsolidado.tipoSolicitud === 'SOC')
    {
        objPedidoConsolidado.oidModulo = '1';       //Falta definir
    }
    else
    {
        objPedidoConsolidado.oidModulo = '15';      //Falta definir
    }

    //Recuperar el valor del parametro
    let codigoSistema = constantes.CODIGO_SISTEMA.RET;
    let codigoParametro = 'IndOtrosCanales';
    let lstParametrosPais = await common.obtenerParametroPais(objPedidoConsolidado.codigoPais, '', codigoSistema, codigoParametro, '', '', '', '');

    if(lstParametrosPais != null) {
        indOtCanales = lstParametrosPais.valorParametro;
    }

    //Obtener tipo comision
    let dbResultTipoComision = await dbContext.getTipoComision(objPedidoConsolidado.codigoPais, objPedidoConsolidado.tipoSolicitud);
    let objTipoComision = dbResultTipoComision.TIPOCOMISION;
    //Actualizar precios unitarios de CUVS
    let arrayCuvs = [];
    let i= 0;

    let montoPedidoActual = 0;
    for (let posicion of objPedidoConsolidado.posiciones)
    {
        arrayCuvs.push(posicion.cuv);
        montoPedidoActual = montoPedidoActual + Number.parseFloat(posicion.unidadesPorAtender) * Number.parseFloat(posicion.precioUnitario);        
    }

    let lstDatosProducto;

    if(arrayCuvs.length > 0)
    {
        lstDatosProducto = await dbContext.getDatosProducto(objPedidoConsolidado.codigoPais, objPedidoConsolidado.oidPeriodo, arrayCuvs);        
    }

    if(lstDatosProducto != null)
    {
        for(let objDatosProducto of lstDatosProducto) 
        {
            for(let posicion of objPedidoConsolidado.posiciones) 
            {
                if(objDatosProducto.CODIGOVENTA == posicion.cuv)
                {
                    posicion.precioUnitario = objDatosProducto.PRECIOUNITARIO;
                }    
            };
        };
    }

    //Verificar el indicador tipo comision
    let montoBaseDcto = 0;
    let montoBaseDctoHist = 0;
    let montoVentaRetailHist = 0;
    let montoTiendaVirtualHist = 0; 

    if(objTipoComision == 2){
        let objMontoTipoComision2 = await dbContext.getMontoTipoComision2(objPedidoConsolidado.codigoPais,objPedidoConsolidado.oidPeriodo, objPedidoConsolidado.oidCliente);

        if(objMontoTipoComision2 != null){
            montoBaseDcto = parseFloat(objMontoTipoComision2.MONTO);
        }
                
        montoBaseDctoHist = montoBaseDcto;
        montoBaseDcto = montoBaseDcto + montoPedidoActual;
    }
    else if(objTipoComision == 3)
    {

        let objMontoTipoComision3 = await dbContext.getMontoTipoComision3(objPedidoConsolidado.codigoPais, objPedidoConsolidado.oidPeriodo, objPedidoConsolidado.oidCliente);

        if(objMontoTipoComision3 != null)
        {
            montoBaseDcto = parseFloat(objMontoTipoComision3.MONTO);

            let montoVentaRetail = 0;
            let montoTiendaVirtual = 0; 
                                
            let esZonaRetail = await devuelveZonaRetail(objPedidoConsolidado.codigoPais, objPedidoConsolidado.oidZona);

            if(esZonaRetail === '1' || indOtCanales === '1')
            {
                let codPeriodoAnt = common.obtenerPeriodo(objPedidoConsolidado.codigoPeriodo, -1);
                let objRetailTipoComision3 = await dbContext.getRetailTipoComision3(objPedidoConsolidado.codigoPais, codigoPaisDefault, objPedidoConsolidado.codigoPeriodo, codPeriodoAnt, objPedidoConsolidado.codigoCliente);

                if(objRetailTipoComision3.MONTOVENTARETAIL != null)
                {
                    montoVentaRetail = parseFloat(objRetailTipoComision3.MONTOVENTARETAIL);
                }

                if(objRetailTipoComision3.MONTOTIENDAVIRTUAL != null)
                {
                    montoTiendaVirtual = parseFloat(objRetailTipoComision3.MONTOTIENDAVIRTUAL);
                }                
            }
            
            montoBaseDctoHist = montoBaseDcto;
            montoVentaRetailHist = montoVentaRetail;
            montoTiendaVirtualHist = montoTiendaVirtual;
            montoBaseDcto = montoBaseDcto + montoVentaRetail + montoTiendaVirtual + montoPedidoActual;
        }
    }
    else if(objTipoComision == 4)
    {
        if(objPedidoConsolidado.tipoSolicitud != 'SOC' && objPedidoConsolidado.oidModulo == '15' && objPedidoConsolidado.codigoPais == '')
        { //Falta definir oidModulo
            let objSolicitudReferencia = await dbContext.getSolicitudReferencia(objPedidoConsolidado.codigoPais, objPedidoConsolidado.oidSolicitud);
            
            if(objSolicitudReferencia == null)
            {
                let objMontoTipoComision4Ref = await dbContext.getMontoTipoComision4Ref(objPedidoConsolidado.codigoPais, objPedidoConsolidado.oidSolicitud);

                objPedidoConsolidado.montoBaseDctoTipoComision4 = objMontoTipoComision4Ref.MONTO; //Falta definir montoBaseDctoTipoComision4
                montoBaseDctoHist = objMontoTipoComision4Ref.MONTO;
            }
            else
            {
                let objDatosSolicitudReferencia = await dbContext.getDatosSolicitudReferencia(objPedidoConsolidado.codigoPais, objSolicitudReferencia.OIDSOLICITUDREF); //Falta definir oidSolicitudRef

                if(objDatosSolicitudReferencia.TIPOSOLICITUDREF == 'SOC')
                {
                    if(objDatosSolicitudReferencia.TIPOCOMISIONREF == '1')
                    {
                        montoBaseDcto = parseFloat(objDatosSolicitudReferencia.MONTOBASEREF);
                        objPedidoConsolidado.montoBaseDctoTipoComision4 = montoBaseDcto;    //Falta definir montoBaseDctoTipoComision4
                        montoBaseDctoHist = montoBaseDcto;
                    }
                    else if(objDatosSolicitudReferencia.TIPOCOMISIONREF == '3')
                    {
                        let objMontoTipoComision4Soc = await dbContext.getMontoTipoComision4Soc(objPedidoConsolidado.codigoPais, objDatosSolicitudReferencia.OIDPERIODOREF, objPedidoConsolidado.oidCliente, objDatosSolicitudReferencia.FECHAFACTURACIONREF);
                        montoBaseDcto = parseFloat(objMontoTipoComision4Soc.MONTO);
                        objPedidoConsolidado.montoBaseDctoTipoComision4 =  montoBaseDcto;  //Falta definir montoBaseDctoTipoComision4

                        let montoVentaRetail = 0;
                        let montoTiendaVirtual = 0;
                        let esZonaRetail = await devuelveZonaRetail(objPedidoConsolidado.codigoPais, objDatosSolicitudReferencia.OIDZONAREF);    
                        
                        if(esZonaRetail == '1' || indOtCanales == '1')
                        {
                            let objCodPeriodo = await dbContext.getCodPeriodo(objPedidoConsolidado.codigoPais, objDatosSolicitudReferencia.OIDPERIODOREF);
                            let codigoPeriodoRef = objCodPeriodo[0].CODPERIODO;                            
                            let codigoPeriodoRefAnt = common.obtenerPeriodo(codigoPeriodoRef, -1);

                            let objRetailTipoComision4 = await dbContext.getRetailTipoComision4(objPedidoConsolidado.codigoPais, codigoPaisDefault, codigoPeriodoRef, codigoPeriodoRefAnt, objPedidoConsolidado.codigoCliente, objDatosSolicitudReferencia.FECHAFACTURACIONREF);
                        
                            if(objRetailTipoComision4.MONTOVENTARETAIL != null)
                            {
                                montoVentaRetail = parseFloat(objRetailTipoComision4.MONTOVENTARETAIL);                                
                            }
                            else
                            {
                                montoVentaRetail = 0;
                            }

                            if(objRetailTipoComision4.MONTOTIENDAVIRTUAL != null)
                            {
                                montoTiendaVirtual = parseFloat(objRetailTipoComision4.MONTOTIENDAVIRTUAL);
                            }
                            else
                            {
                                montoTiendaVirtual = 0;
                            }

                            montoBaseDctoHist = montoBaseDcto;
                            montoVentaRetailHist = montoVentaRetail;
                            montoTiendaVirtualHist = montoTiendaVirtual;
                            montoBaseDcto = montoBaseDcto + montoVentaRetail + lnMontoTiendaVirtual + montoPedidoActual;
                        }
                    }
                    else
                    {
                        aplicarDcto = false;
                    }
                }
                else
                {
                    //--PARA EL CASO DE LAS SOLICITUDES DE ATENCION
                    montoBaseDcto = objDatosSolicitudReferencia.MONTOBASEREF + montoPedidoActual;
                    objPedidoConsolidado.montoBaseDctoTipoComision4 = montoBaseDcto;
                    montoBaseDctoHist = montoBaseDcto;
                }
            }
        }
        else{
            aplicarDcto = false;
        }
    }
    else
    {
        let montoPedido = 0;

        if(objPedidoConsolidado.montoPedido == '')
        { //Falta definir montoPedido
            for(let objPedidoConsolidadoPosicion of objPedidoConsolidado.posiciones)
            {
                //montoPedido = montoPedido + (parseFloat(objPedidoConsolidadoPosicion.unidadesDemandadas) * parseFloat(objPedidoConsolidadoPosicion.precioUnitario));
                //Se cambia unidadesDemandadas por unidadesPorAtender porque en la version Java funcion CuadreOfertasConsolidado
                //se manda los cuvs seteando el campo unidadesPorAtender en unidadesDemandas
                //line 231 posicionWebService.setUnidadesDemandadas(pedido.getPosiciones()[i].getUnidadesPorAtender());
                montoPedido = montoPedido + (parseFloat(objPedidoConsolidadoPosicion.unidadesPorAtender) * parseFloat(objPedidoConsolidadoPosicion.precioUnitario));
            };
        }
        else
        {
            montoPedido = parseFloat(objPedidoConsolidado.montoPedido); //Falta definir montoPedido
        }

        montoBaseDcto = montoPedido;
        montoBaseDctoHist = montoBaseDcto;
    }

    if(aplicarDcto)
    {
        let codGrupoDescuento;
        let codRangoDescuento;
        let porcDescuento;
        let porcDescuentoAux;
        let objDescuento;

        let lstGruposDescuento = await dbContext.getGruposDescuento(objPedidoConsolidado.codigoPais);
        let descuentoAdicional = new Map();
        
        if(lstGruposDescuento != null)
        {
            //array.forEach(objGruposDescuento => 
            for(let objGruposDescuento of lstGruposDescuento)
            {
                descuentoAdicional = await calcularDescuentoAdicional(objGruposDescuento.CODGRUPODESCUENTO, objPedidoConsolidado.oidCliente, objPedidoConsolidado.oidSolicitud, montoBaseDcto,  objPedidoConsolidado.codigoPeriodo, objPedidoConsolidado.codigoPais, descuentoAdicional);  //Por Implementar 
            };
        }

        let objSubTipoCliente = await dbContext.getSubTipoCliente(objPedidoConsolidado.codigoPais, objPedidoConsolidado.oidCliente);
        let arrayCuvsAux = [];
        let iten = 0;

        for(let objPedidoConsolidadoPosicion of objPedidoConsolidado.posiciones) 
        {
            arrayCuvsAux.push(objPedidoConsolidadoPosicion.cuv);
        };

        let lstProductosComisionables;

        if(arrayCuvs.length > 0)
        {
            let oidPeriodo = objPedidoConsolidado.oidPeriodo;
            if(objTipoComision === 4) 
            {
                oidPeriodo = objDatosSolicitudReferencia.OIDPERIODOREF;
            }
            lstProductosComisionables = await dbContext.getProductosComisionables(objPedidoConsolidado.codigoPais, oidPeriodo, arrayCuvsAux);            
        }
    
        if(lstProductosComisionables != null)
        {
            //lstProductosComisionables.forEach(objProductosComisionables => 
            for(let objProductosComisionables of lstProductosComisionables)
            {
                
                //objPedidoConsolidado.posiciones.forEach(objPedidoConsolidadoPosicion => 
                for(let objPedidoConsolidadoPosicion of objPedidoConsolidado.posiciones)
                {
                    if(objProductosComisionables.CODIGOVENTA === objPedidoConsolidadoPosicion.cuv)
                    {
                        porcDescuento = null;

                        if(objPedidoConsolidadoPosicion.porcentajeDescuento != null && parseFloat(objPedidoConsolidadoPosicion.porcentajeDescuento) > 0)
                        {
                            porcDescuento = parseFloat(objPedidoConsolidadoPosicion.porcentajeDescuento);
                            codGrupoDescuento = parseInt(objPedidoConsolidadoPosicion.grupoDescuento);
                            codRangoDescuento = parseInt(objPedidoConsolidadoPosicion.escalaDescuento);

                            let objTipoGrupoDescuento = await dbContext.getTipoGrupoDescuento(objPedidoConsolidadoPosicion.codigoPais, objPedidoConsolidadoPosicion.grupoDescuento);

                            if(objTipoGrupoDescuento.INDPORCVARI == '1')
                            {
                                if(porcDescuentoAux > porcDescVariAlca)
                                {
                                    porcDescVariAlca = porcDescuentoAux;
                                    grupoDescuentoVari = codGrupoDescuento;
                                    rangoDescuentoVari = codRangoDescuento;
                                }
                            }
                            else
                            {
                                if(porcDescuentoAux > porcDescFijoAlca)
                                {
                                    porcDescFijoAlca = porcDescuentoAux;
                                }
                            }
                        }
                        else
                        {
                            //Buscar si tiene definido por Producto para la Posicion
                            objDescuento = await obtenerPorcentajeDescuento('0', objProductosComisionables.OIDPRODUCTO, '', montoBaseDcto, objPedidoConsolidado.codigoPeriodo, objPedidoConsolidado.codigoPais);

                             //Buscar si tiene definido por Tipo/SubTipo
                            if(objDescuento.codGrupoDescuento === null){
                                objDescuento = await obtenerPorcentajeDescuento('1', objSubTipoCliente.OIDTIPOCLIENTE, objSubTipoCliente.OIDSUBTIPOCLIENTE, montoBaseDcto, objPedidoConsolidado.codigoPeriodo, objPedidoConsolidado.codigoPais);
                            }

                            //Buscar si tiene definido por Tipo Oferta
                            if(objDescuento.codGrupoDescuento === null){
                                objDescuento = await obtenerPorcentajeDescuento('2', objProductosComisionables.OIDTIPOOFERTA, '', montoBaseDcto,  objPedidoConsolidado.codigoPeriodo, objPedidoConsolidado.codigoPais);
                            }

                            //Buscar si tiene definido por Negocio/Unidad Negocio
                            if(objDescuento.codGrupoDescuento === null){
                                objDescuento = await obtenerPorcentajeDescuento('3', objProductosComisionables.OIDNEGOCIO, objProductosComisionables.OIDUNIDADNEGOCIO, montoBaseDcto, objPedidoConsolidado.codigoPeriodo, objPedidoConsolidado.codigoPais);
                            }

                            //Buscamos si tiene definido por Por Defecto
                            if(objDescuento.codGrupoDescuento === null){
                                objDescuento = await obtenerPorcentajeDescuento('4', '', '', montoBaseDcto, objPedidoConsolidado.codigoPeriodo, objPedidoConsolidado.codigoPais);
                            }
                        }

                        if(objDescuento.porcDescuento != null)
                        {
                            porcDescuento = parseFloat(objDescuento.porcDescuento);

                            if(objPedidoConsolidadoPosicion.porcentajeDescuento != null && parseFloat(objPedidoConsolidadoPosicion.porcentajeDescuento) > 0)
                            {
                                porcDescuentoAux = parseFloat(objPedidoConsolidadoPosicion.porcentajeDescuento);
                            }
                            else
                            {
                                porcDescuentoAux = recuperarDescuentoAdicional(objDescuento.codGrupoDescuento, objPedidoConsolidado.oidCliente, objPedidoConsolidado.oidSolicitud, porcDescuento, descuentoAdicional);
                            }

                            objPedidoConsolidadoPosicion.porcentajeDescuento = String(porcDescuentoAux);
                            objPedidoConsolidadoPosicion.grupoDescuento = String(objDescuento.codGrupoDescuento);
                            objPedidoConsolidadoPosicion.escalaDescuento = String(objDescuento.codigoRangoDcto);

                            let descuento = parseFloat(objProductosComisionables.PRECIOUNITARIO) * (porcDescuentoAux/100);

                            objPedidoConsolidadoPosicion.importeDescuento1 = String(descuento.toFixed(2));
                            objPedidoConsolidadoPosicion.importeDescuento2 = String(descuento.toFixed(2));
                            
                            let objTipoGrupoDescuento = await dbContext.getTipoGrupoDescuento(objPedidoConsolidado.codigoPais, objPedidoConsolidadoPosicion.grupoDescuento);
                            
                            if(objTipoGrupoDescuento.INDPORCVARI == '1')
                            {
                                if(porcDescuentoAux > porcDescVariAlca)
                                {
                                    porcDescVariAlca = porcDescuentoAux;
                                    grupoDescuentoVari = parseInt(objDescuento.codGrupoDescuento);
                                    rangoDescuentoVari = parseInt(objDescuento.codigoRangoDcto);
                                }
                            }
                            else
                            {
                                if(porcDescuentoAux > porcDescFijoAlca)
                                {
                                    porcDescFijoAlca = porcDescuentoAux;
                                }
                            }
                        }
                    }
                }            
            };

            if(objPedidoConsolidado.tipoSolicitud === 'SOC')
            {
                let valRangInicVari = 0;
                let valRangFincVari = 0;
                
                if(grupoDescuentoVari != null)
                {
                    let objMontoVariableInicio = await dbContext.getMontoVariableInicio(objPedidoConsolidado.codigoPais, grupoDescuentoVari, rangoDescuentoVari);
                    
                    if(objMontoVariableInicio != null)
                    {
                        valRangInicVari = objMontoVariableInicio.MONTO;
                    }
                    
                    let objMontoVariableFinal = await dbContext.getMontoVariableFinal(objPedidoConsolidado.codigoPais, grupoDescuentoVari, rangoDescuentoVari);
                    
                    if(objMontoVariableFinal != null)
                    {
                        valRangFincVari = objMontoVariableFinal.MONTO;
                    }
                }

                //objPedidoConsolidado.montoBaseDcto = String(montoBaseDcto);
                //objPedidoConsolidado.montoBaseDctoAcum = String(montoBaseDctoHist);
                objPedidoConsolidado.montoBaseDcto = String(montoPedidoActual);
                objPedidoConsolidado.montoBaseDctoAcum = String(montoBaseDcto);
                objPedidoConsolidado.montoVentaRetail = String(montoVentaRetailHist);
                objPedidoConsolidado.porcDescVariAlca = String(porcDescVariAlca);
                objPedidoConsolidado.porcDescFijoAlca = String(porcDescFijoAlca);
                objPedidoConsolidado.valRangInicVari = String(valRangInicVari);
                objPedidoConsolidado.valRangFinaVari = String(valRangFincVari);
                objPedidoConsolidado.montoTiendaVirtual = String(montoTiendaVirtualHist);
            }
        }
    }

    logger.stop('Completed Descuentos', performance);        
    
    return objPedidoConsolidado;
}

async function devuelveZonaRetail(codigoPais, oidZona){
    let objZonaRetail = await dbContext.getZonaRetail(codigoPais, oidZona);

    if(objZonaRetail.INDPILOTO == '1'){
        return '1';
    }
    else{
        return '0';
    }
}

async function calcularDescuentoAdicional(codGrupoDescuento, oidCliente, oidSolicitud, montoBaseCalculo, codigoPeriodo, codigoPais, mapDescuentosAdicionales)
{
    let idSolicitudAux = 'XXXXX';
    let arrayDescuentoAdicional = new Array(); 
    let item = 0;

    if (!(oidSolicitud)) { idSolicitudAux = oidSolicitud; }


        let validaDetalle = false;
        let lstCabeceraAdicional = await dbContext.getCabeceraAdicional(codigoPais, codigoPeriodo, codGrupoDescuento)

        if(lstCabeceraAdicional != null)
        {
            //lstCabeceraAdicional.forEach(objCabeceraAdicional => {
            for (let objCabeceraAdicional of lstCabeceraAdicional)
            {
                let codDescuestoAdic = objCabeceraAdicional.CODDESCUESTOADIC;
                let porcDescuentoAdic = objCabeceraAdicional.PORCDESCUENTOADIC;
                let tipoDescuentoAdic = objCabeceraAdicional.TIPODESCUENTOADIC;

                validaDetalle = false;

                let lstDetalleAdicional = await dbContext.getDetalleAdicional(codigoPais, codDescuestoAdic);

                if(lstDetalleAdicional != null)
                {
                    //lstDetalleAdicional.forEach(objDetalleAdicional => {
                    for(let objDetalleAdicional of lstDetalleAdicional)
                    {
                        let codTipoCliente = objDetalleAdicional.CODTIPOCLIENTE;
                        let codSubTipoCliente = objDetalleAdicional.CODSUBTIPOCLIENTE;
                        let codTipoClasificacion = objDetalleAdicional.CODTIPOCLASIFICACION;
                        let codClasificacion = objDetalleAdicional.CODCLASIFICACION;
                        let codigoRegion = objDetalleAdicional.CODIGOREGION;
                        let codigoZona = objDetalleAdicional.CODIGOZONA;
                        let montoLimite = null;

                        //if(objCabeceraAdicional.MONTOLIMITE != null){ // NO EXISTE EN QUERY
                        if(objDetalleAdicional.MONTOLIMITE != null){ // NO EXISTE EN QUERY
                            montoLimite = parseFloat(objDetalleAdicional.MONTOLIMITE);
                        }

                        if(!validaDetalle)
                        {
                            let objValidarTipoClienteAdicional = await dbContext.getValidarTipoClienteAdicional(codigoPais, codTipoClasificacion, codClasificacion, codTipoCliente, codSubTipoCliente, oidCliente);

                            if(objValidarTipoClienteAdicional.OCURRENCIAS > 0)
                            {
                                let objValidarUAClienteAdicional;

                                if(codigoRegion != '' || codigoZona != '')
                                {
                                    objValidarUAClienteAdicional = await dbContext.getValidarUAClienteAdicional(codigoPais, codigoRegion, codigoZona, oidCliente);                                    
                                }

                                if(objValidarUAClienteAdicional.OCURRENCIAS > 0)
                                {
                                    if(montoLimite != null && montoLimite > 0)
                                    {
                                        validaDetalle = true;
                                    }
                                }
                                else
                                {
                                    validaDetalle = true;
                                }
                            }
                        }
                    }
                

                    if(validaDetalle)
                    {
                        let llave = oidCliente + '__' + idSolicitudAux + '__' + codGrupoDescuento;
                        let valor = codDescuestoAdic + '__' + porcDescuentoAdic + '__' + tipoDescuentoAdic;

                        if(mapDescuentosAdicionales.has(llave))
                        {
                            let lstValores = mapDescuentosAdicionales.get(llave);

                            lstValores.push(valor);
                            mapDescuentosAdicionales.set(llave, lstValores);
                        }
                        else
                        {
                            let arrayValores = new Array();

                            arrayValores.push(valor);
                            mapDescuentosAdicionales.set(llave, arrayValores);
                        }
                    }
                }
            }
        }
    
    return mapDescuentosAdicionales;
}

async function obtenerPorcentajeDescuento(categoriaDescuento, subCategoria1, subCategoria2, montoPedido, codigoPeriodo, codigoPais) {
    let objPorcentajeDescuento = 
            {
                codGrupoDescuento : null,
                codigoRangoDcto : null,
                porcDescuento : null
            }
    
    let lstMatrizDescuentos = await dbContext.getMatrizDescuentos(codigoPais, codigoPeriodo, categoriaDescuento);
    
    if(lstMatrizDescuentos != null)
    {
        //lstMatrizDescuentos.forEach(objMatrizDescuentos => {
        for(let objMatrizDescuentos of lstMatrizDescuentos)
        {
            //Por Producto
            if(categoriaDescuento == 0 && objPorcentajeDescuento.codGrupoDescuento == null)
            {
                if(subCategoria1 == objMatrizDescuentos.SUBCATEGORIA1)
                {
                    objPorcentajeDescuento.codGrupoDescuento = objMatrizDescuentos.CODGRUPODESCUENTO;
                }
            }

            //Por SubTipo Cliente
            if(categoriaDescuento == 1 && objPorcentajeDescuento.codGrupoDescuento == null)
            {
                if(parseInt(objMatrizDescuentos.SUBCATEGORIA2) > 0)
                {
                    if(subCategoria2 == objMatrizDescuentos.SUBCATEGORIA2)
                    {
                        objPorcentajeDescuento.codGrupoDescuento = objMatrizDescuentos.CODGRUPODESCUENTO;
                    }
                }
                else
                {
                    if(subCategoria1 == objMatrizDescuentos.SUBCATEGORIA1)
                    {
                        objPorcentajeDescuento.codGrupoDescuento = objMatrizDescuentos.CODGRUPODESCUENTO;
                    }
                }
            }

            //Por Tipo de Oferta
            if(categoriaDescuento == 2 && objPorcentajeDescuento.codGrupoDescuento == null)
            {
                if(subCategoria1 == objMatrizDescuentos.SUBCATEGORIA1)
                {
                    objPorcentajeDescuento.codGrupoDescuento = objMatrizDescuentos.CODGRUPODESCUENTO;
                }
            }

            //Por Negocio/Unidad de Negocio
            if(categoriaDescuento == 3 && objPorcentajeDescuento.codGrupoDescuento == null) 
            {
                if(parseInt(objMatrizDescuentos.SUBCATEGORIA1) > 0 && parseInt(objMatrizDescuentos.SUBCATEGORIA2) > 0) 
                { //Tiene Ambos
                  if(subCategoria1 == objMatrizDescuentos.SUBCATEGORIA1 && subCategoria2 == objMatrizDescuentos.SUBCATEGORIA2) 
                  {
                    objPorcentajeDescuento.codGrupoDescuento = objMatrizDescuentos.CODGRUPODESCUENTO;
                  }
                } 
                else 
                {
                  if(subCategoria1 == objMatrizDescuentos.SUBCATEGORIA1) 
                  {
                    objPorcentajeDescuento.codGrupoDescuento = objMatrizDescuentos.CODGRUPODESCUENTO;
                  }
      
                  if(subCategoria2 == objMatrizDescuentos.SUBCATEGORIA2) 
                  {
                    objPorcentajeDescuento.codGrupoDescuento = objMatrizDescuentos.CODGRUPODESCUENTO;
                  }
      
                }
              }

            //Por Negocio / Unidad de Negocio
            if(categoriaDescuento == 4 && objPorcentajeDescuento.codGrupoDescuento == null) 
            {
                objPorcentajeDescuento.codGrupoDescuento = objMatrizDescuentos.CODGRUPODESCUENTO;
            }
          
            if(objPorcentajeDescuento.codGrupoDescuento != null)
                break;

        }
    }

    if(objPorcentajeDescuento.codGrupoDescuento != null)
    {

        if(montoPedido != null)
        {
            let objRangoDescuentoMonto = await dbContext.getRangoDescuentoMonto(codigoPais, objPorcentajeDescuento.codGrupoDescuento, montoPedido);

            objPorcentajeDescuento.codigoRangoDcto = objRangoDescuentoMonto.CODIGORANGODCTO;
            objPorcentajeDescuento.porcDescuento = objRangoDescuentoMonto.PORCDESCUENTO;

        }
        else
        {
            let objRangoDescuento = await dbContext.getRangoDescuento(codigoPais, objPorcentajeDescuento.codGrupoDescuento);

            objPorcentajeDescuento.codigoRangoDcto = objRangoDescuento.CODIGORANGODCTO;
            objPorcentajeDescuento.porcDescuento = objRangoDescuento.PORCDESCUENTO;
        }        
    }      

    return objPorcentajeDescuento;
}

function recuperarDescuentoAdicional(codGrupoDescuento, oidCliente, oidSolicitud, porcentaje, mapDescuentosAdicionales)
{
    let porcentajeAux = porcentaje;
    let oidSolicitudAux = "XXXXX";
    
    if(oidSolicitud != '')
    {
        oidSolicitudAux = oidSolicitud;
    }

    let llave = oidCliente + "__" + oidSolicitudAux + "__" + codGrupoDescuento;
    
    if(mapDescuentosAdicionales.has(llave))
    {
        let lstValores = mapDescuentosAdicionales.get(llave);

        lstValores.forEach(objValores => {            
            let st = objValores.split('__');

            let porcDescuentoAdic = st[1];
            let tipoDescuentoAdic = st[2];

            if(tipoDescuentoAdic == 0)
            {
                porcentajeAux += parseFloat(porcDescuentoAdic);
            }
            else
            {
                porcentajeAux = parseFloat(porcDescuentoAdic);
            }
        });
    }

    return porcentajeAux;
}

async function execute(request, response) {
    try
    {
        response.json(await validate(request.body)); 
    }
    catch(exception)
    {
        response.status(500).send(exception);
    }
};

module.exports = { validate: validate, execute: execute }