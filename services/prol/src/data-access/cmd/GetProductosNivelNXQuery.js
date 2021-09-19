'use strict'
module.exports.statement = function(codigoPais, oidNiveOferta)
{
    return  'SELECT d.OID_DETA_OFER oidDetaOferta ' +
            'FROM sicc_corp.pre_nx_ofert_produ d ' +
            `WHERE d.niof_oid_nx_ofer = ${oidNiveOferta} ` +
            `and d.ISOPAIS = '${codigoPais}'`;
}