'use strict'
module.exports.statement = function(codigoPais, oidNiveOferta)
{
    return  'SELECT a.VAL_FACT_REPE factorRepeticion, ' +
                'a.VAL_PREC_UNIT precioUnitario, ' +
                'a.OID_NX_OFER_RANG oidRango ' +
            'FROM sicc_corp.pre_nx_ofert_rango a ' +
            `WHERE a.niof_oid_nx_ofer = ${oidNiveOferta} ` +
            `and a.ISOPAIS = '${codigoPais}' ` +
            'ORDER BY val_fact_repe DESC  ';
}