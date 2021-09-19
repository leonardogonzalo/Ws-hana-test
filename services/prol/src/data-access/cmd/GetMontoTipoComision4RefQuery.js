module.exports.statement = function(codigoPais, oidSolicitud) {
    return 'SELECT IFNULL(SUM(B.VAL_PREC_CATA_UNIT_LOCA * B.NUM_UNID_DEMA_REAL),0) MONTO ' + 
           'FROM sicc_corp.PED_SOLIC_POSIC B, ' +
                'sicc_corp.PRE_OFERT_DETAL C, ' + 
                'sicc_corp.PRE_TIPO_OFERT D ' +
           `WHERE B.SOCA_OID_SOLI_CABE = '${oidSolicitud}' ` +
                'AND B.ESPO_OID_ESTA_POSI <> 2 ' +
                'AND D.IND_APOR_MONT_ESCA = 1 ' +
                `AND B.ISOPAIS = '${codigoPais}' ` +
                `AND C.ISOPAIS = '${codigoPais}' ` +
                `AND D.ISOPAIS = '${codigoPais}'`;
}