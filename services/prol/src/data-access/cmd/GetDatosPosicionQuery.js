'use strict'
module.exports.statement =  function(codigoPais, codigoPeriodo, arrayCuv)
{
    let cmdCuvs = '';
    if(Array.isArray(arrayCuv))
    {
        cmdCuvs = `AND e.VAL_CODI_VENT IN ('${arrayCuv.join("', '")}') `;
    }
    else 
    {
        cmdCuvs = `AND e.VAL_CODI_VENT = '${arrayCuv}' `;
    }

    return   'SELECT d.OID_OFER oidOferta, ' +
                     'e.OID_DETA_OFER oidDetaOferta, ' +
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
                     'E.PROD_OID_PROD oidProducto, ' +
                     'mp.COD_SAP codSap, ' +
                     'tf.NUM_SECC_DETA_FACT numeroSeccionDetalle, ' +
                     'e.IMP_PREC_PUBL precioPublico, ' +
                     '0 indicadorRecuperacion, ' +
                     'e.VAL_CODI_VENT cuv ' +
              'FROM sicc_corp.pre_matri_factu_cabec a ' +
                    'LEFT JOIN sicc_corp.cra_perio b on a.perd_oid_peri = b.oid_peri ' +
                        'AND a.isopais = b.isopais ' +
                    'LEFT JOIN sicc_corp.seg_perio_corpo c on b.peri_oid_peri = c.oid_peri ' +
                        'AND b.isopais = c.isopais ' +
                    'LEFT JOIN sicc_corp.pre_ofert d on a.oid_cabe = d.mfca_oid_cabe ' +
                        'AND a.isopais = d.isopais ' +
                    'LEFT JOIN sicc_corp.pre_ofert_detal e on d.oid_ofer = e.ofer_oid_ofer ' +
                        'AND d.isopais = e.isopais ' +
                    'LEFT JOIN sicc_corp.pre_tipo_ofert tf on tf.oid_tipo_ofer = e.tofe_oid_tipo_ofer ' +
                        'AND tf.isopais = e.isopais ' +
                    'LEFT JOIN sicc_corp.mae_produ mp on mp.oid_prod = E.PROD_OID_PROD ' +
                        'AND mp.isopais = E.isopais ' +
                    'LEFT join sicc_corp.pre_grupo_ofert g on e.GOFE_OID_GRUP_OFER = G.OID_GRUP_OFER ' +
                        'AND e.isopais = G.isopais ' +
                    'LEFT JOIN (SELECT DISTINCT bb.isopais, ' +
                                        'bb.prod_oid_prod, ' +
                                        'MAX(bb.precio_unitario) precio_unitario ' +
                               'FROM sicc_corp.pre_ofert aa, ' +
                                    'sicc_corp.pre_ofert_detal bb, ' +
                                    'sicc_corp.pre_matri_factu_cabec cc ' +
                               'WHERE aa.oid_ofer = bb.ofer_oid_ofer ' +
                                    'AND aa.mfca_oid_cabe = cc.oid_cabe ' +
                                    `AND cc.perd_oid_peri = '${codigoPeriodo}' ` +
                                    `AND bb.tofe_oid_tipo_ofer <> 2019 ` +
                                    'AND bb.tofe_oid_tipo_ofer IN (SELECT oid_tipo_ofer ' +
			                                                      'FROM sicc_corp.pre_tipo_ofert ' +
			                                                      'WHERE num_secc_deta_fact = 0 ' +
                                                                    `AND ISOPAIS = '${codigoPais}') ` +
                                    `AND aa.ISOPAIS = '${codigoPais}' ` +
                                    `AND bb.ISOPAIS = '${codigoPais}' ` +
                                    `AND cc.ISOPAIS = '${codigoPais}' ` +
			                   'GROUP BY bb.isopais, bb.prod_oid_prod) res on res.prod_oid_prod = e.prod_oid_prod ' +
                        'AND res.isopais = e.isopais ' +
			  `WHERE a.ISOPAIS = '${codigoPais}' ` +
                    `AND c.cod_peri = '${codigoPeriodo}' ` + 
                    cmdCuvs;
}