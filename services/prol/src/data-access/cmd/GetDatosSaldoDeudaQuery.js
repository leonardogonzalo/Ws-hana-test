'use strict'
module.exports.statement = function(codigoPais, codigoPaisDefault, codigoPeriodo, codigoCliente){
    return 'SELECT aa.cod_Zona CODIGOZONA, ' +
                     'aa.oid_Zona OIDZONA, ' +
                     'aa.val_recl_pend ABONOPENDIENTE, ' +
                     'bb.oid_peri OIDPERIODO, ' +
                     `(SELECT to_char(fec_inic, 'dd/MM/yyyy') ` +
                      'FROM sicc_corp.cra_crono cc ' +
                      'WHERE cc.perd_oid_peri = bb.oid_peri ' +
                        'AND cc.zzon_oid_zona = aa.oid_Zona ' +
                        'AND cc.cact_oid_acti = (SELECT oid_acti ' +
                                                'FROM sicc_corp.cra_activ a, ' + 
                                                    'sicc_corp.seg_pais s ' +
                                                `WHERE a.cod_acti = 'FA' ` +
                                                    `AND s.cod_pais = '${codigoPaisDefault}' ` +
                                                    'AND a.pais_oid_pais = s.oid_pais ' +
                                                    `AND a.ISOPAIS = '${codigoPais}' ` +
                                                    `AND s.ISOPAIS = '${codigoPais}') ` +
                        `AND ISOPAIS = '${codigoPais}') FECHACRONOGRAMA, ` +
                    '(SELECT b.val_mnt_min_deud ' +
                    'FROM sicc_corp.bas_ctrl_fact b ' +
                    `WHERE b.cod_pais = '${codigoPaisDefault}' ` +
                        `AND b.cod_peri = '${codigoPeriodo}' ` +
                        `AND b.ISOPAIS = '${codigoPais}') SALDORECHAZO, ` + 
                    `(SELECT to_char(b.fec_proc, 'dd/MM/yyyy') ` +
                    'FROM sicc_corp.bas_ctrl_fact b ' +
                    'WHERE b.ind_camp_act = 1 ' +
                        "AND b.sta_camp = 0 " +
                        `AND ISOPAIS = '${codigoPais}') FECHAPROCESO, ` +
                    'CASE WHEN (oid_nive_ries >= 4 and oid_nive_ries <= 9) THEN 1 ELSE 0 END INDNUEVA ' +
                'FROM (' +
                    'SELECT ifnull(a.val_recl_pend, 0) val_recl_pend, ' +
                            'z.cod_Zona, ' +
                            'z.oid_Zona, ' +
                            'ifnull(d.niri_oid_nive_ries, 0) oid_nive_ries ' +
                    'FROM sicc_corp.mae_clien a ' +
                        'LEFT JOIN sicc_corp.mae_clien_datos_adici d on a.oid_clie = d.clie_oid_clie ' +
           		            'AND a.isopais = d.isopais ' +
                        'LEFT JOIN sicc_corp.mae_clien_unida_admin b on a.oid_clie = b.clie_oid_clie ' +
                            'AND B.PERD_OID_PERI_FIN is null ' +
                            'AND a.isopais = b.isopais ' +
                        'LEFT JOIN sicc_corp.zon_terri_admin c on b.ztad_oid_terr_admi = C.OID_TERR_ADMI ' +
                            'AND b.isopais = C.isopais ' +
                        'LEFT JOIN sicc_corp.zon_Secci s on c.zscc_oid_secc = s.oid_secc ' +
                            'AND c.isopais = s.isopais ' +
                        'LEFT JOIN sicc_corp.zon_Zona z on s.zzon_oid_zona = z.oid_zona ' +
                            'AND s.isopais = z.isopais ' +
                    `WHERE a.cod_clie = '${codigoCliente}' ` +
                        `AND a.ISOPAIS = '${codigoPais}') aa, ` +
            '(SELECT c1.oid_peri ' +
             'FROM sicc_corp.cra_perio c1 ' +
                'INNER JOIN sicc_corp.seg_perio_corpo dd ON c1.peri_oid_peri = dd.oid_peri ' +
                    'AND c1.isopais = dd.isopais ' +
                    `AND c1.ISOPAIS = '${codigoPais}' `+
                    `AND dd.cod_peri = '${codigoPeriodo}') bb`;
}