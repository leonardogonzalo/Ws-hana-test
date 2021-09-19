'use strict'

module.exports.statement = function(codigoPais, codGrupoDescuento){
    return 'SELECT TOP 1 COD_RANG_DESC CODIGORANGODCTO, ' + 
                        'POR_DESC PORCDESCUENTO ' +
           'FROM(SELECT COD_RANG_DESC, ' + 
                        'POR_DESC ' +
                'FROM sicc_corp.DTO_DESCU_GRUPO_RANGO '+
                `WHERE COD_GRUP_DESC = '${codGrupoDescuento}' `+
                    'AND EST_REGI = 1 ' +
                    `AND ISOPAIS = '${codigoPais}' ` +
                    'ORDER BY VAL_IMPO_HASTA) ' +
           'WHERE ROWNUM = 1 ';
}