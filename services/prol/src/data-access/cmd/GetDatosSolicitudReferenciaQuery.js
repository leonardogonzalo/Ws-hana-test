module.exports.statement = function(codigoPais, oidSolicitudRef){
    return 'SELECT TSO.COD_TIPO_SOLI TIPOSOLICITUDREF, ' +
                  'IFNULL(PSC.VAL_MONT_BAPL_DCTO, 0) MONTOBASEREF, ' +
                  'PSC.PERD_OID_PERI OIDPERIODOREF, ' +
                  `TO_CHAR(PSC.FEC_FACT,'dd/MM/yyyy') FECHAFACTURACIONREF, ` +
                  'TSP.IND_COMI TIPOCOMISIONREF, ' +
                  'PSC.ZZON_OID_ZONA OIDZONAREF ' +
           'FROM sicc_corp.PED_SOLIC_CABEC PSC, ' +
                'sicc_corp.PED_TIPO_SOLIC_PAIS TSP, ' +
                'sicc_corp.PED_TIPO_SOLIC TSO ' +
           `WHERE PSC.OID_SOLI_CABE = '${oidSolicitudRef}' `+
                'AND PSC.TSPA_OID_TIPO_SOLI_PAIS = TSP.OID_TIPO_SOLI_PAIS ' +
                'AND TSP.TSOL_OID_TIPO_SOLI = TSO.OID_TIPO_SOLI ' +
                `AND PSC.ISOPAIS = '${codigoPais}' ` +
    	        `AND TSP.ISOPAIS = '${codigoPais}' ` +
    	        `AND TSO.ISOPAIS = '${codigoPais}'`;
}