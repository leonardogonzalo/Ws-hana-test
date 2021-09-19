'use strict'
module.exports.statement = function(codigoPais, oidOfertas)
{
    let filterOferta = '';
    if (Array.isArray(oidOfertas))
    {
        if (oidOfertas.length > 0)
        {
            filterOferta = `AND ofer_oid_ofer IN (${oidOfertas.join()}) `;
        }
        else
        {
            filterOferta = `AND ofer_oid_ofer = null `;
        }
    }
    else
    {
        filterOferta = `AND ofer_oid_ofer = ${oidOfertas} `;
    }

    return  'SELECT OID_PROM oidPromocion, ' +
                'ICPR_OID_INDI_CUAD_PROM indicadorCuadre, ' +
                'VAL_FACT_CUAD factorCuadre ' +
            'FROM sicc_corp.pre_promo ' +
            `WHERE ISOPAIS = '${codigoPais}' ` +
            //`WHERE ofer_oid_ofer = ${oidOferta} ` +
            filterOferta;
            //`and ISOPAIS = '${codigoPais}' `;
}