'use strict'

const logger = require('./../utility/Logger');

const constantes = require('../utility/constantes');
const dbContext = require('../data-access/dbContextValidaciones');

async function validate(objPedidoConsolidado) 
{
    let performance = logger.start("Starting Homologación Cupones");

    let lstCuponesNuevas = await dbContext.getCuponesNuevas(objPedidoConsolidado.codigoPais, objPedidoConsolidado.codigoPeriodo);
    let objPedidoConsolidadoPosicion;
    let encontrado = false;

    for(let p=0; p < objPedidoConsolidado.posiciones.length; p++) {
        objPedidoConsolidadoPosicion = objPedidoConsolidado.posiciones[p];

        if(objPedidoConsolidadoPosicion.cuv >= constantes.Cuv.VALOR_MENOR && objPedidoConsolidadoPosicion.cuv <= constantes.Cuv.VALOR_MAYOR){
            encontrado = false;
            
            if(lstCuponesNuevas != null) {
                for(let i=0; i< lstCuponesNuevas.length; i++)
                {
                    let objCuponesNuevas = lstCuponesNuevas[i];

                    if(objCuponesNuevas.CODIGOCUPON === objPedidoConsolidadoPosicion.cuv){
                        objPedidoConsolidadoPosicion.observaciones = 'Cupón ' + objPedidoConsolidadoPosicion.cuv + ' de Programa de Nuevas.';
                        objPedidoConsolidadoPosicion.cuv = objCuponesNuevas.CODIGOVENTA;
                        
                        let unidades = '' + objCuponesNuevas.UNIDADESMAXIMA;
                        let posicionDecimales = unidades.indexOf('.');

                        if(posicionDecimales > 0) {
                            unidades = unidades.substring(0, posicionDecimales);
                        }

                        objPedidoConsolidadoPosicion.unidadesDemandadas = unidades;
                        encontrado = true;
                        break;
                    }
                }
            }

            if(!encontrado) {
                objPedidoConsolidadoPosicion.observaciones = "Cupón no existe configurado para la campaña.";
                objPedidoConsolidadoPosicion.unidadesDemandadas = "0";
            }

            objPedidoConsolidado.posiciones[p] = objPedidoConsolidadoPosicion;
            objPedidoConsolidadoPosicion = null;
        }
    }

    logger.stop('Completed Homologación Cupones', performance);    

    return objPedidoConsolidado;
}

async function execute(request, response) 
{
    try
    {
        response.json(await validate(request.body));
    }
    catch(exception)
    {
        response.send(exception);
    }
};

module.exports = { validate: validate, execute: execute }