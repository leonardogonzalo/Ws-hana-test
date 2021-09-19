'use strict'

const logger = require('./../utility/Logger');
const dbContext = require('../data-access/dbContextValidaciones');

async function validate(objPedidoConsolidado) 
{
    let performance = logger.start("Starting Monto Maximo");  

    let montoMaximo = 0;
    let montoPedido = 0;
    let estadoPedido = '';

    ///Sumatoria de las unidades de cada producto multiplicado por el precio unitario.
    for(let p=0; p<objPedidoConsolidado.posiciones; p++){
        let objPedidoConsolidadoPosicion = objPedidoConsolidado.posiciones[p];
        montoPedido = montoPedido + (parseFloat(objPedidoConsolidadoPosicion.unidadesPorAtender)  * parseFloat(objPedidoConsolidadoPosicion.precioUnitario));
    }

    let lstMontoMaximoCliente = await dbContext.getMontoMaximoCliente(objPedidoConsolidado.codigoPais, objPedidoConsolidado.codigoCliente);

    if(lstMontoMaximoCliente!=null && lstMontoMaximoCliente.length>0){
        let objMontoMaximoCliente = lstMontoMaximoCliente[0];

        montoMaximo = parseFloat(objMontoMaximoCliente.MONTOMAXIMO);
    }
    else{
        montoMaximo = 99999999;
    }

    if(montoPedido > montoMaximo){
        estadoPedido = '1';
    }
    else{
        estadoPedido = '0';
    }

    objPedidoConsolidado.estadoPedidoMontoMaximo = String(estadoPedido);
    objPedidoConsolidado.montoPedidoMontoMaximo = String(montoPedido);
    objPedidoConsolidado.montoMaximo = String(montoMaximo);

    logger.stop('Completed Monto Maximo', performance);        

    return objPedidoConsolidado;
};

async function execute(request, response) {
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