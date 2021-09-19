'use strict'

const logger = require('./../utility/Logger');
const dbContext = require('../data-access/dbContextValidaciones');

module.exports.executeExigenciaVentas = async function(objPedidoConsolidado)
{    
    let performance = logger.start("Starting Exigencia Ventas");  

    let montoPedido = 0;
    let ventaExigida = 0;
    
    objPedidoConsolidado.posiciones.forEach(objPedidoConsolidadoPosicion => {
        montoPedido = montoPedido + (parseFloat(objPedidoConsolidadoPosicion.unidadesPorAtender) * parseFloat(objPedidoConsolidadoPosicion.precioUnitario));
    });
    
    let lstVentaExigida = await dbContext.getVentaExigida(objPedidoConsolidado.codigoPais, objPedidoConsolidado.codigoPeriodo);

    objPedidoConsolidado.posiciones.forEach(objPedidoConsolidadoPosicion => {
        if(objPedidoConsolidadoPosicion.observaciones != null &&  objPedidoConsolidadoPosicion.observaciones.indexOf("Programa de Nuevas")>=0){
            if(lstVentaExigida != null){
                for(let objVentaExigida of lstVentaExigida){
                    if(objVentaExigida.CODIGOVENTA === objPedidoConsolidadoPosicion.cuv){
                        ventaExigida = parseFloat(objVentaExigida.VENTAEXIGIDA);

                        if(ventaExigida > montoPedido){
                            objPedidoConsolidadoPosicion.unidadesPorAtender = '0';
                            objPedidoConsolidadoPosicion.observaciones = 'Cupón no cumple exigencia de ventas del Programa de Nuevas';
                        }

                        break;
                    }
                }
            }
        }
    })

    logger.stop('Completed Exigencia Ventas', performance);        

    return objPedidoConsolidado;
}

