module.exports.statement = function(codigoPais, oidPeriodo, oidCliente) {
    let query = 'SELECT IFNULL(SUM(PSC.VAL_MONT_BAPL_DCTO),0) MONTO ' + 
           'FROM sicc_corp.PED_TIPO_SOLIC_PAIS TSP, ' +
                'sicc_corp.PED_TIPO_SOLIC TSO, ' +
                'sicc_corp.PED_SOLIC_CABEC PSC ' +
                `LEFT OUTER JOIN (SELECT * FROM sicc_corp.PED_SOLIC_CABEC WHERE ISOPAIS='PER') CAB ` +
                    'ON PSC.SOCA_OID_SOLI_CABE = CAB.OID_SOLI_CABE ' +
            `WHERE PSC.Perd_Oid_Peri = '${oidPeriodo}' ` +
                `AND PSC.CLIE_OID_CLIE = '${oidCliente}' ` +
                'AND PSC.TSPA_OID_TIPO_SOLI_PAIS = TSP.OID_TIPO_SOLI_PAIS ' +
                'AND TSP.TSOL_OID_TIPO_SOLI = TSO.OID_TIPO_SOLI ' +
                `AND TSO.COD_TIPO_SOLI = 'SOC' ` +
                `AND PSC.ISOPAIS = '${codigoPais}' ` +
                `AND TSP.ISOPAIS = '${codigoPais}' ` +
                `AND TSO.ISOPAIS = '${codigoPais}'`;
    return query;
}