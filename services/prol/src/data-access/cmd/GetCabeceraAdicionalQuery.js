'use strict'

module.exports.statement = function(codigoPais, codigoPeriodo, codGrupoDescuento){
    let query = 'SELECT CAB.COD_DESC_ADIC CODDESCUESTOADIC, ' +
                  'CAB.POR_DESC_ADIC PORCDESCUENTOADIC, ' +
                  'IFNULL(CAB.IND_TIPO_DESC_ADIC,0) TIPODESCUENTOADIC ' +
           'FROM sicc_corp.DTO_DESCU_ADICI_GRUPO GRU, ' +
                'sicc_corp.DTO_DESCU_ADICI_CABEC CAB ' +
           `WHERE GRU.COD_GRUP_DESC = '${codGrupoDescuento}' ` +
                'AND GRU.COD_DESC_ADIC = CAB.COD_DESC_ADIC ' +
                `AND '${codigoPeriodo}' >= CAB.CAM_INIC_DESC `   +
                `AND (CAB.CAM_FINA_DESC IS NULL OR CAB.CAM_FINA_DESC >= '${codigoPeriodo}') ` +
                'AND GRU.EST_REGI = 1 ' +
                'AND CAB.EST_REGI = 1 ' + 
                `AND GRU.ISOPAIS = '${codigoPais}' ` +
                `AND CAB.ISOPAIS = '${codigoPais}' `;
    return query;
}