'use strict'

module.exports.statement = function(codigoPais, grupoDescuentoVari, rangoDescuentoVari){
    let query = 'SELECT VAL_IMPO_HASTA MONTO ' +
           'FROM sicc_corp.DTO_DESCU_GRUPO_RANGO ' +
           `WHERE COD_GRUP_DESC = '${grupoDescuentoVari}' ` +
                `AND COD_RANG_DESC = '${rangoDescuentoVari}' ` +
                'AND EST_REGI <> 9 ' +
                `AND ISOPAIS = '${codigoPais}' `;
    return query;
}