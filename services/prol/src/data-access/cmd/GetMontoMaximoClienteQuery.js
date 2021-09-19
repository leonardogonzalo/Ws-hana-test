'use strict'
module.exports.statement = function(codigoPais, codigoCliente){
    var cmd = 'SELECT h.val_mont_maxi_perm MONTOMAXIMO ' +
              'FROM sicc_corp.mae_clien mc ' +
                    'LEFT JOIN sicc_corp.mae_clien_datos_adici s on s.clie_oid_clie = mc.oid_clie ' + 
                        'AND s.isopais = mc.isopais ' +
                    'LEFT JOIN sicc_corp.mae_clien_unida_admin mcud on mc.oid_clie = mcud.clie_oid_clie ' + 
                        'AND mc.isopais = mcud.isopais ' + 
                        'AND mcud.PERD_OID_PERI_FIN IS NULL ' +
                    'LEFT JOIN sicc_corp.zon_terri_admin q on mcud.ZTAD_OID_TERR_ADMI = q.OID_TERR_ADMI ' + 
                        'AND mcud.isopais = q.isopais ' +
                    'LEFT JOIN sicc_corp.zon_secci r on q.zscc_oid_secc = r.oid_secc ' + 
                        'AND mc.isopais = r.isopais ' +
                    'LEFT JOIN sicc_corp.zon_zona k on r.zzon_oid_zona = k.oid_zona ' + 
                        'AND k.isopais = mc.isopais ' +
                    'LEFT JOIN sicc_corp.zon_regio l on k.zorg_oid_regi = l.oid_regi ' + 
                        'AND l.isopais = mc.isopais ' +
                    'LEFT JOIN sicc_corp.car_asign_codig_confi i on s.niri_oid_nive_ries = i.niri_oid_nive_ries ' + 
                        'AND mc.isopais = i.isopais '+
                    'LEFT JOIN sicc_corp.car_param_carte h on i.paca_oid_para_cart = h.oid_para_cart ' + 
                        'AND mc.isopais = h.isopais ' +     
              `WHERE mc.isopais = '${codigoPais}' ` + 
                    `AND mc.cod_clie = '${codigoCliente}' ` +
                    'AND h.ind_mont_maxi = 1 ' +
                    'AND (l.oid_regi = i.zorg_oid_regi OR i.zorg_oid_regi IS NULL) ' +
                    'AND (k.oid_zona = i.zzon_oid_zona OR i.zzon_oid_zona IS NULL) ' +
                    'AND (r.oid_secc = i.zscc_oid_secc OR i.zscc_oid_secc IS NULL) ' +  
              'ORDER BY IFNULL(i.zorg_oid_regi, 0) DESC, ' +
                    'IFNULL(i.zzon_oid_zona, 0) DESC, ' +
                    'IFNULL(i.zscc_oid_secc, 0) DESC ';
    return cmd;
}