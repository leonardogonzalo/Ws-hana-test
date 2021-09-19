'use strict'
module.exports.statement = function(codigoPais, oidPromocion, cuvs)
{
    let filterPromocion = '';
    if (Array.isArray(oidPromocion))
    {
        if (oidPromocion.length > 0)
        {
            filterPromocion = `AND i.oid_prom IN (${oidPromocion.join()}) `;
        }
        else
        {
            filterPromocion = `AND i.oid_prom = null `;
        }
    }
    else
    {
        filterPromocion = `AND i.oid_prom = ${oidPromocion} `;
    }

    let statement = 'SELECT i.oid_prom oidPromocion, l.val_codi_vent cuv '  +
            'FROM sicc_corp.pre_ofert       h, ' +
                'sicc_corp.pre_promo       i, ' +
                'sicc_corp.pre_rango_promo j, ' +
                'sicc_corp.pre_ofert_detal l, ' +
                'sicc_corp.pre_ofert       ll ' +
            'WHERE h.oid_ofer = i.ofer_oid_ofer ' +
                'AND i.oid_prom = j.pomo_oid_prom ' +
                'AND j.ocat_oid_cata = ll.ocat_oid_cata ' +
                'AND l.num_pagi_cata >= j.val_desd ' +
                'AND l.num_pagi_cata <= j.val_hast ' +
                `AND j.cod_tipo_rang = 'R' ` +
                'AND j.ind_excl = 0 ' +
                'AND ll.oid_ofer = l.ofer_oid_ofer ' +
                'AND h.mfca_oid_cabe = ll.mfca_oid_cabe ' +
                'AND h.oid_ofer = i.ofer_oid_ofer ' +
                filterPromocion +
                `AND l.val_Codi_vent IN ('${cuvs.join("', '")}') ` +
                `AND h.ISOPAIS = '${codigoPais}' ` +
                `AND i.ISOPAIS = '${codigoPais}' ` +
                `AND j.ISOPAIS = '${codigoPais}' ` +
                `AND l.ISOPAIS = '${codigoPais}' ` +
                `AND ll.ISOPAIS = '${codigoPais}' ` +
                'AND l.prod_oid_prod NOT IN ' +
                    '(SELECT p.oid_prod ' +
                    'FROM sicc_corp.pre_ofert       m, ' +
                        'sicc_corp.pre_promo       n, ' +
                        'sicc_corp.pre_rango_promo o, ' +
                        'sicc_corp.mae_produ       p, ' +
                        'sicc_corp.pre_ofert_detal q ' +
                    'WHERE m.oid_ofer = n.ofer_oid_ofer ' +
                'AND n.oid_prom = o.pomo_oid_prom ' +
                'AND o.ocat_oid_cata = q.ocat_oid_catal ' +
                'AND q.num_pagi_cata >= o.val_desd ' +
                'AND q.num_pagi_cata <= o.val_hast ' +
                `AND o.cod_tipo_rang = 'R' ` +
                'AND q.prod_oid_prod = p.oid_prod ' +
                'AND o.ind_excl = 1 ' +
                'AND o.pomo_oid_prom = j.pomo_oid_prom ' +
                `and m.ISOPAIS = '${codigoPais}' ` +
                `and n.ISOPAIS = '${codigoPais}' ` +
                `and o.ISOPAIS = '${codigoPais}' ` +
                `and p.ISOPAIS = '${codigoPais}' ` +
                `and q.ISOPAIS = '${codigoPais}' ` +
        'UNION ALL ' +
            'SELECT xx.oid_prod cuv ' +
            'FROM sicc_corp.pre_rango_promo x, ' +
                 'sicc_corp.mae_produ       xx ' +
            `WHERE x.cod_tipo_rang = 'P' ` +
                'AND x.ind_excl = 1 ' +
                'AND x.pomo_oid_prom = i.oid_prom ' +
                'AND X.OCAT_OID_CATA = ll.ocat_oid_cata ' +
                `AND x.ISOPAIS = '${codigoPais}' ` +
                `AND xx.ISOPAIS = '${codigoPais}' ` +
                'AND x.val_desd = xx.oid_prod)';
    //console.log(statement);
    return statement;
}