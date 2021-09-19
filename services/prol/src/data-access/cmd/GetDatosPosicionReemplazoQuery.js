'use strict'
module.exports.statement = function(codigoPais, codigoPeriodo, codigoCliente, codigoTerrAdmi, tipoReemplazo, arrayCuv){
    var cmdCuvs = '';

    if(Array.isArray(arrayCuv))
    {
        cmdCuvs = `AND e.VAL_CODI_VENT IN ('${arrayCuv.join("', '")}') `;
    }
    
    var cmd = 'SELECT OID_OFER OIDOFERTA, ' +
                    'OID_DETA_OFER OIDDETAOFERTA, ' +
                    'COES_OID_ESTR OIDESTRATEGIA, ' +
                    'FOPA_OID_FORM_PAGO OIDFORMAPAGO, '+
                    'NUM_PAGI_CATA PAGINA, ' +
                    'OCAT_OID_CATA OIDCATALOGO, ' +
                    'PRECIO_UNITARIO PRECIOUNITARIO, ' +
                    'IMP_PREC_CATA PRECIOCATALOGO, ' +
                    'IMP_PREC_POSI PRECIOCONTABLE, ' +
                    'VAL_FACT_REPE FACTORREPETICION, ' +
                    'GOFE_OID_GRUP_OFER OIDGRUPOOFERTA, ' +
                    'CUES_OID_IND_CUAD_TIPO_ESTR OIDINDICADORCUADRE, ' +
                    'COD_FACT_CUAD FACTORCUADRE, ' +
                    'NUM_POSI_RANK RANKING, ' +
                    'VAL_CODI_VENT CUV, ' +
                    'PROD_OID_PROD OIDPRODUCTO, ' +
                    'COD_SAP CODSAP, ' +
                    'NUM_SECC_DETA_FACT NUMEROSECCIONDETALLE, ' +
                    'PRECIO_PUBLICO PRECIOPUBLICO, ' +
                    'IND_RECU INDICADORRECUPERACION, ' +
                    'CUV CUVORIGINAL ' +
                'FROM (SELECT DISTINCT map(g.zorg_oid_regi,null,0,1) + map(g.zzon_oid_zona,null,0,1) + map(g.ticl_oid_tipo_clie,null,0,1) + map(g.sbti_oid_subti_clien,null,0,1) + map(g.tccl_oid_tipo_clas,null,0,1) + map(g.clas_oid_clas,null,0,1), ' + 
                            'j.OID_OFER, ' +
                            'i.OID_DETA_OFER, ' +
                            'j.COES_OID_ESTR, ' +
                            'j.FOPA_OID_FORM_PAGO,' +
                            'i.NUM_PAGI_CATA, ' +
                            'j.OCAT_OID_CATA, ' +
                            'i.PRECIO_UNITARIO, ' +
                            'i.IMP_PREC_CATA, ' +
                            'i.IMP_PREC_POSI, ' +
                            'i.VAL_FACT_REPE, ' +
                            'i.GOFE_OID_GRUP_OFER, ' +
                            'l.CUES_OID_IND_CUAD_TIPO_ESTR, ' +
                            'l.COD_FACT_CUAD, ' +
                            'i.NUM_POSI_RANK, ' +
                            'i.VAL_CODI_VENT, ' +
                            'i.PROD_OID_PROD, ' +
                            'mp.COD_SAP, ' +
                            'tf.NUM_SECC_DETA_FACT, ' +
                            'i.IMP_PREC_PUBL PRECIO_PUBLICO, ' +
                            '0 IND_RECU, ' +
                            'e.VAL_CODI_VENT CUV, ' +
                            'ROW_NUMBER() OVER (PARTITION BY e.val_codi_vent order by ' + 
                            '(map(g.zorg_oid_regi, null, 0 ,1) + map(g.zzon_oid_zona,null,0,1) + map(g.ticl_oid_tipo_clie,null,0,1) + map(g.sbti_oid_subti_clien,null,0,1) + map(g.tccl_oid_tipo_clas,null,0,1) + map(g.clas_oid_clas,null,0,1)) desc) POSICION ' +
                       'FROM sicc_corp.pre_ofert c, ' +
                            'sicc_corp.pre_matri_factu_cabec d, ' +
                            'sicc_corp.pre_ofert_detal e, ' +
                            'sicc_corp.pre_matri_factu f, ' +
                            'sicc_corp.pre_matri_reemp g, ' +
                            'sicc_corp.pre_matri_factu h, ' +
                            'sicc_corp.zon_terri_admin z1, ' +
                            'sicc_corp.zon_terri z2, ' +
                            'sicc_corp.zon_secci z3, ' +
                            'sicc_corp.zon_zona z4, ' +
                            'sicc_corp.zon_regio z5, ' +
                            'sicc_corp.mae_clien_tipo_subti z6, ' +
                            'sicc_corp.mae_clien_clasi z7, ' +
                            'sicc_corp.pre_ofert j, ' +
                            'sicc_corp.mae_produ mp, ' +
                            'sicc_corp.pre_ofert_detal i ' +
                                `LEFT OUTER JOIN(SELECT * FROM sicc_corp.pre_grupo_ofert WHERE ISOPAIS='${codigoPais}') l ON i.GOFE_OID_GRUP_OFER = l.OID_GRUP_OFER, ` +
                            'sicc_corp.pre_tipo_ofert tf ' +
                       `WHERE d.perd_oid_peri = '${codigoPeriodo}' ` +
                            `AND z1.oid_terr_admi = '${codigoTerrAdmi}' ` +
                            'AND z1.ZSCC_OID_SECC = z3.oid_secc ' +
                            'AND z1.terr_oid_terr = z2.oid_terr ' +
                            'AND z3.zzon_oid_zona = z4.oid_zona ' +
                            'AND z4.zorg_oid_regi = z5.oid_regi ' +
                            'AND (g.zzon_oid_zona IS null OR g.zzon_oid_zona = z4.oid_zona) ' +
                            'AND (g.zorg_oid_regi IS null OR g.zorg_oid_regi = z5.oid_regi) ' +
                            `AND z6.clie_oid_clie = '${codigoCliente}' ` +
                            'AND z6.oid_clie_tipo_subt = z7.ctsu_oid_clie_tipo_subt ' +
                            'AND (g.ticl_oid_tipo_clie is null OR g.ticl_oid_tipo_clie = z6.ticl_oid_tipo_clie) ' +
                            'AND (g.sbti_oid_subti_clien is null OR g.sbti_oid_subti_clien = z6.sbti_oid_subt_clie) ' +
                            'AND (g.tccl_oid_tipo_clas is null OR g.tccl_oid_tipo_clas = z7.tccl_oid_tipo_clasi) ' +
                            'AND (g.clas_oid_clas is null OR g.clas_oid_clas = z7.clas_oid_clas) ' +
                            'AND d.oid_cabe = c.mfca_oid_cabe ' +
                            'AND c.oid_ofer = e.ofer_oid_ofer ' +                                                    
                            cmdCuvs +                            
                            'AND e.oid_deta_ofer = f.ofde_oid_deta_ofer ' +
                            'AND f.oid_matr_fact = g.mafa_oid_cod_ppal ' +
                            'AND g.mafa_oid_cod_reem = h.oid_matr_fact ' +
                            'AND h.ofde_oid_deta_ofer = i.oid_deta_ofer ' +
                            `AND g.ind_reem_ante_cuad = '${tipoReemplazo}' ` +
                            'AND g.ind_acti = 1 ' +
                            'AND j.oid_ofer = i.ofer_oid_ofer ' +
                            'AND mp.oid_prod = i.prod_oid_prod ' +
                            'AND tf.oid_tipo_ofer = e.tofe_oid_tipo_ofer ' +
                            `AND c.ISOPAIS = '${codigoPais}' ` +
                            `AND d.ISOPAIS = '${codigoPais}' ` +
                            `AND e.ISOPAIS = '${codigoPais}' ` +
                            `AND f.ISOPAIS = '${codigoPais}' ` +
                            `AND g.ISOPAIS = '${codigoPais}' ` +
                            `AND h.ISOPAIS = '${codigoPais}' ` +												
                            `AND z1.ISOPAIS = '${codigoPais}' ` +
                            `AND z2.ISOPAIS = '${codigoPais}' ` +
                            `AND z3.ISOPAIS = '${codigoPais}' `  +
                            `AND z4.ISOPAIS = '${codigoPais}' ` +
                            `AND z5.ISOPAIS = '${codigoPais}' ` +
                            `AND z6.ISOPAIS = '${codigoPais}' ` +
                            `AND z7.ISOPAIS = '${codigoPais}' ` +
                            `AND j.ISOPAIS = '${codigoPais}' ` +
                            `AND i.ISOPAIS = '${codigoPais}' ` +
                            `AND mp.ISOPAIS = '${codigoPais}' ` +
                            `AND tf.ISOPAIS = '${codigoPais}') ` +
                        'WHERE POSICION = 1';
    
    return cmd;
}