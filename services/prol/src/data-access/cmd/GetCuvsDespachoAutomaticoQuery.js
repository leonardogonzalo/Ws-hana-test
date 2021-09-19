'use strict'
module.exports.statement = function(codigoPais, oidPeriodo)
{
    return  'SELECT d.VAL_CODI_VENT cuv, ' +
                'h.OID_PROM oidPromocion, ' +
                'h.ICPR_OID_INDI_CUAD_PROM indicadorCuadre, ' +
                'h.VAL_FACT_CUAD factorCuadre ' +
            'FROM sicc_corp.pre_ofert c, ' +
                'sicc_corp.pre_ofert_detal d, ' +
                'sicc_corp.pre_matri_factu_cabec e, ' +
                'sicc_corp.cra_perio f, ' +
                'sicc_corp.pre_promo h ' +
            `WHERE f.oid_peri = ${oidPeriodo} ` + 
                'AND d.ofer_oid_ofer = c.oid_ofer ' +
                'AND c.mfca_oid_cabe = e.oid_cabe ' +
                'AND e.perd_oid_peri = f.oid_peri ' +
                'AND c.coes_oid_estr IN (2005, 2006) ' +
                'AND c.oid_ofer = h.ofer_oid_ofer ' +
                'AND c.ind_desp_auto = 1 ' +
                `AND c.ISOPAIS = '${codigoPais}' ` +
                `AND d.ISOPAIS = '${codigoPais}' ` +
                `AND e.ISOPAIS = '${codigoPais}' ` +
                `AND f.ISOPAIS = '${codigoPais}' ` +
                `AND h.ISOPAIS = '${codigoPais}' `;
}