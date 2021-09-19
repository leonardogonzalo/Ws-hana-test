module.exports.statement = function(codigoPais, oidSolicitud){
    return 'SELECT PSP1.SOCA_OID_SOLI_CABE OIDSOLICITUDREF' +
           'FROM sicc_corp.PED_SOLIC_POSIC PSP, ' +
                'sicc_corp.REC_LINEA_OPERA_RECLA RLO, ' +
                'sicc_corp.REC_LINEA_OPERA_RECLA RLO1, ' +
                'sicc_corp.PED_SOLIC_POSIC PSP1 ' +
           'WHERE PSP.OID_LINE_OPER_RECL = RLO.OID_LINE_OPER_RECL ' +
                'AND RLO.OPRE_OID_OPER_RECL = RLO1.OPRE_OID_OPER_RECL ' +
                'AND RLO1.SOPO_OID_SOLI_POSI = PSP1.OID_SOLI_POSI ' +
                `AND PSP.SOCA_OID_SOLI_CABE = '${oidSolicitud}' ` +
                'AND ROWNUM = 1 ' +
                `AND PSP.ISOPAIS = '${codigoPais}' `
                `AND RLO.ISOPAIS = '${codigoPais}' `
                `AND RLO1.ISOPAIS = '${codigoPais}' `
                `AND PSP1.ISOPAIS = '${codigoPais}'`;
}