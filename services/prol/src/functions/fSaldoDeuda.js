'use strict'

const logger = require('./../utility/Logger');
const dbContext = require('../data-access/dbContextValidaciones');
const funciones = require('../utility/funciones');

async function validate(objPedidoConsolidado)
{
    let performance = logger.start("Starting Saldo Deuda");  

    let indicadorErrorDeuda = '';
    let montoReclamoPendiente = '';
    let montoSaldoRechazo = '';
    let montoSaldoDeuda = '';
    let codigoPaisDefault = funciones.obtenerPaisDefault(objPedidoConsolidado.codigoPais);    
    let objDatosSaldoDeuda = await dbContext.getDatosSaldoDeuda(objPedidoConsolidado.codigoPais, codigoPaisDefault, objPedidoConsolidado.codigoPeriodo, objPedidoConsolidado.codigoCliente);
    let codigoZona = objDatosSaldoDeuda[0].CODIGOZONA;
    let saldoRechazo = objDatosSaldoDeuda[0].SALDORECHAZO;
    let fechaProceso = objDatosSaldoDeuda[0].FECHAPROCESO;
    let indNueva = objDatosSaldoDeuda[0].INDNUEVA;
    let fechaCronograma;

    if(objDatosSaldoDeuda[0].FECHACRONOGRAMA != null){
        fechaCronograma = objDatosSaldoDeuda[0].FECHACRONOGRAMA;
    }
    
    //Obtener el abono pendiente
    //criteria.put("codigoParametro", "STO_ABPEN_DEUDA");                   ?
    let stoAbonoPendiente; ////reporteDAO.getParametroOCR(criteria);        ?
    
    if(stoAbonoPendiente === 'S')
        montoReclamoPendiente = objDatosSaldoDeuda[0].ABONOPENDIENTE;
    else
        montoReclamoPendiente = '0';
    
    //Verificar si es multizona
    //criteria.put("codigoParametro", "STO_MULTI_ZONA_PILOT");              ?
    let indPilotoMulti = null; //reporteDAO.getParametroOCR(criteria);      ?
    
    if(indPilotoMulti === null)
        indPilotoMulti = 'N';

    //criteria.put("indPilotoMulti", indPilotoMulti);
    //criteria.put("codigoZona", codigoZona);

    let indMultiZona = '0'; //procesoPEDSaldoDeudaDAO.getIndMultiZona(criteria);

    //Obtenemos el saldo deudor
    if(parseInt(indMultiZona) > 0 && fechaProceso === fechaCronograma){
        let objSaldoCliente =  await dbContext.getSaldoCliente(objPedidoConsolidado.codigoPais, objPedidoConsolidado.codigoCliente);
        montoSaldoDeuda = objSaldoCliente[0].SALDO;
    }
    else{
        let objSaldoClientePeriodo = await dbContext.getSaldoClientePeriodo(objPedidoConsolidado.codigoPais, objPedidoConsolidado.codigoCliente, objPedidoConsolidado.codigoPeriodo);
        montoSaldoDeuda = objSaldoClientePeriodo[0].SALDO;
    }

    montoSaldoRechazo = saldoRechazo;

    //Obtener el indicador error de dauda
    let saldo = parseFloat(montoSaldoDeuda) - parseFloat(montoSaldoRechazo) - parseFloat(montoReclamoPendiente);
    
    indicadorErrorDeuda = '1';

    if(saldo > 0)
        indicadorErrorDeuda = '2';
    
    objPedidoConsolidado.indicadorErrorDeuda = indicadorErrorDeuda;
    objPedidoConsolidado.montoSaldoDeuda = montoSaldoDeuda;
    objPedidoConsolidado.montoReclamoPendiente = montoReclamoPendiente;
    objPedidoConsolidado.montoSaldoRechazo = montoSaldoRechazo;
    objPedidoConsolidado.indNueva = String(indNueva);

    logger.stop('Completed Saldo Deuda', performance);

    return objPedidoConsolidado;
}

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