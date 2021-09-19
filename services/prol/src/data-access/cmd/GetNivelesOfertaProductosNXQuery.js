'use strict'
module.exports.statement = function(codigoPais, oidPeriodo)
{
    return  'SELECT d.OID_NX_OFER oidNiveOferta, ' +
                'd.TIP_CUAD tipoCuadre, ' +    
                'd.TIP_NIVE tipoNivel, ' +
                'e.OID_DETA_OFER oidDetaOferta ' +
            'FROM sicc_corp.pre_nx_ofert d ' +
            'INNER JOIN sicc_corp.pre_nx_ofert_produ e ON e.niof_oid_nx_ofer = d.OID_NX_OFER AND e.ISOPAIS = d.ISOPAIS ' +
            `WHERE d.perd_oid_peri = ${oidPeriodo} ` +
            `and d.ISOPAIS = '${codigoPais}'`;
}