
'use strict'
module.exports.statement = function(codigoPais, 
        codigoPeriodo, codigoPeriodoAnterior, 
        oidCliente)
{
    return 'SELECT COUNT(1) as result ' +
            'FROM sicc_Corp.MAE_CLIEN_ESTAT cli ' +
            `WHERE cli.isopais = '${codigoPais}' ` +
            `AND cli.oid_clie = ${oidCliente} ` +
            `AND (cli.CAMP_ULTI_PEDI = ${codigoPeriodoAnterior} ` +
            `OR cli.CAMP_ULTI_PEDI = ${codigoPeriodo} ` +
            `AND cli.VTA_CATA_CX1 > 0)`;
}