'use strict'

module.exports.statement = function(codigoPais, codDescuestoAdic){
    return 'SELECT COD_TIPO_CLIE CODTIPOCLIENTE, ' +
                  'COD_SUBT_CLIE CODSUBTIPOCLIENTE, ' +
                  'COD_TIPO_CLAS CODTIPOCLASIFICACION, ' +
                  'COD_CLAS CODCLASIFICACION, ' +
                  'COD_REGI CODIGOREGION, ' +
                  'COD_ZONA CODIGOZONA, ' +
                  'VAL_MONT_LIMI MONTOLIMITE ' +
           'FROM sicc_corp.DTO_DESCU_ADICI_DETAL ' +
           `WHERE COD_DESC_ADIC = '${codDescuestoAdic}' ` +
                'AND EST_REGI = 1 ' +
                `AND ISOPAIS = '${codigoPais}' `;
}