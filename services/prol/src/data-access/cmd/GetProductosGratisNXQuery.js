'use strict'
module.exports.statement = function(codigoPais, oidRango)
{
    return 'select d.OID_OFER oidOferta, ' +
                'e.OID_DETA_OFER oidDetaOferta, '  +
                'd.COES_OID_ESTR oidEstrategia, ' +
                'd.FOPA_OID_FORM_PAGO oidFormaPago, ' +
                'e.NUM_PAGI_CATA pagina, ' + 
                'd.OCAT_OID_CATA oidCatalogo, ' +
                'e.PRECIO_UNITARIO precioUnitario, ' +
                'e.IMP_PREC_CATA precioCatalogo, ' +
                'e.IMP_PREC_POSI precioContable, ' +
                'e.VAL_FACT_REPE factorRepeticion, ' +
                'e.GOFE_OID_GRUP_OFER oidGrupoOferta, ' +
                'G.CUES_OID_IND_CUAD_TIPO_ESTR oidIndicadorCuadre, ' +
                'g.COD_FACT_CUAD factorCuadre, ' +
                'E.NUM_POSI_RANK ranking, ' +
                'e.VAL_CODI_VENT cuv, ' +
                'h.VAL_UNID unidades, ' +
                'h.NIOF_OID_NX_OFER_RANG oidRango, ' +
                'h.OID_NX_OFER_GRAT oidNiveOferta, ' +
                'e.PROD_OID_PROD oidProducto, ' +
                'mp.COD_SAP codSap, ' +
                'tf.NUM_SECC_DETA_FACT numeroSeccionDetalle, ' +
                'e.IMP_PREC_PUBL precioPublico, ' +
                '0 indicadorRecuperacion ' +
            'from sicc_corp.pre_matri_factu_cabec a, ' +
                'sicc_corp.cra_perio             b, ' +
                'sicc_corp.seg_perio_corpo       c, ' +
                'sicc_corp.pre_ofert             d, ' +
                'sicc_corp.mae_produ             mp, ' +
                'sicc_corp.pre_ofert_detal       e left outer join ' +
                `(select * from sicc_corp.pre_grupo_ofert where ISOPAIS='${codigoPais}') g ` +
                    'on  e.GOFE_OID_GRUP_OFER = G.OID_GRUP_OFER, ' +
                'sicc_corp.pre_nx_ofert_grati    h, ' +
                'sicc_corp.pre_tipo_ofert        tf ' +
            'where a.perd_oid_peri = b.oid_peri ' +
                'and b.peri_oid_peri = c.oid_peri ' +
                'and a.oid_cabe = d.mfca_oid_cabe ' +
                'and d.oid_ofer = e.ofer_oid_ofer ' +
                'AND h.oid_deta_ofer = e.oid_deta_ofer ' +
                'and mp.oid_prod = e.PROD_OID_PROD ' +
                `AND h.niof_oid_nx_ofer_rang = ${oidRango} ` +
                'and tf.oid_tipo_ofer = e.tofe_oid_tipo_ofer ' +
                `and a.ISOPAIS = '${codigoPais}' ` +
                `and b.ISOPAIS = '${codigoPais}' ` +
                `and c.ISOPAIS = '${codigoPais}' ` +
                `and d.ISOPAIS = '${codigoPais}' ` +
                `and e.ISOPAIS = '${codigoPais}' ` +
                `and h.ISOPAIS = '${codigoPais}' ` +
                `and mp.ISOPAIS = '${codigoPais}' ` +
                `and tf.ISOPAIS = '${codigoPais}' `;
}