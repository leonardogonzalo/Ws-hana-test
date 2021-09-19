'use strict'
module.exports.statement = function(codigoPais, oidNiveOferta, oidProducto, factorRepeticion)
{
    return  'SELECT OID_DETA_OFER oidDetaOferta, ' +
                'VAL_CODI_VENT cuv, ' +
                'FOPA_OID_FORM_PAGO oidFormaPago ' +
            'FROM sicc_corp.pre_ofert_detal ' +
            'WHERE oid_deta_ofer = ( ' +
                'SELECT IFNULL(MIN(x.oid_deta_ofer),0) ' +
                'FROM sicc_corp.pre_nx_ofert_produ x, ' +
                    'sicc_corp.pre_ofert_detal    y ' +
                `WHERE x.niof_oid_nx_ofer = ${oidNiveOferta} ` +
                    'AND x.oid_deta_ofer = y.oid_deta_ofer ' +
                    `AND y.prod_oid_prod = ${oidProducto} ` +
                    `AND y.val_fact_repe = ${factorRepeticion} ` +
                    `AND x.ISOPAIS = '${codigoPais}' ` +
                    `AND y.ISOPAIS = '${codigoPais}' ` +
                ') ' +
                `AND ISOPAIS = '${codigoPais}' `;
}