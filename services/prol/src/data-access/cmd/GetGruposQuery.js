'use strict'
module.exports.statement = function(codigoPais, oidOferta)
{
    return  'SELECT OID_GRUP_OFER OIDGRUPOOFERTA, ' +
                'NUM_GRUP NUMGRUPO, ' +
                'CUES_OID_IND_CUAD_TIPO_ESTR INDICADORCUADRE, ' +
                'COD_FACT_CUAD FACTORCUADRE ' +
            'FROM sicc_corp.PRE_GRUPO_OFERT ' +
            `WHERE OFER_OID_OFER = '${oidOferta}' ` +
                'AND CUES_OID_IND_CUAD_TIPO_ESTR IN (1, 3) ' +
                `AND ISOPAIS = '${codigoPais}' `;
}