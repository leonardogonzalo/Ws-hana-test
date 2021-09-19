module.exports.statement =  function(codigoPais, oidPeriodo){
    return 'SELECT b.cod_peri CODPERIODO ' +
           'FROM sicc_corp.cra_perio a, ' +
                'sicc_corp.seg_perio_corpo b ' +
           'WHERE a.peri_oid_peri = b.oid_peri ' +
                `AND a.oid_peri = '${oidPeriodo}' ` +
                `AND a.ISOPAIS = '${codigoPais}' ` +
    	        `AND b.ISOPAIS = '${codigoPais}'`;
}