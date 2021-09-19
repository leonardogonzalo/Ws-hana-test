module.exports.statement = function(codigoPais, oidPeriodoRef, oidCliente, fechaFacturacionRef) {
    return 'SELECT SUM(IFNULL(PSC.VAL_MONT_BAPL_DCTO,0)) MONTO ' + 
           'FROM sicc_corp.PED_SOLIC_CABEC PSC, ' +
                'sicc_corp.PED_SOLIC_CABEC CAB, ' +
                'sicc_corp.PED_TIPO_SOLIC_PAIS TSP, ' +
                'sicc_corp.PED_TIPO_SOLIC TSO ' +
           `WHERE PSC.PERD_OID_PERI = '${oidPeriodoRef}' ` +
                `AND PSC.CLIE_OID_CLIE = '${oidCliente}' ` +
                `AND PSC.FEC_FACT <= TO_DATE('${fechaFacturacionRef}', 'dd/MM/yyyy') ` +
                'AND PSC.TSPA_OID_TIPO_SOLI_PAIS = TSP.OID_TIPO_SOLI_PAIS ' +
                'AND TSP.TSOL_OID_TIPO_SOLI = TSO.OID_TIPO_SOLI ' +
                'AND PSC.SOCA_OID_SOLI_CABE = CAB.OID_SOLI_CABE(+) ' +
                'AND IFNULL(CAB.ESSO_OID_ESTA_SOLI,0) <> 4 ' +
                `AND TSO.COD_TIPO_SOLI = 'SOC' ` +
                `AND PSC.ISOPAIS = ${codigoPais} ` +
                `AND CAB.ISOPAIS = ${codigoPais} ` +
                `AND TSP.ISOPAIS = ${codigoPais} ` +
                `AND TSO.ISOPAIS = ${codigoPais}`;
}