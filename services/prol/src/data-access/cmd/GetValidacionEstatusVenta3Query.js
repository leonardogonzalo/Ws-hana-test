'use strict'
module.exports.statement = function(codigoPais, codigoPeriodoAnterior, oidCliente, oidEstatus2)
{
    let query =	`SELECT COUNT(1) result ` +
            `FROM sicc_corp.MAE_CLIEN_HISTO_ESTAT his, ` +
                `sicc_corp.CRA_PERIO             cra, ` +
                `sicc_corp.SEG_PERIO_CORPO       cor ` +
            `WHERE his.CLIE_OID_CLIE = ${oidCliente} ` +
                `AND cra.PERI_OID_PERI = cor.OID_PERI ` +
                `AND cra.OID_PERI = his.PERD_OID_PERI ` +
                `AND ( ` +
                        `( ` +
                            `cor.COD_PERI < '${codigoPeriodoAnterior}' ` +
                            `AND his.PERD_OID_PERI_PERI_FIN IS NULL ` +
                        `) ` +
                        `OR (cor.COD_PERI = '${codigoPeriodoAnterior}') ` +
                        `OR ` +
                        `( ` +
                            `"SICC_CORP"."belcorp.ods.corp.funciones::FIN_FN_OBTIE_COD_PERIO"('${codigoPais}', his.PERD_OID_PERI_PERI_FIN) ` +
                            ` = '${codigoPeriodoAnterior}' ` +
                        `) ` +
                    `) ` +
                    `AND his.ESTA_OID_ESTA_CLIE = ${oidEstatus2} ` +
                    `and his.ISOPAIS = '${codigoPais}' ` +
                    `and cra.ISOPAIS = '${codigoPais}' ` +
                    `and cor.ISOPAIS = '${codigoPais}' `;
    return query;
}