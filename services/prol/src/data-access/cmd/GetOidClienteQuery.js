'use strict'
module.exports.statement = function(codigoPais, codigoCliente)
{
    return    'SELECT a.OID_CLIE OIDCLIENTE ' +
              'FROM sicc_corp.mae_clien a ' +
              `WHERE a.cod_clie = '${codigoCliente}' ` +
                `AND a.ISOPAIS = '${codigoPais}'`;
};