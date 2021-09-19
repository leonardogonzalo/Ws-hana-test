'use strict'
module.exports.statement = function(codigoPais, codigoCliente)
{
    let query ='SELECT a.OID_CLIE OIDCLIENTE, ' +
                     'b.ZTAD_OID_TERR_ADMI OIDTERRADMI, ' +
                     'z.OID_ZONA OIDZONA ' +                     
              'FROM sicc_corp.mae_clien a, ' +
                   'sicc_corp.mae_clien_unida_admin b, ' +
                   'sicc_corp.zon_terri_admin c, ' +
                   'sicc_corp.zon_secci s, ' +
                   'sicc_corp.zon_zona z ' +             
              'WHERE a.oid_clie = b.clie_oid_clie ' +
                    `AND a.cod_clie = '${codigoCliente}' ` +
                    'AND b.ztad_oid_terr_admi = C.OID_TERR_ADMI ' +
                    'AND B.PERD_OID_PERI_FIN IS NULL ' +
                    'AND c.zscc_oid_secc = s.oid_Secc ' +
                    'AND s.zzon_oid_zona = z.oid_zona ' +
                    `AND a.ISOPAIS = '${codigoPais}' ` +
                    `AND b.ISOPAIS = '${codigoPais}' ` +
                    `AND c.ISOPAIS = '${codigoPais}'` +
                    `AND s.ISOPAIS = '${codigoPais}' ` +
                    `AND z.ISOPAIS = '${codigoPais}' `;                    
    return query;
};