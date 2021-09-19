'use strict'
module.exports.statement = function(codigoPais, codigoSAPs)
{
    

    return  'SELECT m.COD_SAP codigoSAP, g.VAL_I18N descripcionSAP ' +
            'FROM sicc_corp.gen_i18n_sicc_pais g, sicc_corp.mae_produ m ' +
            `WHERE g.attr_enti = 'MAE_PRODU' ` +
                'AND g.attr_num_Atri = 1 ' +
                'AND g.idio_oid_idio = 1 ' +
                'AND g.val_oid = m.oid_prod ' +
                `AND m.COD_SAP IN ('${codigoSAPs.join("', '")}') ` +
                `AND g.ISOPAIS = '${codigoPais}' ` +
                `AND m.ISOPAIS = '${codigoPais}'`;
}