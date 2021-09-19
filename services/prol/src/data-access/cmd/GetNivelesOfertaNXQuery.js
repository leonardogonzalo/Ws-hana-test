'use strict'
module.exports.statement = function(codigoPais, oidPeriodo)
{
    return  'SELECT d.OID_NX_OFER oidNiveOferta, ' +
                'd.TIP_CUAD tipoCuadre, ' +
                'd.TIP_NIVE tipoNivel ' +
            'FROM sicc_corp.pre_nx_ofert d ' +
            `WHERE d.perd_oid_peri = ${oidPeriodo} ` +
            `and d.ISOPAIS = '${codigoPais}'`;
}