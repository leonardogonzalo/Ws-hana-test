'use strict'
module.exports.statement = function(codigoPais, codigoPeriodo, oidConcurso)
{
    let filterConcursos = '';
    if(Array.isArray(oidConcurso))
    {
        if (oidConcurso.length > 0)
        {
            filterConcursos = `est.COPA_OID_PARA_GRAL IN (${oidConcurso.join()}) `;
        }
        else
        {
            filterConcursos = `est.COPA_OID_PARA_GRAL = null `;
        }
    }
    else
    {
        filterConcursos = `est.COPA_OID_PARA_GRAL = ${oidConcurso} `
    }

    let query = `SELECT est.COPA_OID_PARA_GRAL oidConcurso, ` +
                `est.ESTA_OID_ESTA_CLIE oidEstatus, ` +
                `est2.OID_ESTA_CLIE oidEstatus2, ` +
                `cor2.COD_PERI codPeriodoDesde, ` +
                `cor.COD_PERI codPeriodoHasta ` +
            `FROM sicc_corp.INC_ESTAT_VENTA_CONSU est left outer join ` +
                `(select * from sicc_corp.MAE_ESTAT_CLIEN where ISOPAIS='${codigoPais}') est2 ` +
                `on  est.ESTA_OID_ESTA_CLIE = est2.ESTA_OID_ESTA_CLIE, ` +
                `sicc_corp.CRA_PERIO cra, sicc_corp.SEG_PERIO_CORPO cor, ` +
                `sicc_corp.CRA_PERIO cra2, sicc_corp.SEG_PERIO_CORPO cor2 ` +
            `WHERE ` +
                filterConcursos +
                `AND est.PERD_OID_PERI_HAST = cra.OID_PERI ` +
                `AND cra.PERI_OID_PERI = cor.OID_PERI ` +
                `AND est.PERD_OID_PERI_DESD = cra2.OID_PERI ` +
                `AND cra2.PERI_OID_PERI = cor2.OID_PERI ` +
                `AND cor.COD_PERI <= '${codigoPeriodo}' ` +
                `and est.ISOPAIS = '${codigoPais}' ` +
                `and cra.ISOPAIS = '${codigoPais}' ` +
                `and cor.ISOPAIS = '${codigoPais}' ` +
                `and cra2.ISOPAIS = '${codigoPais}' ` +
                `and cor2.ISOPAIS = '${codigoPais}' `;

    return query;
}