'use strict'
module.exports.statement = function(codigoPais, codigoPeriodo, oidCliente, oidEstatus, oidEstatus2)
{
    let query =  `SELECT COUNT(1) result ` +
            `FROM sicc_corp.MAE_CLIEN_HISTO_ESTAT his, ` +
                `sicc_corp.CRA_PERIO             cra, ` +
                `sicc_corp.SEG_PERIO_CORPO       cor ` +
            `WHERE his.CLIE_OID_CLIE =  ${oidCliente} ` +
                `AND cra.PERI_OID_PERI = cor.OID_PERI ` +
                `AND cra.OID_PERI = his.PERD_OID_PERI ` +
                `AND ((cor.COD_PERI < '${codigoPeriodo}' AND ` +
                    `his.PERD_OID_PERI_PERI_FIN IS NULL AND his.ESTA_OID_ESTA_CLIE = ${oidEstatus2}) ` +
                    `OR ` +
                    `(cor.COD_PERI = '${codigoPeriodo}' AND ` +
                    `his.ESTA_OID_ESTA_CLIE IN (${oidEstatus},${oidEstatus2})) ` +
                    `) ` +
                `and his.ISOPAIS = '${codigoPais}' `  +
                `and cra.ISOPAIS = '${codigoPais}' ` +
                `and cor.ISOPAIS = '${codigoPais}' `;
    return query;    
}