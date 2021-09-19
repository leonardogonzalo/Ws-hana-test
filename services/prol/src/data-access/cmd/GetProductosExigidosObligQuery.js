'use strict'
module.exports.statement = function(codigoPais, codigoPeriodo,
                                    oidConcurso, oidProducto, 
                                    oidTipoOferta, oidMarcaProducto,
                                    oidNegocio, oidUnidadNegocio,
                                    oidGenerico, oidSuperGenerico,
                                    oidDetalleOferta)
{
    return  `SELECT LINEA ` +
            `FROM  (SELECT (SELECT cor2.COD_PERI ` +
                            `FROM sicc_Corp.CRA_PERIO cra2, sicc_Corp.SEG_PERIO_CORPO cor2 ` +
                            `WHERE cra2.PERI_OID_PERI = cor2.OID_PERI ` +
                                `AND cra2.OID_PERI = exi.PERD_OID_PERI_DESD ` +
                                `AND cra2.ISOPAIS = '${codigoPais}' ` +
                                `AND cor2.ISOPAIS = '${codigoPais}') COD_PERI_DESD, ` +
                        `(SELECT cor2.COD_PERI ` +
                            `FROM sicc_Corp.CRA_PERIO cra2, sicc_Corp.SEG_PERIO_CORPO cor2 ` +
                            `WHERE cra2.PERI_OID_PERI = cor2.OID_PERI ` +
                                `AND cra2.OID_PERI = exi.PERD_OID_PERI_HAST ` +
                                `AND cra2.ISOPAIS = '${codigoPais}' ` +
                                `AND cor2.ISOPAIS = '${codigoPais}') COD_PERI_FIN, ` +
                        `MAP(PROD_OID_PROD, NULL, '', 'A' || TO_CHAR(PROD_OID_PROD)) || ` +
                        `MAP(TOFE_OID_TIPO_OFER, ` +
                                `NULL, ` +
                                `'', ` +
                                `'B' || TO_CHAR(TOFE_OID_TIPO_OFER)) || ` +
                        `MAP(MAPR_OID_MARC_PROD, ` +
                                `NULL, ` +
                                `'', ` +
                                `'C' || TO_CHAR(MAPR_OID_MARC_PROD)) || ` +
                        `MAP(NEGO_OID_NEGO, NULL, '', 'D' || TO_CHAR(NEGO_O ID_NEGO)) || ` +
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
                                `'H' || TO_CHAR(OFDE_OID_DETA_OFER)) AS LINEA, ` +
                        `MAP(PROD_OID_PROD, NULL, '', 'A' || TO_CHAR(${oidProducto})) || ` +
                        `MAP(TOFE_OID_TIPO_OFER, NULL, '', 'B' || TO_CHAR(${oidTipoOferta})) || ` +
                        `MAP(MAPR_OID_MARC_PROD, NULL, '', 'C' || TO_CHAR(${oidMarcaProducto})) || ` +
                        `MAP(NEGO_OID_NEGO, NULL, '', 'D' || TO_CHAR(${oidNegocio})) || ` +
                        `MAP(UNEG_OID_UNID_NEGO, NULL, '', 'E' || TO_CHAR(${oidUnidadNegocio})) || ` +
                        `MAP(GENE_OID_GENE, NULL, '', 'F' || TO_CHAR(${oidGenerico})) || ` +
                        `MAP(SGEN_OID_SUPE_GENE, NULL, '', 'G' || TO_CHAR(${oidSuperGenerico})) || ` +
                        `MAP(OFDE_OID_DETA_OFER, NULL, '', 'H' || TO_CHAR(${oidDetalleOferta})) AS LINEA_POS ` +
                    `FROM sicc_Corp.INC_PRODU pro, sicc_Corp.INC_PRODU_EXIGI exi ` +
                    `WHERE pro.OID_PROD = exi.PRDU_OID_PROD ` +
                        `AND pro.COPA_OID_PARA_GRAL = ${oidConcurso} ` +
                        `AND IFNULL(exi.IND_AGRUP, 'U') = 'T' ` +
                        `AND pro.ISOPAIS = '${codigoPais}' ` +
                        `AND exi.ISOPAIS = '${codigoPais}') ` +
            `WHERE LINEA = LINEA_POS ` +
                `AND COD_PERI_DESD <= '${codigoPeriodo}' ` +
                `AND '${codigoPeriodo}' <= COD_PERI_FIN `;
}