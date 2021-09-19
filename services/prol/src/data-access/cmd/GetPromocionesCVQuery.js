'use strict'
module.exports.statement = function(codigoPais, oidOferta)
{
    return  'SELECT c.GOFE_OID_GRUP_OFER oidGrupoOferta, ' +
                'e.OID_PROM oidPromocion, ' +
                'e.ICPR_OID_INDI_CUAD_PROM indicadorCuadre, ' + 
                'e.VAL_FACT_CUAD factorCuadre ' +
            'FROM sicc_corp.pre_ofert_detal c, ' +
                'sicc_corp.pre_ofert       d, ' +
                'sicc_corp.pre_promo       e ' +
            'WHERE c.ofer_oid_ofer = d.oid_ofer ' +
                'AND c.ofer_oid_ofer = e.ofer_oid_ofer ' +
                `AND d.oid_ofer = ${oidOferta} ` +
                'AND d.coes_oid_estr IN (2007) ' +
                `AND c.ISOPAIS = '${codigoPais}' ` +
                `AND d.ISOPAIS = '${codigoPais}' ` +
                `AND e.ISOPAIS = '${codigoPais}' ` +
            'GROUP BY c.gofe_oid_grup_ofer, ' +
                'e.oid_prom, ' +
                'e.icpr_oid_indi_cuad_prom, ' +
                'e.val_fact_cuad ';
}