'use strict'
module.exports.statement = function(codigoPais, oidPeriodo)
{
    return 'SELECT d.OID_NIVE_OFER oidNiveOferta, ' +
            'd.TIP_CUAD tipoCuadre, ' + 
            'd.TIP_NIVE tipoNivel, ' +
            'e.OID_DETA_OFER oidDetaOferta ' +
            'FROM sicc_corp.pre_nivel_ofert d ' +
            'inner join sicc_corp.pre_nivel_ofert_produ e on e.niof_oid_nive_ofer = d.OID_NIVE_OFER and e.ISOPAIS = d.ISOPAIS ' +
            `WHERE d.perd_oid_peri = ${oidPeriodo} ` +
            `and d.ISOPAIS = '${codigoPais}'`;
}