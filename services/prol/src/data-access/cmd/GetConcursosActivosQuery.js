'use strict'
module.exports.statement = function(codigoPais, codigoPeriodo, oidCliente)
{
    let query = 'select a.NUM_CONC numeroConcurso, ' +
                'a.OID_PARA_GRAL oidConcurso, ' +
                'substr(a.val_nomb, 1, 40) nombreConcurso, ' +
                'b.COD_CLAS_CONC clasifConcurso, ' +
                'a.BCAL_OID_BASE_CALC oidBaseCalculo, ' +
                'd.VAL_FACT_CONV factorConversion, ' +
                'd.NUM_PUNT_ASIG puntosAsignar, ' +
                'd.IND_TIPO_CUAD tipoCuadre, ' +
                'ifnull(d.ind_cons_rang_concu, 0) indConsRango, ' +
                'f.IMP_MONT_MINI_PEDI montoMinimoPedido, ' +
                'si.cod_peri codPeriodoDesde, ' +
                '(select count(1) ' +
                    'from sicc_Corp.inc_ambit_geogr x ' +
                    'where x.copa_oid_para_gral = a.oid_para_gral) totalGeografico, ' +
                '(select count(1) ' +
                    'from sicc_Corp.inc_clasi_parti_concu x ' +
                    'where x.copa_oid_para_gral = a.oid_para_gral) totalClasificacion, ' +
                '(select count(1) ' +
                    'from sicc_Corp.inc_estat_venta_consu x ' +
                    'where x.copa_oid_para_gral = a.oid_para_gral) totalEstatus, ' +
                '(select count(1) ' +
                    'from sicc_Corp.inc_produ_valid x ' +
                    'where x.prdu_oid_prod = e.oid_prod) totalProdValidos, ' +
                '(select count(1) ' +
                    'from sicc_Corp.inc_produ_exclu x ' +
                    'where x.prdu_oid_prod = e.oid_prod) totalProdExcluidos, ' +
                '(select count(1) ' +
                    'from sicc_Corp.inc_produ_bonif x ' +
                    'where x.prdu_oid_prod = e.oid_prod) totalProdBonif, ' +
                '(select count(1) ' +
                    'from sicc_Corp.inc_produ_exigi x ' +
                    'where x.prdu_oid_prod = e.oid_prod) totalProdExigidos, ' +
                '(select count(1) ' +
                    'from sicc_Corp.inc_produ_exigi x ' +
                    'where x.prdu_oid_prod = e.oid_prod ' +
                    `and ifnull(x.ind_agrup, 'T') = 'T') totalProdExigObli, ` +
                '(SELECT  spc.cod_peri ' +
                    'FROM sicc_Corp.seg_perio_corpo spc, ' +
                        'sicc_Corp.cra_perio cp ' +
                    'WHERE spc.oid_peri = cp.peri_oid_peri ' +
                    `AND cp.oid_peri= a.perd_oid_peri_desd ` +
                    'GROUP BY spc.cod_peri' +
                ') campaniaDesde ' +
            `from sicc_Corp.inc_concu_param_gener a left outer join  (select * from sicc_Corp.inc_produ where ISOPAIS='${codigoPais}') e ` +
                                        'on  e.copa_oid_para_gral = a.oid_para_gral ' +
                                        `left outer join  (select * from sicc_Corp.inc_concu_param_consu where ISOPAIS='${codigoPais}') f ` +
                                   'on  f.copa_oid_para_gral = a.oid_para_gral, ' +
                'sicc_Corp.inc_clasi_concu       b, ' +
                'sicc_Corp.inc_versi_concu       c, ' +
                'sicc_Corp.inc_obten_punto       d, ' +
                'sicc_Corp.cra_perio             ci, ' +
                'sicc_Corp.seg_perio_corpo       si, ' +
                'sicc_Corp.cra_perio             cf, ' +
                'sicc_Corp.seg_perio_corpo       sf ' +
            'where a.ccon_oid_clas_conc = b.oid_clas_conc ' +
                `and b.cod_clas_conc in ('X', 'K') ` +
                'and a.ind_acti = 1 ' +
                `and ${codigoPeriodo} between si.cod_peri and sf.cod_peri ` +
                'and a.ind_comu = 1 ' +
                'and a.ind_no_gene_punt = 0 ' +
                'and a.oid_para_gral = c.copa_oid_para_gral ' +
                'and c.vico_oid_vige_conc <> 4 ' +
                'and d.copa_oid_para_gral = a.oid_para_gral ' +
                'and a.perd_oid_peri_desd = ci.oid_peri ' +
                'and ci.peri_oid_peri = si.oid_peri ' +
                'and a.perd_oid_peri_hast = cf.oid_peri ' +
                'and cf.peri_oid_peri = sf.oid_peri ' +
                'AND NOT EXISTS ' +
                    '(SELECT * ' +
                        'FROM sicc_Corp.INC_DESCA des ' +
                        `WHERE des.CLIE_OID_CLIE = ${oidCliente} ` +
                        'AND des.COPA_OID_PARA_GRAL = a.OID_PARA_GRAL) ' +
                `and a.ISOPAIS = '${codigoPais}' ` +
                `and b.ISOPAIS = '${codigoPais}' ` +
                `and c.ISOPAIS = '${codigoPais}' ` +
                `and d.ISOPAIS = '${codigoPais}' ` +
                `and ci.ISOPAIS = '${codigoPais}' ` +
                `and si.ISOPAIS = '${codigoPais}' ` +
                `and cf.ISOPAIS = '${codigoPais}' ` +
                `and sf.ISOPAIS = '${codigoPais}' `; 

    //console.log(query);
    return query;
}