'use strict'
module.exports.statement = function(codigoPais, oidCliente, oidConcurso)
{
    let filterConcursos = '';
    if(Array.isArray(oidConcurso))
    {
        if (oidConcurso.length > 0)
        {
            filterConcursos = `geo.COPA_OID_PARA_GRAL IN (${oidConcurso.join()}) `
        }
        else
        {
            filterConcursos = `geo.COPA_OID_PARA_GRAL = null `
        }
    }
    else
    {
        filterConcursos = `geo.COPA_OID_PARA_GRAL = ${oidConcurso} `
    }

    let query = 'SELECT geo.COPA_OID_PARA_GRAL oidConcurso, COUNT(1) result ' +
            'FROM sicc_Corp.INC_AMBIT_GEOGR geo, ' +
                '(SELECT E.OID_TERR_ADMI, ' +
                    'F.OID_TERR, ' +
                    'F.COD_TERR, ' +
                    'G.OID_SECC, ' +
                    'G.COD_SECC, ' +
                    'H.OID_ZONA, ' +
                    'H.COD_ZONA, ' +
                    'I.OID_REGI, ' +
                    'I.COD_REGI, ' +
                    'I.ZSGV_OID_SUBG_VENT OID_SUBG_VENT ' +
                'FROM sicc_Corp.MAE_CLIEN             A, ' +
                    'sicc_Corp.MAE_CLIEN_UNIDA_ADMIN D, ' +
                    'sicc_Corp.ZON_TERRI_ADMIN       E, ' +
                    'sicc_Corp.ZON_TERRI             F, ' +
                    'sicc_Corp.ZON_SECCI             G, ' +
                    'sicc_Corp.ZON_ZONA              H, ' +
                    'sicc_Corp.ZON_REGIO             I ' +
                `WHERE A.OID_CLIE = ${oidCliente} ` +
                    'AND A.OID_CLIE = D.CLIE_OID_CLIE ' +
                    `AND D.IND_ACTI = '1' ` +
                    'AND D.ZTAD_OID_TERR_ADMI = E.OID_TERR_ADMI ' +
                    'AND E.TERR_OID_TERR = F.OID_TERR ' +
                    'AND E.ZSCC_OID_SECC = G.OID_SECC ' +
                    'AND G.ZZON_OID_ZONA = H.OID_ZONA ' +
                    'AND H.ZORG_OID_REGI = I.OID_REGI ' +
                    `and A.ISOPAIS = '${codigoPais}' ` +
                    `and D.ISOPAIS = '${codigoPais}' ` +
                    `and E.ISOPAIS = '${codigoPais}' ` +
                    `and F.ISOPAIS = '${codigoPais}' ` +
                    `and G.ISOPAIS = '${codigoPais}' ` +
                    `and H.ISOPAIS = '${codigoPais}' ` +
                    `and I.ISOPAIS = '${codigoPais}' ` +
                ') tmpTerritorio  ' +
            `WHERE ` +
                filterConcursos +
                'AND (geo.ZORG_OID_REGI IS NULL ' +
                'OR geo.ZORG_OID_REGI = tmpTerritorio.OID_REGI) ' +
                'AND (geo.ZZON_OID_ZONA IS NULL OR ' +
                'geo.ZZON_OID_ZONA = tmpTerritorio.OID_ZONA) ' +
                'AND (geo.ZSCC_OID_SECC IS NULL ' +
                'OR geo.ZSCC_OID_SECC = tmpTerritorio.OID_SECC) ' +
                'AND (geo.TERR_OID_TERR IS NULL ' +
                'OR geo.TERR_OID_TERR = tmpTerritorio.OID_TERR) ' +
                'AND (geo.ZSGV_OID_SUBG_VENT IS NULL ' +
                'OR geo.ZSGV_OID_SUBG_VENT = tmpTerritorio.OID_SUBG_VENT) ' +
                `AND geo.ISOPAIS = '${codigoPais}' ` +
                'GROUP BY geo.COPA_OID_PARA_GRAL';
    //console.log(query);
    return query;
}