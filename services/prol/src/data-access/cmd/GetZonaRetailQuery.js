module.exports.statement = function(codigoPais, oidZona)
{
    let query = 'SELECT zr.ind_pilo_reta INDPILOTO ' +
           'FROM sicc_corp.zon_regio zr, ' +
                'sicc_corp.zon_zona zz ' +
           'WHERE zr.oid_regi = zz.zorg_oid_regi ' +
                `AND zz.oid_zona = '${oidZona}' ` +
                `AND zr.ISOPAIS = '${codigoPais}' ` +
                `AND zz.ISOPAIS = '${codigoPais}'`;
    return query;
}