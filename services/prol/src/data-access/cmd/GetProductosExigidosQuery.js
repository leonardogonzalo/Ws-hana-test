'use strict'
module.exports.statement = function(codigoPais, oidConcurso)
{
    return 'SELECT '
                `MAP(PROD_OID_PROD, NULL, '', 'A' || TO_CHAR(PROD_OID_PROD)) || ` +
                `MAP(TOFE_OID_TIPO_OFER, ` +
                `NULL, ` +
                `'', ` +
                `'B' || TO_CHAR(TOFE_OID_TIPO_OFER)) || ` +
                `MAP(MAPR_OID_MARC_PROD, ` +
                `NULL, ` +
                `'', ` +
                `'C' || TO_CHAR(MAPR_OID_MARC_PROD)) || ` +
                `MAP(NEGO_OID_NEGO, NULL, '', 'D' || TO_CHAR(NEGO_OID_NEGO)) || ` +
                `MAP(UNEG_OID_UNID_NEGO, ` +
                `NULL, ` +
                `'', ` +
                `'E' || TO_CHAR(UNEG_OID_UNID_NEGO)) || ` +
                `MAP(GENE_OID_GENE, NULL, '', 'F' || TO_CHAR(GENE_OID_GENE)) || ` +
                `MAP(SGEN_OID_SUPE_GENE, ` +
                `NULL, ` +
                `'', ` +
                `'G' || TO_CHAR(SGEN_OID_SUPE_GENE)) || ` +
                `MAP(OFDE_OID_DETA_OFER, ` +
                `NULL, ` +
                `'', ` +
                `'H' || TO_CHAR(OFDE_OID_DETA_OFER)) AS linea, ` +
                `0 total ` +
            `FROM sicc_Corp.INC_PRODU pro, sicc_Corp.INC_PRODU_EXIGI exi ` +
            `WHERE pro.OID_PROD = exi.PRDU_OID_PROD ` +
                `AND pro.COPA_OID_PARA_GRAL = ${oidConcurso} ` +
                `AND pro.ISOPAIS = '${codigoPais}' ` +
                `AND exi.ISOPAIS = '${codigoPais}' `;
}