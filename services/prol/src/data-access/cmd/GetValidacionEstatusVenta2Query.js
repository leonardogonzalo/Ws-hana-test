'use strict'
module.exports.statement = function(codigoPais, codigoPeriodoDesde, codigoPeriodoAnterior, oidCliente, oidEstatus)
{
    let query = `SELECT ` +  
                    `( ` +
                        `SELECT ` +
                            `COUNT(1) result ` +
                        `FROM ` +
                            `sicc_corp.MAE_CLIEN_HISTO_ESTAT his, ` +
                            `sicc_corp.CRA_PERIO cra, ` +
                            `sicc_corp.SEG_PERIO_CORPO cor ` +
                        `WHERE his.CLIE_OID_CLIE = ${oidCliente} ` +
                        `AND cra.PERI_OID_PERI = cor.OID_PERI ` +
                        `AND cra.OID_PERI = his.PERD_OID_PERI ` +
                        `AND cor.COD_PERI >= x.COD_PERI_INIC ` +
                        `AND cor.COD_PERI <= x.COD_PERI_FIN ` +
                        `AND his.ESTA_OID_ESTA_CLIE = ${oidEstatus} ` +
                        `AND his.ISOPAIS = '${codigoPais}' ` +
                        `AND cra.ISOPAIS = '${codigoPais}' ` +
                        `AND cor.ISOPAIS = '${codigoPais}' ` +
                    `) result ` +
                `FROM ` +
                `( ` +
                    `SELECT ` +
                        `IFNULL(` +
                            `( ` +
                                `SELECT cor.COD_PERI ` +
                                `FROM ` +
                                    `sicc_corp.MAE_CLIEN_HISTO_ESTAT his, ` +
                                    `sicc_corp.CRA_PERIO cra, ` +
                                    `sicc_corp.SEG_PERIO_CORPO       cor ` +
                                `WHERE his.CLIE_OID_CLIE = ${oidCliente} ` +
                                `AND cra.PERI_OID_PERI = cor.OID_PERI ` +
                                `AND cra.OID_PERI = his.PERD_OID_PERI ` +
                                `AND his.ISOPAIS = '${codigoPais}'  ` +
                                `AND cra.ISOPAIS = '${codigoPais}'  ` +
                                `AND cor.ISOPAIS = '${codigoPais}' ` +                             
                                `AND ( ` +
                                        `( ` +
                                            `cor.COD_PERI <= '${codigoPeriodoDesde}' ` +
                                            `AND '${codigoPeriodoDesde}' <= ` +
                                            `"SICC_CORP"."belcorp.ods.corp.funciones::FIN_FN_OBTIE_COD_PERIO"('${codigoPais}', his.PERD_OID_PERI_PERI_FIN) ` +
                                        `) ` +
                                        `OR ` +
                                        `( ` +
                                            `cor.COD_PERI <= '${codigoPeriodoDesde}' ` +
                                            `AND his.PERD_OID_PERI_PERI_FIN IS NULL` +
                                        `) ` + 
                                    `) ` + 
                            `) ` +
                        `, '${codigoPeriodoDesde}') COD_PERI_INIC, ` +
                        `( ` +
                            `SELECT cor.COD_PERI ` +
                            `FROM sicc_corp.MAE_CLIEN_HISTO_ESTAT his, ` +
                                `sicc_corp.CRA_PERIO cra, ` +
                                `sicc_corp.SEG_PERIO_CORPO cor ` +
                            `WHERE his.CLIE_OID_CLIE = ${oidCliente} ` +
                                `AND cra.PERI_OID_PERI = cor.OID_PERI ` +
                                `AND cra.OID_PERI = his.PERD_OID_PERI ` +
                                `AND his.ISOPAIS = '${codigoPais}' ` +
                                `AND cra.ISOPAIS = '${codigoPais}' ` +
                                `AND cor.ISOPAIS = '${codigoPais}' ` +                                
                                `AND ` +
                                `( ` +
                                    `( ` + 
                                        `cor.COD_PERI <= '${codigoPeriodoAnterior}' ` +
                                        `AND '${codigoPeriodoAnterior}' <= ` +
                                            `"SICC_CORP"."belcorp.ods.corp.funciones::FIN_FN_OBTIE_COD_PERIO"('${codigoPais}', his.PERD_OID_PERI_PERI_FIN) ` +
                                    `) ` +                                             
                                    `OR ` +
                                    `( ` +
                                        `cor.COD_PERI <= '${codigoPeriodoAnterior}' ` +
                                        `AND his.PERD_OID_PERI_PERI_FIN IS NULL ` +
                                    `) ` +  
                                `) ` +               
                        `) COD_PERI_FIN ` +
                    `FROM DUMMY ` +
                `) x `;

    return query;    
}