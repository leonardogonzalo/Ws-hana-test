'use strict'
module.exports.statement = function(codigoPais, codigoCliente)
{
    return      'SELECT h.VAL_NIV1 NIVEL1, ' +
                     'h.VAL_MONT_MINI_NOMI MONTOMINIMO, ' +
                     'h.VAL_NIV2 NIVEL2, ' +
                     'IFNULL(h.zorg_oid_regi, 0) OIDREGION, ' +
                     'IFNULL(h.zzon_oid_zona, 0) OIDZONA, ' +
                     'IFNULL(h.ticl_oid_tipo_clie, 0) OIDTIPOCLIENTE, ' +
                     'IFNULL(h.sbti_oid_subt_clie, 0) OIDSUBTIPOCLIENTE, ' +
                     'IFNULL(h.tccl_oid_tipo_clas, 0) OIDTIPOCLASIFICACION, ' +
                     'IFNULL(h.clas_oid_clas, 0) OIDCLASIFICACION ' +
               'FROM sicc_corp.mae_clien mc ' +
                    'LEFT JOIN sicc_corp.mae_clien_tipo_subti  m on m.clie_oid_clie = mc.oid_clie ' +
                        'AND m.isopais = mc.isopais ' +
                    'LEFT JOIN sicc_corp.mae_clien_unida_admin mcud on mc.oid_clie = mcud.clie_oid_clie ' + 
                        'AND mc.isopais = mcud.isopais ' + 
                        'AND MCUD.PERD_OID_PERI_FIN IS NULL ' +
                    'LEFT JOIN sicc_corp.zon_terri_admin q on MCUD.ZTAD_OID_TERR_ADMI = Q.OID_TERR_ADMI ' + 
                        'AND mcud.isopais = q.isopais ' +
                    'LEFT JOIN sicc_corp.zon_secci r on q.zscc_oid_secc = r.oid_secc ' +
                        'AND mc.isopais = r.isopais ' +
                    'LEFT JOIN sicc_corp.zon_zona k on r.zzon_oid_zona = k.oid_zona ' +
                        'AND k.isopais = mc.isopais ' +
                    'LEFT JOIN sicc_corp.zon_regio l on k.zorg_oid_regi = l.oid_regi ' +
                        'AND l.isopais = mc.isopais ' +
                    'LEFT JOIN sicc_corp.mae_clien_clasi n on m.oid_clie_tipo_subt = n.ctsu_oid_clie_tipo_subt ' +
                        'AND mc.isopais = n.isopais ' +
                    'LEFT JOIN sicc_corp.ped_monto_minim h on m.ticl_oid_tipo_clie = h.ticl_oid_tipo_clie ' + 
                        'AND mc.isopais = h.isopais ' +
               `WHERE mc.isopais = '${codigoPais}' ` +
                    `AND mc.cod_clie = '${codigoCliente}' ` +
                    'AND MCUD.PERD_OID_PERI_FIN IS NULL ' +
                    'AND (m.ticl_oid_tipo_clie = h.ticl_oid_tipo_clie OR h.ticl_oid_tipo_clie IS NULL) ' +
                    'AND (m.sbti_oid_subt_clie = h.sbti_oid_subt_clie OR h.sbti_oid_subt_clie IS NULL) ' +
                    'AND (n.tccl_oid_tipo_clasi = h.tccl_oid_tipo_clas OR h.tccl_oid_tipo_clas IS NULL) ' +
                    'AND (n.clas_oid_clas = h.clas_oid_clas OR h.clas_oid_clas IS NULL) ' +
                    'AND (l.oid_regi = h.zorg_oid_regi OR h.zorg_oid_regi IS NULL) ' +
                    'AND (k.oid_zona = h.zzon_oid_zona OR h.zzon_oid_zona IS NULL) ' +
                'ORDER BY 4, 5, 6, 7, 8, 9';
}