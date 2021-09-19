'use strict'

const logger = require('./../utility/Logger');
const dbContext = require('../data-access/dbContextValidaciones');

async function validate(objPedidoConsolidado) 
{
    let performance = logger.start("Starting Monto Minimo");  

    let montoPedido = 0; 
    let montoNominal = 0;
    let nivel1 = 0;
    let nivel2 = 0;
    let estadoPedido = '';

    //Sumatoria de las unidades de cada producto multiplicado por el precio unitario. 
    for(let p=0; p< objPedidoConsolidado.posiciones.length; p++){
        let objPedidoConsolidadoPosicion = objPedidoConsolidado.posiciones[p];
        montoPedido = montoPedido + (parseFloat(objPedidoConsolidadoPosicion.unidadesPorAtender) * parseFloat(objPedidoConsolidadoPosicion.precioUnitario));
    }

    let lstMontoMinimoCliente = await dbContext.getMontoMinimoCliente(objPedidoConsolidado.codigoPais, objPedidoConsolidado.codigoCliente);
    
    if(lstMontoMinimoCliente != null && lstMontoMinimoCliente.length > 0){
        let objMontoMinimoCliente = lstMontoMinimoCliente[0];

        montoNominal = parseFloat(objMontoMinimoCliente.MONTOMINIMO)
        nivel1 = parseFloat(objMontoMinimoCliente.NIVEL1);
        nivel2 = parseFloat(objMontoMinimoCliente.NIVEL2);
    }

    if(montoPedido < montoNominal){
        estadoPedido = '1';
    }

    if((montoPedido >= montoNominal) && (nivel1 >= montoPedido)){
        estadoPedido =  '0';

        //Obtener el producto ganador
        let lstProductoGanador = await dbContext.getProductoGanador(objPedidoConsolidado.codigoPais, objPedidoConsolidado.codigoPeriodo, objPedidoConsolidado.codigoCliente);
        
        if(lstProductoGanador != null && lstProductoGanador.length > 0){
            let objProductoGanador = lstProductoGanador[0];

            objPedidoConsolidado.codigoVentaGanador = objProductoGanador.CODIGOVENTA;
            objPedidoConsolidado.oidOfertaGanador =  objProductoGanador.OIDDETALLEOFERTA;
            objPedidoConsolidado.oidProductoGanador = objProductoGanador.OIDPRODUCTO;
            objPedidoConsolidado.precioGanador = objProductoGanador.PRECIOUNITARIO;
            objPedidoConsolidado.formaPagoGanador = objProductoGanador.OIDFORMAPAGO;
        }
    }

    if(montoPedido > nivel1) {
        estadoPedido = '0';
    }
    
    objPedidoConsolidado.estadoPedidoMontoMinimo = String(estadoPedido);
    objPedidoConsolidado.montoPedidoMontoMinimo = String(montoPedido);

    logger.stop('Completed Monto Minimo', performance);            
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