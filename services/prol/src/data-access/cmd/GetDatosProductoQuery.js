'use strict'

module.exports.statement = function(codigoPais, oidPeriodo, arrayCuv){
    return 'SELECT C.VAL_CODI_VENT CODIGOVENTA, ' + 
                  'C.PRECIO_UNITARIO PRECIOUNITARIO ' + 
           'FROM sicc_corp.PRE_OFERT_DETAL C, ' +
                'sicc_corp.PRE_OFERT B, ' +
                'sicc_corp.PRE_MATRI_FACTU_CABEC A ' +
           'WHERE A.OID_CABE = B.MFCA_OID_CABE ' +
                'AND B.OID_OFER = C.OFER_OID_OFER ' +
                `AND A.PERD_OID_PERI = '${oidPeriodo}' ` +
                `AND C.VAL_CODI_VENT IN ('${arrayCuv.join("', '")}') ` +
                `AND A.ISOPAIS = '${codigoPais}' ` +
                `AND B.ISOPAIS = '${codigoPais}' ` +
                `AND C.ISOPAIS = '${codigoPais}' `;
}