module.exports.statement = function(codigoPais, codigoPeriodo, categoriaDescuento){
    let query = 'SELECT DDM.SUB_CAT1 SUBCATEGORIA1, ' +
                  'DDM.SUB_CAT2 SUBCATEGORIA2, ' +
                  'DDG.COD_GRUP_DESC CODGRUPODESCUENTO ' +
           'FROM sicc_corp.DTO_DESCU_GRUPO DDG, '+
                'sicc_corp.DTO_DESCU_MATRI DDM ' +
           'WHERE DDG.EST_REGI = 1 ' +
                `AND CAM_INIC <= '${codigoPeriodo}' ` +
                `AND (CAM_FINA >= '${codigoPeriodo}' OR CAM_FINA IS NULL) ` +
                'AND DDM.COD_GRUP_DESC = DDG.COD_GRUP_DESC ' +
                'AND DDM.EST_REGI = 1 ' +
                `AND DDM.COD_CATE = '${categoriaDescuento}' ` +
                `AND DDG.ISOPAIS = '${codigoPais}' ` +
                `AND DDM.ISOPAIS = '${codigoPais}' ` +
            'ORDER BY DDM.COD_CATE, DDM.SUB_CAT1, DDM.SUB_CAT2 DESC';
    return query;
}