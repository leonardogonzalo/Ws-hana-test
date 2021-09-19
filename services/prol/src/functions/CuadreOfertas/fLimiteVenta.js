'use strict'

const logger = require('./../../utility/Logger');

const dbContext = require('../../data-access/dbContextValidaciones');
const funciones = require('../../utility/funciones');

module.exports.validarLimiteVenta = function(objPedidoConsolidado, objPosicion, lstLimiteVentas)
{
    //let performance = logger.start("Starting Limite de Venta");

    if(objPosicion.IndLimiteVenta === '' && objPedidoConsolidado.indValiProl === '0' ||  objPedidoConsolidado.indValiProl ===  '' || objPosicion.oidTipoPosicion === 4)
    {
        if(lstLimiteVentas != null){
            lstLimiteVentas.forEach(objLimiteVentas => {
                if(posicion.oidDetaOferta === objLimiteVentas.OIDDETAOFERTA) {
                    return objLimiteVentas.LIMITEVENTA;
                }
            });
        }
    }

    //logger.stop('Completed Limite de Venta', performance);    
}
