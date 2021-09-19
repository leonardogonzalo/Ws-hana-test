'use strict'

module.exports.statement = function(codigoPais, grupoDescuentoVari, rangoDescuentoVari){
    let query = 'SELECT (VAL_IMPO_HASTA + 0.01) MONTO ' +
           'FROM sicc_corp.DTO_DESCU_GRUPO_RANGO ' +
           `WHERE COD_GRUP_DESC = '${grupoDescuentoVari}' ` +
                'AND EST_REGI <> 9 ' + 
                'AND COD_RANG_DESC =(SELECT MAX(cod_rang_desc) ' +
                                    'FROM sicc_corp.DTO_DESCU_GRUPO_RANGO ' +
                                    `WHERE COD_GRUP_DESC = '${grupoDescuentoVari}' ` +
                                        'AND EST_REGI <> 9 ' + 
                                        `AND ISOPAIS = '${codigoPais}' ` +
                                        `AND COD_RANG_DESC < '${rangoDescuentoVari}') ` +
                `AND ISOPAIS = '${codigoPais}'`;
    return query;
}