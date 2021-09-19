'use strict'

const Logger = require('./../utility/Logger');

const SaldoDeuda = require('./fSaldoDeuda');
const HomologacionCupones = require('./fHomologacionCupones');
const CuadreOfertas = require('./CuadreOfertas/fCuadreOfertas');
const ExigenciaVentas = require('./fExigenciaVentas');
const MontoMinimo = require('./fMontoMinimo');
const MontoMaximo = require('./fMontoMaximo');
const Incentivos = require('./fIncentivos');
const ReservaStock = require('./fReservaStock');
const Descuentos = require('./fCalcularDescuentos');
const OportunidadAhorro = require('./fOportunidadAhorro');

const DTO = require('../persistence/pedidoConsolidado');

async function validate(pedido)
{
    await Promise.all([
                            HomologacionCupones.validate(pedido),
                            SaldoDeuda.validate(pedido)
                     ])
                     .then(
                        (
                            resultHomologacionCupones,
                            resultSaldoDeuda
                        ) => {}
                     );
    
    //RESERVA SAP 
    pedido = await ReservaStock.validate(pedido);

    //CUADRE DE OFERTAS
    pedido = await CuadreOfertas.validate(pedido);

    await Promise.all([
                        MontoMinimo.validate(pedido),
                        MontoMaximo.validate(pedido),
                        Descuentos.validate(pedido),
                        Incentivos.validate(pedido),
                        ExigenciaVentas.executeExigenciaVentas(pedido)                        
                     ])
                     .then( 
                         (
                            resultMontoMinimo, 
                            resultMontoMaximo, 
                            resultDescuentos, 
                            resultIncentivos,
                            resultExigenciaVentas                            
                         ) => 
                         {

                         }
                     );

    //RESERVA SAP
    pedido = await ReservaStock.validate(pedido);                     

    //OPORTUNIDAD DE AHORRO
    pedido = await OportunidadAhorro.validate(pedido);
    
    return pedido;
}

async function execute(request, response) 
{
    Logger.create(request, async()=>
        {            
            let input = request.body;    
            try
            {
                let performanceMonitor = require('execution-time')();
                performanceMonitor.start(); 

                let pedido = new DTO.PedidoConsolidado();
                pedido.codigoPais = input.codigoPais;
                pedido.codigoCliente = input.codigoCliente;
                pedido.codigoPeriodo = input.codigoPeriodo;
                pedido.indValiProl = input.indValiProl;
                pedido.indEnvioSap = input.indEnvioSap;
            
                for(let inputPosicion of input.posiciones)
                {
                    let posicion = new DTO.PedidoConsolidadoPosicion();
                    posicion.cuv = inputPosicion.cuv;
                    posicion.unidadesDemandadas = inputPosicion.unidadesDemandadas;
                    pedido.posiciones.push(posicion);
                } 

                //response.json(await validate(pedido));        
                validate(pedido)
                        .then((result) => 
                        {
                            Logger.done(`Completed ${request.url}`, response, result);
                            console.log(`Done ${performanceMonitor.stop().words}`);
                            response.status(200).json(result);
                        }
                        )
                        .catch((exception) =>
                        {
                            Logger.failed(exception, response);
                            console.log(exception);
                            response.status(500).send(exception.message);
                        });
            }
            catch(exception)
            {
                console.log(exception);                
                Logger.failed(exception, response);
                response.status(500).send(exception.message); 
            }
    })
};
  
module.exports = { validate: validate, execute: execute }