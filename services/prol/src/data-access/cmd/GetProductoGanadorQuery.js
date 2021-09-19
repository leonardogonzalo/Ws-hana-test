'use strict'
module.exports.statement =  function(codigoPais, codigoPeriodo, codigoCliente)
{
    return    'SELECT b.prod_oid_prod OIDPRODUCTO, ' +
                     'b.oid_deta_ofer OIDDETALLEOFERTA, ' +
                     'b.fopa_oid_form_pago OIDFORMAPAGO, ' +
                     'b.precio_unitario PRECIOUNITARIO, ' +
                     'b.val_codi_vent CODIGOVENTA ' +
              'FROM sicc_corp.pre_ofert a, ' +
                   'sicc_corp.pre_ofert_detal b, ' +
                   'sicc_corp.pre_matri_factu_cabec c, ' +
                   'sicc_corp.cra_perio d, ' +
                   'sicc_corp.seg_perio_corpo e ' +
              'WHERE a.mfca_oid_cabe = c.oid_cabe '+
                    'AND c.perd_oid_peri = d.oid_peri '+
                    'AND d.peri_oid_peri = e.oid_peri '+
                    `AND e.cod_peri = '${codigoPeriodo}' ` +
                    'AND a.oid_ofer = b.ofer_oid_ofer '+
                    'AND a.coes_oid_estr = 2018 '+
                    'AND (EXISTS(SELECT 1 '+
                                'FROM sicc_corp.pre_venta_exclu d, '+
                                     'sicc_corp.zon_terri_admin e, '+
                                     'sicc_corp.zon_secci f, '+
                                     'sicc_corp.zon_zona g, '+
                                     'sicc_corp.zon_regio h, '+
                                     'sicc_corp.mae_clien mc, '+
                                     'sicc_corp.mae_clien_unida_admin mcud ' +
                                'WHERE d.ofer_oid_ofer = a.oid_ofer ' +
                                    `AND mc.cod_clie = '${codigoCliente}' ` +
                                    'AND mc.oid_clie = mcud.clie_oid_clie ' +
                                    'AND MCUD.PERD_OID_PERI_FIN is null ' +
                                    'AND e.oid_terr_admi = MCUD.ZTAD_OID_TERR_ADMI ' +
                                    'AND e.zscc_oid_secc = f.oid_secc ' +
                                    'AND f.zzon_oid_zona = g.oid_zona ' +
                                    'AND g.zorg_oid_regi = h.oid_regi ' +
                                    'AND (d.zzon_oid_zona IS NULL OR d.zzon_oid_zona = g.oid_zona) ' +
                                    'AND (d.zorg_oid_regi IS NULL OR d.zorg_oid_regi = h.oid_regi) ' +
                                    `AND d.ISOPAIS = '${codigoPais}' ` +
                                    `AND e.ISOPAIS = '${codigoPais}' ` +
                                    `AND f.ISOPAIS = '${codigoPais}' ` +
                                    `AND g.ISOPAIS = '${codigoPais}' ` +
                                    `AND h.ISOPAIS = '${codigoPais}' ` +
                                    `AND mc.ISOPAIS = '${codigoPais}' ` +
                                    `AND mcud.ISOPAIS = '${codigoPais}' OR ` +
                         'NOT EXISTS(SELECT 1 ' +
                                    'FROM sicc_corp.pre_venta_exclu ' + 
                                    'WHERE ofer_oid_ofer = a.oid_ofer ' + 
                                        `AND ISOPAIS = '${codigoPais}')) ` + 
                    `AND a.ISOPAIS = '${codigoPais}' ` +
                    `AND b.ISOPAIS = '${codigoPais}' ` +
                    `AND c.ISOPAIS = '${codigoPais}' ` +
                    `AND d.ISOPAIS = '${codigoPais}' ` +
                    `AND e.ISOPAIS = '${codigoPais}' ` + 
              'ORDER BY b.imp_prec_cata ASC';
}