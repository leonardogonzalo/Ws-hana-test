'use strict'

module.exports.statement = function(codigoPais, codigoGrupoDescuento){
    let query = 'SELECT IFNULL(IND_ESCL_PRAL, 0) INDPORCVARI ' +
            'FROM sicc_corp.DTO_DESCU_GRUPO ' +
            `WHERE COD_GRUP_DESC = ${codigoGrupoDescuento} ` +
                'AND EST_REGI <> 9 ' +
                `AND ISOPAIS = '${codigoPais}'`;
    return query;
}