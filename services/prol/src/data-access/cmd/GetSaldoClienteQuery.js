'use strict'
module.exports.statement = function(codigoPais, codigoCliente)
{
    return    'SELECT CASE WHEN saldo < 0 THEN 0 ELSE saldo END SALDO ' +
              'FROM (SELECT s1 + s2 - s3 saldo ' +
                    'FROM (SELECT IFNULL((SELECT SUM(mcc.imp_pend) ' +
                                         'FROM sicc_corp.ccc_movim_cuent_corri mcc, ' +
                                              'sicc_corp.cra_perio cp, ' +
                                              'sicc_corp.seg_perio_corpo spc ' +
                                         `WHERE mcc.clie_oid_clie = '${codigoCliente}' ` +
                                            'AND mcc.perd_oid_peri = cp.oid_peri ' +
                                            'AND spc.oid_peri = cp.peri_oid_peri ' +
                                            'AND (SELECT bcf.fec_proc ' +
                                                 'FROM sicc_corp.bas_ctrl_fact bcf ' +
                                                 'WHERE bcf.ind_camp_act = 1 ' +
                                                    'AND bcf.sta_camp = 0 ' +
                                                    `AND bcf.ISOPAIS = '${codigoPais}') >= mcc.fec_venc ` +
                                            'AND mcc.imp_pend <> 0 ' +
                                            `AND mcc.ISOPAIS = '${codigoPais}' ` +
                                            `AND cp.ISOPAIS = '${codigoPais}' ` +
                                            `AND spc.ISOPAIS = '${codigoPais}'), 0) s1, ` +
                                 'IFNULL((SELECT SUM(mb.imp_sald_pend) ' +
                                         'FROM sicc_corp.ccc_movim_banca mb ' +
                                         `WHERE mb.clie_oid_clie = '${codigoCliente}' ` +
                                            `AND mb.cod_iden_proc = 'P' ` +
                                            'AND mb.imp_sald_pend > 0 '+
                                            `AND mb.ISOPAIS = '${codigoPais}'), 0) s2, ` +
                                 '0 s3 ' +
                          'FROM dummy)'+ 
                   ')';
}