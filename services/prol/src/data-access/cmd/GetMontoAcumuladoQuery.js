'use strict'
module.exports.statement = function(codigoPais, oidPeriodo, oidCliente)
{
    let query =  'SELECT VAL_MONT_TOTA montoTotal ' +
            'FROM SICC_CORP.PED_SOLIC_CABEC_ACUM2 ' +
            `WHERE PERD_OID_PERI = ${oidPeriodo} ` +
                `AND CLIE_OID_CLIE = ${oidCliente} ` +
                `AND ISOPAIS = '${codigoPais}' `;
    return query;
}