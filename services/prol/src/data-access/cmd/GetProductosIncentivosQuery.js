'use strict'
module.exports.statement = function(codigoPais, codigoPeriodo, oidConcurso, cuvs)
{
    let query = `SELECT c.VAL_CODI_VENT cuv, ` +
                `c.PRECIO_UNITARIO precioUnitario, ` +
                `d.OID_PROD  oidProducto, ` +
                `g.OID_TIPO_OFER idTipoOferta, ` +
                `d.MAPR_OID_MARC_PROD oidMarcaProducto, ` +
                `d.NEGO_OID_NEGO oidNegocio, ` +
                `d.UNEG_OID_UNID_NEGO oidUnidadNegocio, ` +
                `d.GENE_OID_GENE oidGenerico, ` +
                `d.SGEN_OID_SUPE_GENE oidSuperGenerico, ` +
                `c.OID_DETA_OFER oidDetalleOferta, ` +
                `( SELECT COUNT(1) ` +
                `FROM (SELECT MAP(PROD_OID_PROD, NULL, '', 'A' || TO_CHAR(PROD_OID_PROD)) || ` +
                            `MAP(TOFE_OID_TIPO_OFER, NULL, '', 'B' || TO_CHAR(TOFE_OID_TIPO_OFER)) || ` +
                            `MAP(MAPR_OID_MARC_PROD, NULL, '', 'C' || TO_CHAR(MAPR_OID_MARC_PROD)) || ` +
                            `MAP(NEGO_OID_NEGO, NULL, '', 'D' || TO_CHAR(NEGO_OID_NEGO)) || ` +
                            `MAP(UNEG_OID_UNID_NEGO, NULL, '', 'E' || TO_CHAR(UNEG_OID_UNID_NEGO)) || ` +
                            `MAP(GENE_OID_GENE, NULL, '', 'F' || TO_CHAR(GENE_OID_GENE)) || ` +
                            `MAP(SGEN_OID_SUPE_GENE, NULL, '', 'G' || TO_CHAR(SGEN_OID_SUPE_GENE)) || ` +
                            `MAP(OFDE_OID_DETA_OFER, NULL, '', 'H' || TO_CHAR(OFDE_OID_DETA_OFER)) AS LINEA, ` +
                            `MAP(PROD_OID_PROD, NULL, '', 'A' || TO_CHAR(d.OID_PROD)) || ` +
                            `MAP(TOFE_OID_TIPO_OFER, NULL, '', 'B' || TO_CHAR(g.OID_TIPO_OFER)) || ` +
                            `MAP(MAPR_OID_MARC_PROD, NULL, '', 'C' || TO_CHAR(d.MAPR_OID_MARC_PROD)) || ` +
                            `MAP(NEGO_OID_NEGO, NULL, '', 'D' || TO_CHAR(d.NEGO_OID_NEGO)) || ` +
                            `MAP(UNEG_OID_UNID_NEGO, NULL, '', 'E' || TO_CHAR(d.UNEG_OID_UNID_NEGO)) || ` +
                            `MAP(GENE_OID_GENE, NULL, '', 'F' || TO_CHAR(d.GENE_OID_GENE)) || ` +
                            `MAP(SGEN_OID_SUPE_GENE, NULL, '', 'G' || TO_CHAR(d.SGEN_OID_SUPE_GENE)) || ` +
                            `MAP(OFDE_OID_DETA_OFER, NULL, '', 'H' || TO_CHAR(c.OID_DETA_OFER)) AS LINEA_POS ` +
                        `FROM sicc_Corp.INC_PRODU pro, sicc_Corp.INC_PRODU_VALID val ` +
                        `WHERE pro.OID_PROD = val.PRDU_OID_PROD ` +
                                `AND pro.COPA_OID_PARA_GRAL = ${oidConcurso} ` +
                                `AND pro.ISOPAIS = '${codigoPais}' ` +
                                `AND val.ISOPAIS = '${codigoPais}') ` +
                `WHERE LINEA = LINEA_POS) valProdVali, ` +
                `( SELECT COUNT(1) ` +
                `FROM (SELECT (SELECT cor2.COD_PERI ` +
                                `FROM sicc_Corp.CRA_PERIO cra2, sicc_Corp.SEG_PERIO_CORPO cor2 ` +
                                `WHERE cra2.PERI_OID_PERI = cor2.OID_PERI ` +
                                    `AND cra2.OID_PERI = exc.PERD_OID_PERI_DESD ` +
                                    `AND cra2.ISOPAIS = '${codigoPais}' ` +
                                    `AND cor2.ISOPAIS = '${codigoPais}') COD_PERI_DESD, ` +
                            `(SELECT cor2.COD_PERI ` +
                            `FROM sicc_Corp.CRA_PERIO cra2, sicc_Corp.SEG_PERIO_CORPO cor2 ` +
                            `WHERE cra2.PERI_OID_PERI = cor2.OID_PERI ` +
                                `AND cra2.OID_PERI = exc.PERD_OID_PERI_HAST ` +
                                `AND cra2.ISOPAIS = '${codigoPais}' ` +
                                `AND cor2.ISOPAIS = '${codigoPais}') COD_PERI_FIN, ` +
                            `MAP(PROD_OID_PROD, NULL, '', 'A' || TO_CHAR(PROD_OID_PROD)) || ` +
                            `MAP(TOFE_OID_TIPO_OFER, NULL, '', 'B' || TO_CHAR(TOFE_OID_TIPO_OFER)) || ` +
                            `MAP(MAPR_OID_MARC_PROD, NULL, '', 'C' || TO_CHAR(MAPR_OID_MARC_PROD)) || ` +
                            `MAP(NEGO_OID_NEGO, NULL, '', 'D' || TO_CHAR(NEGO_OID_NEGO)) || ` +
                            `MAP(UNEG_OID_UNID_NEGO, NULL, '', 'E' || TO_CHAR(UNEG_OID_UNID_NEGO)) || ` +
                            `MAP(GENE_OID_GENE, NULL, '', 'F' || TO_CHAR(GENE_OID_GENE)) || ` +
                            `MAP(SGEN_OID_SUPE_GENE, NULL, '', 'G' || TO_CHAR(SGEN_OID_SUPE_GENE)) || ` +
                            `MAP(OFDE_OID_DETA_OFER, NULL, '', 'H' || TO_CHAR(OFDE_OID_DETA_OFER)) AS LINEA, ` +
                            `MAP(PROD_OID_PROD, NULL, '', 'A' || TO_CHAR(d.OID_PROD)) || ` +
                            `MAP(TOFE_OID_TIPO_OFER, NULL, '', 'B' || TO_CHAR(g.OID_TIPO_OFER)) || ` +
                            `MAP(MAPR_OID_MARC_PROD, NULL, '', 'C' || TO_CHAR(d.MAPR_OID_MARC_PROD)) || ` +
                            `MAP(NEGO_OID_NEGO, NULL, '', 'D' || TO_CHAR(d.NEGO_OID_NEGO)) || ` +
                            `MAP(UNEG_OID_UNID_NEGO, NULL, '', 'E' || TO_CHAR(d.UNEG_OID_UNID_NEGO)) || ` +
                            `MAP(GENE_OID_GENE, NULL, '', 'F' || TO_CHAR(d.GENE_OID_GENE)) || ` +
                            `MAP(SGEN_OID_SUPE_GENE, NULL, '', 'G' || TO_CHAR(d.SGEN_OID_SUPE_GENE)) || ` +
                            `MAP(OFDE_OID_DETA_OFER, NULL, '', 'H' || TO_CHAR(c.OID_DETA_OFER)) AS LINEA_POS ` +
                        `FROM sicc_Corp.INC_PRODU pro, sicc_Corp.INC_PRODU_EXCLU exc ` +
                        `WHERE pro.OID_PROD = exc.PRDU_OID_PROD ` +
                            `AND pro.COPA_OID_PARA_GRAL = ${oidConcurso} ` +
                            `AND pro.ISOPAIS = '${codigoPais}' ` +
                            `AND exc.ISOPAIS = '${codigoPais}') ` +
                    `WHERE LINEA = LINEA_POS ` +
                        `AND COD_PERI_DESD <= '${codigoPeriodo}' ` +
                        `AND '${codigoPeriodo}' <= COD_PERI_FIN) valProdExcl, ` +
                `( SELECT COUNT(1) ` +
                `FROM (SELECT (SELECT cor2.COD_PERI ` +
                `FROM sicc_Corp.CRA_PERIO cra2, sicc_Corp.SEG_PERIO_CORPO cor2 ` +
                `WHERE cra2.PERI_OID_PERI = cor2.OID_PERI ` +
                    `AND cra2.OID_PERI = bon.PERD_OID_PERI_DESD ` +
                    `AND cra2.ISOPAIS = '${codigoPais}' ` +
                    `AND cor2.ISOPAIS = '${codigoPais}') COD_PERI_DESD, ` +
                `(SELECT cor2.COD_PERI ` +
                `FROM sicc_Corp.CRA_PERIO cra2, sicc_Corp.SEG_PERIO_CORPO cor2 ` +
                `WHERE cra2.PERI_OID_PERI = cor2.OID_PERI ` +
                    `AND cra2.OID_PERI = bon.PERD_OID_PERI_HAST ` +
                    `AND cra2.ISOPAIS = '${codigoPais}' ` +
                    `AND cor2.ISOPAIS = '${codigoPais}') COD_PERI_FIN, ` +
                `MAP(PROD_OID_PROD, NULL, '', 'A' || TO_CHAR(PROD_OID_PROD)) || ` +
                `MAP(TOFE_OID_TIPO_OFER, NULL, '', 'B' || TO_CHAR(TOFE_OID_TIPO_OFER)) || ` +
                `MAP(MAPR_OID_MARC_PROD, NULL, '', 'C' || TO_CHAR(MAPR_OID_MARC_PROD)) || ` +
                `MAP(NEGO_OID_NEGO, NULL, '', 'D' || TO_CHAR(NEGO_OID_NEGO)) || ` +
                `MAP(UNEG_OID_UNID_NEGO, NULL, '', 'E' || TO_CHAR(UNEG_OID_UNID_NEGO)) || ` +
                `MAP(GENE_OID_GENE, NULL, '', 'F' || TO_CHAR(GENE_OID_GENE)) || ` +
                `MAP(SGEN_OID_SUPE_GENE, NULL, '', 'G' || TO_CHAR(SGEN_OID_SUPE_GENE)) || ` +
                `MAP(OFDE_OID_DETA_OFER, NULL, '', 'H' || TO_CHAR(OFDE_OID_DETA_OFER)) AS LINEA, ` +
                `MAP(PROD_OID_PROD, NULL, '', 'A' || TO_CHAR(d.OID_PROD)) || ` +
                `MAP(TOFE_OID_TIPO_OFER, NULL, '', 'B' || TO_CHAR(g.OID_TIPO_OFER)) || ` +
                `MAP(MAPR_OID_MARC_PROD, NULL, '', 'C' || TO_CHAR(d.MAPR_OID_MARC_PROD)) || ` +
                `MAP(NEGO_OID_NEGO, NULL, '', 'D' || TO_CHAR(d.NEGO_OID_NEGO)) || ` +
                `MAP(UNEG_OID_UNID_NEGO, NULL, '', 'E' || TO_CHAR(d.UNEG_OID_UNID_NEGO)) || ` +
                `MAP(GENE_OID_GENE, NULL, '', 'F' || TO_CHAR(d.GENE_OID_GENE)) || ` +
                `MAP(SGEN_OID_SUPE_GENE, NULL, '', 'G' || TO_CHAR(d.SGEN_OID_SUPE_GENE)) || ` +
                `MAP(OFDE_OID_DETA_OFER, NULL, '', 'H' || TO_CHAR(c.OID_DETA_OFER)) AS LINEA_POS ` +
                `FROM sicc_Corp.INC_PRODU pro, sicc_Corp.INC_PRODU_BONIF bon ` +
               `WHERE pro.OID_PROD = bon.PRDU_OID_PROD ` +
               `AND pro.COPA_OID_PARA_GRAL = ${oidConcurso} ` +
                `AND pro.ISOPAIS = '${codigoPais}' ` +
                `AND bon.ISOPAIS = '${codigoPais}') ` +
                `WHERE LINEA = LINEA_POS ` +
                `AND COD_PERI_DESD <= '${codigoPeriodo}' ` +
                `AND '${codigoPeriodo}' <= COD_PERI_FIN) valProdBoni, ` +
            `( SELECT COUNT(1) ` +
            `FROM (SELECT (SELECT cor2.COD_PERI ` +
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
            `MAP(TOFE_OID_TIPO_OFER, NULL, '', 'B' || TO_CHAR(TOFE_OID_TIPO_OFER)) || ` +
            `MAP(MAPR_OID_MARC_PROD, NULL, '', 'C' || TO_CHAR(MAPR_OID_MARC_PROD)) || ` +
            `MAP(NEGO_OID_NEGO, NULL, '', 'D' || TO_CHAR(NEGO_OID_NEGO)) || ` +
            `MAP(UNEG_OID_UNID_NEGO, NULL, '', 'E' || TO_CHAR(UNEG_OID_UNID_NEGO)) || ` +
            `MAP(GENE_OID_GENE, NULL, '', 'F' || TO_CHAR(GENE_OID_GENE)) || ` +
            `MAP(SGEN_OID_SUPE_GENE, NULL, '', 'G' || TO_CHAR(SGEN_OID_SUPE_GENE)) || ` +
            `MAP(OFDE_OID_DETA_OFER, NULL, '', 'H' || TO_CHAR(OFDE_OID_DETA_OFER)) AS LINEA, ` +
            `MAP(PROD_OID_PROD, NULL, '', 'A' || TO_CHAR(d.OID_PROD)) || ` +
            `MAP(TOFE_OID_TIPO_OFER, NULL, '', 'B' || TO_CHAR(g.OID_TIPO_OFER)) || ` +
            `MAP(MAPR_OID_MARC_PROD, NULL, '', 'C' || TO_CHAR(d.MAPR_OID_MARC_PROD)) || ` +
            `MAP(NEGO_OID_NEGO, NULL, '', 'D' || TO_CHAR(d.NEGO_OID_NEGO)) || ` +
            `MAP(UNEG_OID_UNID_NEGO, NULL, '', 'E' || TO_CHAR(d.UNEG_OID_UNID_NEGO)) || ` +
            `MAP(GENE_OID_GENE, NULL, '', 'F' || TO_CHAR(d.GENE_OID_GENE)) || ` +
            `MAP(SGEN_OID_SUPE_GENE, NULL, '', 'G' || TO_CHAR(d.SGEN_OID_SUPE_GENE)) || ` +
            `MAP(OFDE_OID_DETA_OFER, NULL, '', 'H' || TO_CHAR(c.OID_DETA_OFER)) AS LINEA_POS ` +
            `FROM sicc_Corp.INC_PRODU pro, sicc_Corp.INC_PRODU_EXIGI exi ` +
            `WHERE pro.OID_PROD = exi.PRDU_OID_PROD ` +
                `AND pro.COPA_OID_PARA_GRAL = ${oidConcurso} ` +
                `AND pro.ISOPAIS = '${codigoPais}' ` +
                `AND exi.ISOPAIS = '${codigoPais}') ` +
        `WHERE LINEA = LINEA_POS ` +
            `AND COD_PERI_DESD <= '${codigoPeriodo}' ` +
            `AND '${codigoPeriodo}' <= COD_PERI_FIN) valProdExig ` +
       `FROM sicc_Corp.pre_matri_factu_cabec a, ` +
            `sicc_Corp.pre_ofert             b, ` +
            `sicc_Corp.pre_ofert_detal       c, ` +
            `sicc_Corp.mae_produ             d, ` +
            `sicc_Corp.pre_matri_factu       e, ` +
            `sicc_Corp.pre_tipo_ofert        g, ` +
            `sicc_Corp.cra_perio             i, ` +
            `sicc_Corp.seg_perio_corpo       j ` +
        `WHERE a.oid_cabe = b.mfca_oid_cabe ` +
            `AND b.oid_ofer = c.ofer_oid_ofer ` +
            `AND c.prod_oid_prod = d.oid_prod ` +
            `AND c.oid_deta_ofer = e.ofde_oid_deta_ofer ` +
            `AND e.mfca_oid_cabe = a.oid_cabe ` +
            `AND g.oid_tipo_ofer = c.tofe_oid_tipo_ofer ` +
            `AND a.perd_oid_peri = i.oid_peri ` +
            `AND i.peri_oid_peri = j.oid_peri ` +
            `AND j.cod_peri = '${codigoPeriodo}' ` +
            `AND c.val_codi_vent IN ('${cuvs.join("', '")}') ` +
            `AND a.ISOPAIS = '${codigoPais}' ` +
            `AND b.ISOPAIS = '${codigoPais}' ` +
            `AND c.ISOPAIS = '${codigoPais}' ` +
            `AND d.ISOPAIS = '${codigoPais}' ` +
            `AND e.ISOPAIS = '${codigoPais}' ` +
            `AND g.ISOPAIS = '${codigoPais}' ` +
            `AND i.ISOPAIS = '${codigoPais}' ` +
            `AND j.ISOPAIS = '${codigoPais}' `;
    return query;
}