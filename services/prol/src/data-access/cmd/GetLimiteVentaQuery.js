'use strict'
module.exports.statement =  function(codigoPais, codigoCliente, codigoTerrAdmi, arrayDetalleOferta)
{
    var cmdDetalleOferta = '';

    for(let i=0; i<arrayDetalleOferta.length; i++){

        if(cmdDetalleOferta === ''){
            cmdDetalleOferta = `(h.ofde_oid_deta_ofer = ${arrayDetalleOferta[i].oid} AND h.val_limi_ctrl_vent <= ${arrayDetalleOferta[i].numeroUnidades})`;
        }
        else{
            cmdDetalleOferta = cmdDetalleOferta + ' OR ' + `(h.ofde_oid_deta_ofer = ${arrayDetalleOferta[i].oid} AND h.val_limi_ctrl_vent <= ${arrayDetalleOferta[i].numeroUnidades})`;
        }        
    }

    if(cmdDetalleOferta != ''){
        cmdDetalleOferta = "AND (" + cmdDetalleOferta + ')'; 
    }
    
    var cmd = 'SELECT OFDE_OID_DETA_OFER OIDDETAOFERTA, ' +
                    'VAL_LIMI_CTRL_VENT LIMITEVENTA ' +
              'FROM(SELECT map(h.zorg_oid_regi, null, 0, 1) + map(h.zzon_oid_zona, null, 0, 1) + map(h.ticl_oid_tipo_clie, null, 0, 1) + map(h.sbti_oid_subt_clie, null, 0, 1) + map(h.tccl_oid_tipo_clas,null,0,1) + map(h.clas_oid_clas, null, 0, 1), ' +
                        'VAL_LIMI_CTRL_VENT, ' +
                        'h.OFDE_OID_DETA_OFER, ' +
                        'ROW_NUMBER() OVER (PARTITION BY h.OFDE_OID_DETA_OFER order by (map(h.zorg_oid_regi, null, 0, 1) + map(h.zzon_oid_zona, null, 0, 1) + map(h.ticl_oid_tipo_clie,null,0,1) + map(h.sbti_oid_subt_clie, null, 0, 1) + map(h.tccl_oid_tipo_clas,null,0,1) + map(h.clas_oid_clas, null, 0, 1)) desc) POSICION ' +
                    'FROM sicc_corp.ped_gesti_stock h, ' +
                        'sicc_corp.zon_zona k, ' +
                        'sicc_corp.zon_regio l, ' +
                        'sicc_corp.mae_clien_tipo_subti m, ' +
                        'sicc_corp.mae_clien_clasi n, ' +
                        'sicc_corp.zon_terri_admin q, ' +
                        'sicc_corp.zon_secci r ' +
                    'WHERE h.val_limi_ctrl_vent IS NOT NULL ' +
                        cmdDetalleOferta +
                        `AND m.clie_oid_clie = '${codigoCliente}' `  +
                        `AND q.oid_terr_admi = '${codigoTerrAdmi}' ` +
                        'AND q.zscc_oid_secc = r.oid_secc ' +
                        'AND r.zzon_oid_zona = k.oid_zona ' +
                        'AND k.zorg_oid_regi = l.oid_regi ' +
                        'AND m.oid_clie_tipo_subt = n.ctsu_oid_clie_tipo_subt ' +
                        'AND (m.ticl_oid_tipo_clie = h.ticl_oid_tipo_clie OR h.ticl_oid_tipo_clie IS NULL) ' +
                        'AND (m.sbti_oid_subt_clie = h.sbti_oid_subt_clie OR h.sbti_oid_subt_clie IS NULL) ' +
                        'AND (n.tccl_oid_tipo_clasi = h.tccl_oid_tipo_clas OR h.tccl_oid_tipo_clas IS NULL) ' +
                        'AND (n.clas_oid_clas = h.clas_oid_clas OR h.clas_oid_clas IS NULL) ' +
                        'AND (l.oid_regi = h.zorg_oid_regi OR h.zorg_oid_regi IS NULL) ' +
                        'AND (k.oid_zona = h.zzon_oid_zona OR h.zzon_oid_zona IS NULL) ' +
                        `AND IFNULL(h.ind_acti,'1') = '1' ` +
                        `AND h.ISOPAIS = '${codigoPais}' ` +
                        `AND k.ISOPAIS = '${codigoPais}' ` +
                        `AND l.ISOPAIS = '${codigoPais}' ` +
                        `AND m.ISOPAIS = '${codigoPais}' ` +
                        `AND n.ISOPAIS = '${codigoPais}' ` +
                        `AND q.ISOPAIS = '${codigoPais}' ` +
                        `AND r.ISOPAIS = '${codigoPais}') ` +
                'WHERE POSICION = 1';

    return cmd;
}