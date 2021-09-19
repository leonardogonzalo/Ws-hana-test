'use strict'

module.exports.statement = function(codigoPais, oidPeriodo, arrayCuvs)
{
    return 'SELECT C.VAL_CODI_VENT CODIGOVENTA, ' +
                  'D.OID_TIPO_OFER OIDTIPOOFERTA, ' +
                  'P.NEGO_OID_NEGO OIDNEGOCIO, ' +
                  'P.UNEG_OID_UNID_NEGO OIDUNIDADNEGOCIO, ' +
                  'P.OID_PROD OIDPRODUCTO, ' +
                  'C.PRECIO_UNITARIO PRECIOUNITARIO ' +
           'FROM sicc_corp.PRE_OFERT_DETAL C, ' +
                'sicc_corp.PRE_TIPO_OFERT D, ' +
                'sicc_corp.MAE_PRODU P, ' +
                'sicc_corp.PRE_OFERT B, ' +
                'sicc_corp.PRE_MATRI_FACTU_CABEC A ' +
           'WHERE A.oid_cabe = B.MFCA_OID_CABE ' +
                'AND B.OID_OFER = C.OFER_OID_OFER ' +
                `AND A.PERD_OID_PERI = '${oidPeriodo}' ` +
                `AND C.VAL_CODI_VENT IN ('${arrayCuvs.join("', '")}') ` + 
                'AND C.TOFE_OID_TIPO_OFER = D.OID_TIPO_OFER ' +
		        'AND D.IND_COMI = 1 ' +
                'AND C.PROD_OID_PROD = P.OID_PROD ' + 
                'AND (TO_CHAR(D.OID_TIPO_OFER) || TO_CHAR(P.UNEG_OID_UNID_NEGO) || TO_CHAR(P.NEGO_OID_NEGO)) NOT IN ' +
                `(SELECT(MAP(Z.TOFE_OID_TIPO_OFER, NULL, '     ', TO_CHAR(Z.TOFE_OID_TIPO_OFER)) || ` +
                        'MAP(Z.UNEG_OID_UNID_NEGO, NULL, TO_CHAR(P.UNEG_OID_UNID_NEGO), TO_CHAR(Z.UNEG_OID_UNID_NEGO)) || ' +
                        'MAP(Z.NEGO_OID_NEGO, NULL, TO_CHAR(P.NEGO_OID_NEGO), TO_CHAR(Z.NEGO_OID_NEGO))) ' +
                'FROM sicc_corp.DTO_EXCEP_TOFER Z ' +
                'WHERE NOT (Z.UNEG_OID_UNID_NEGO IS NULL AND Z.NEGO_OID_NEGO IS NULL) ' +
                    `AND ISOPAIS = '${codigoPais}') ` +
           `AND A.ISOPAIS = '${codigoPais}' ` +
           `AND B.ISOPAIS = '${codigoPais}' ` +
           `AND C.ISOPAIS = '${codigoPais}' ` +
           `AND D.ISOPAIS = '${codigoPais}' ` +
           `AND P.ISOPAIS = '${codigoPais}' `; 
}