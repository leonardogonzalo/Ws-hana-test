'use strict'
module.exports.statement = function(codigoPais, oidCliente, oidConcurso)
{
    let filterConcursos = '';
    if(Array.isArray(oidConcurso))
    {
        if (oidConcurso.length > 0)
        {
            filterConcursos = `A.COPA_OID_PARA_GRAL IN (${oidConcurso.join()}) `
        }
        else
        {
            filterConcursos = `A.COPA_OID_PARA_GRAL = null `
        }
    }
    else
    {
        filterConcursos = `A.COPA_OID_PARA_GRAL = ${oidConcurso} `
    }

    let query = 'SELECT C.COPA_OID_PARA_GRAL oidConcurso, COUNT(1) AS contador, ' +
                'ifnull(SUM(c.IND_EXCL),0) AS contadorExclusion ' +
            'FROM sicc_corp.MAE_CLIEN_CLASI X, sicc_corp.MAE_CLIEN_TIPO_SUBTI Y, ' +
                '(SELECT A.COPA_OID_PARA_GRAL, ' +
                        'C.CLAS_OID_CLAS, ' +
                        'C.TCCL_OID_TIPO_CLAS, ' +
                        'c.TICL_OID_TIPO_CLIE, ' +
                        'c.SBTI_OID_SUBT_CLIE, ' +
                        'ifnull(A.IND_EXCL, 0) IND_EXCL ' +
                'FROM sicc_corp.INC_CLASI_PARTI_CONCU A, ' +
                    'sicc_corp.INC_PARTI_CONCU_CABEC B, ' +
                    'sicc_corp.INC_PARTI_CONCU_DETAL C ' +
                `WHERE ` +
                    filterConcursos +
                    'AND B.OID_PART_CONC_CABE = A.PACI_OID_PART_CONC_CABE ' +
                    'AND C.PACI_OID_PART_CONC_CABE = B.OID_PART_CONC_CABE ' +
                    `AND A.ISOPAIS = '${codigoPais}' ` +
                    `AND B.ISOPAIS = '${codigoPais}' ` +
                    `AND C.ISOPAIS = '${codigoPais}' ` +
                ') c  ' +
            'WHERE X.CTSU_OID_CLIE_TIPO_SUBT = Y.OID_CLIE_TIPO_SUBT ' +
                `AND Y.CLIE_OID_CLIE = ${oidCliente} ` +
                `AND Y.IND_PPAL = '1' ` +
                'AND (c.CLAS_OID_CLAS IS NULL OR ' +
                    'X.CLAS_OID_CLAS = c.CLAS_OID_CLAS) ' +
                'AND (c.TCCL_OID_TIPO_CLAS IS NULL OR ' +
                    'X.TCCL_OID_TIPO_CLASI = c.TCCL_OID_TIPO_CLAS) ' +
                'AND (c.TICL_OID_TIPO_CLIE IS NULL OR ' +
                    'Y.TICL_OID_TIPO_CLIE = c.TICL_OID_TIPO_CLIE) ' +
                'AND (c.SBTI_OID_SUBT_CLIE IS NULL OR ' +
                    'Y.SBTI_OID_SUBT_CLIE = c.SBTI_OID_SUBT_CLIE)   ' +
                `AND X.ISOPAIS = '${codigoPais}' ` +
                `AND Y.ISOPAIS = '${codigoPais}' ` +
                'GROUP BY C.COPA_OID_PARA_GRAL';
    return query;
}