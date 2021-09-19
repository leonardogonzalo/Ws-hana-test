'use strict'

module.exports.statement = function(codigoPais, oidCliente){
    return 'SELECT TICL_OID_TIPO_CLIE OIDTIPOCLIENTE, ' + 
                  'SBTI_OID_SUBT_CLIE OIDSUBTIPOCLIENTE ' +
           'FROM sicc_corp.MAE_CLIEN_TIPO_SUBTI ' +
           `WHERE CLIE_OID_CLIE = '${oidCliente}' ` +
                'AND TICL_OID_TIPO_CLIE = 2	' + 
                `AND ISOPAIS = '${codigoPais}' `;
}