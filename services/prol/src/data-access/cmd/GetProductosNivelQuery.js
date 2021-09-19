'use strict'
module.exports.statement = function(codigoPais, oidNivelOferta)
{
    return  'SELECT d.OID_DETA_OFER oidDetaOferta ' +
            'FROM sicc_corp.pre_nivel_ofert_produ d ' +
            `WHERE d.niof_oid_nive_ofer = ${oidNivelOferta} ` +
            `AND d.ISOPAIS = '${codigoPais}' `

}