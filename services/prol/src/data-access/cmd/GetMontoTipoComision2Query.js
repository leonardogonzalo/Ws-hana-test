module.exports.statement = function(codigoPais, oidPeriodo, oidCliente) {
    return 'SELECT TOP 1 VAL_MONT_BAPL_DCTO MONTO ' +
           'FROM(SELECT PSC.VAL_MONT_BAPL_DCTO ' +
                'FROM sicc_corp.PED_SOLIC_CABEC PSC, ' +
                     'sicc_corp.PED_SOLIC_CABEC CAB, ' +
                     'sicc_corp.PED_TIPO_SOLIC_PAIS TSP, ' +
                     'sicc_corp.PED_TIPO_SOLIC TSO ' +
                `WHERE PSC.Perd_Oid_Peri = '${oidPeriodo}' ` +
                    `AND PSC.CLIE_OID_CLIE = '${oidCliente}' ` +
                    'AND PSC.TSPA_OID_TIPO_SOLI_PAIS = TSP.OID_TIPO_SOLI_PAIS ' +
                    'AND TSP.TSOL_OID_TIPO_SOLI = TSO.OID_TIPO_SOLI ' +
                    'AND PSC.SOCA_OID_SOLI_CABE = CAB.OID_SOLI_CABE ' +
                    `AND TSO.COD_TIPO_SOLI = 'SOC' ` +
                    `AND PSC.ISOPAIS = '${codigoPais}' ` +
		       		`AND CAB.ISOPAIS = '${codigoPais}' ` +
		       		`AND TSP.ISOPAIS = '${codigoPais}' ` +
                    `AND TSO.ISOPAIS = '${codigoPais}' ` +
                'ORDER BY PSC.OID_SOLI_CABE) ' +
            'WHERE ROWNUM = 1';
}