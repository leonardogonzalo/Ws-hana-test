'use strict'

const logger = require('./../utility/Logger');
//const dbContext = require('../data-access/dbContextValidaciones');

async function validate(objPedidoConsolidado) 
{
    let performance = logger.start("Starting Reserva Stock");  
    /*
    objPedidoConsolidado.posiciones.forEach(objPedidoConsolidadoPosicion => {
        objPedidoConsolidadoPosicion.unidadesPorAtender = "0";
    });
    */
    logger.stop('Completed Reserva Stock', performance);    

    return objPedidoConsolidado;
}

async function execute(request, response) {
    try{
        response.json(await validate(request.body));
    }
    catch(exception){
        response.send(exception);
    }
}

module.exports = { validate: validate, execute: execute }