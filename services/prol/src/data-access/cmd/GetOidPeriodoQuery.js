'use strict'
module.exports.statement =  function(codigoPais, codigoPeriodo)
{
    return    'SELECT a.oid_peri oidPeriodo ' +
              'FROM sicc_corp.cra_perio a, ' +
                   'sicc_corp.seg_perio_corpo b ' +
              'WHERE a.peri_oid_peri = b.oid_peri ' + 
                    `AND b.cod_peri = '${codigoPeriodo}' ` +
                    `AND a.ISOPAIS = '${codigoPais}' ` +
                    `AND b.ISOPAIS = '${codigoPais}'`;
}