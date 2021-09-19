'use strict'
module.exports.statement = function(codigoPais, 
                                    codigoPeriodoInicio, codigoPeriodoAnterior, 
                                    oidCliente, oidConcurso)
{
    return  'SELECT (SELECT COUNT(DISTINCT perd_oid_peri) ' +
                    'FROM sicc_corp.inc_solic_concu_punta inc, sicc_corp.CRA_PERIO a, sicc_corp.SEG_PERIO_CORPO b ' +
                    'WHERE a.PERI_OID_PERI = b.OID_PERI ' +
                        'and a.oid_peri = inc.perd_oid_peri ' +
                        `AND inc.copa_oid_para_gral = ${oidConcurso} ` +
                        `AND inc.clie_oid_clie = ${oidCliente} ` +
                        'AND inc.ind_anul = 0 ' +
                        'AND inc.imp_mont > 0 ' +
                        `AND b.cod_peri BETWEEN '${codigoPeriodoInicio}' AND '${codigoPeriodoAnterior}' ` +
                        `and inc.ISOPAIS = '${codigoPais}' ` +
                        `and a.ISOPAIS = '${codigoPais}' ` +
                        `and b.ISOPAIS = '${codigoPais}' ` +
                        ') numPeriodosConcurso, ' +
                    '(SELECT COUNT(1) ' +
                    'FROM sicc_corp.CRA_PERIO A, sicc_corp.SEG_PERIO_CORPO B ' +
                    'WHERE A.PERI_OID_PERI = B.OID_PERI ' +
                        'AND A.VAL_ESTA = 1 ' +
                        `AND B.COD_PERI BETWEEN '${codigoPeriodoInicio}' AND '${codigoPeriodoAnterior}' ` +
                        `and A.ISOPAIS = '${codigoPais}' ` +
                        `and B.ISOPAIS = '${codigoPais}' ` +
                        ') numPeriodos ' +
            'FROM DUMMY ';
}