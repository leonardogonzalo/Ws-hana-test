'use strict'
module.exports.statement = function(codigoPais, oidNivelOferta, sumaUnidades)
{
    return  'SELECT a.VAL_PREC_UNIT precio, ' +
            'a.OID_NIVE_OFER_RANG oidRango ' +
            'FROM sicc_corp.pre_nivel_ofert_rango a ' +
            `WHERE a.val_rang_infe <= ${sumaUnidades} ` +
            `AND a.val_rang_supe >= ${sumaUnidades} ` + 
            `AND a.niof_oid_nive_ofer = ${oidNivelOferta} ` +
            `AND a.ISOPAIS = '${codigoPais}'`;
}