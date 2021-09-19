'use strict'

const util = require('util');
const logger = require('./../utility/Logger');

async function validate(pedido)
{
    let performance = logger.start("Starting Oportunidad de Ahorro");  

    let montoTotalDcto = 0;
    let montoTotalOpAhorro = 0;
    let montoOpAhorro = 0;
    let descuento = 0;   
     
    for(let posicion of pedido.posiciones)
    {
        if (String(posicion.numeroSeccionDetalle) == "0")
        {
            if (!posicion.porcentajeDescuento) posicion.porcentajeDescuento = "0";
            descuento = (Number.parseFloat(posicion.porcentajeDescuento) * Number.parseFloat(posicion.precioCatalogo) / 100);
            montoOpAhorro = descuento * Number.parseInt(posicion.unidadesPorAtender);
        }
        else if (String(posicion.numeroSeccionDetalle) == "1" || String(posicion.numeroSeccionDetalle) == "4")
        {
            montoOpAhorro = 0;
        }
        else if (String(posicion.numeroSeccionDetalle) == "2" || String(posicion.numeroSeccionDetalle) == "3")
        {
            montoOpAhorro = (Number.parseFloat(posicion.precioPublico) * Number.parseInt(posicion.unidadesPorAtender)) - ( Number.parseFloat(posicion.precioCatalogo) * Number.parseInt(posicion.unidadesPorAtender));
        }
        if (montoOpAhorro < 0) montoOpAhorro = 0;
        posicion.montoOpAhorro = String(montoOpAhorro);
        if (!posicion.importeDescuento1) posicion.importeDescuento1 = "0";
        montoTotalDcto = montoTotalDcto + Number.parseFloat(posicion.importeDescuento1);
        montoTotalOpAhorro = montoTotalOpAhorro + Number.parseFloat(posicion.montoOpAhorro);
    }
    pedido.montoTotalDcto = String(montoTotalDcto.toFixed(4));
    pedido.montoTotalOpAhorro = String(montoTotalOpAhorro);
    
    logger.stop('Completed Oportunidad de Ahorro', performance);        

    return pedido;
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