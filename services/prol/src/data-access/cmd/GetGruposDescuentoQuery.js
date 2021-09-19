module.exports.statement = function(codigoPais){
    return 'SELECT grp.COD_GRUP_DESC CODGRUPODESCUENTO ' +
           'FROM sicc_corp.DTO_DESCU_GRUPO grp, ' +
               '(SELECT DISTINCT COD_GRUP_DESC ' +
                'FROM sicc_corp.DTO_DESCU_ADICI_GRUPO ' +
                'WHERE EST_REGI = 1 ' + 
                    `AND ISOPAIS = '${codigoPais}') adg ` +
            'WHERE grp.COD_GRUP_DESC = adg.COD_GRUP_DESC ' +
                'AND grp.EST_REGI = 1 ' +
                `AND grp.ISOPAIS = '${codigoPais}'`;
}