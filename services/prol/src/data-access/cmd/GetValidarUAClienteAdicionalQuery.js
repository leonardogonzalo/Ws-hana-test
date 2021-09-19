'use strict'

module.exports.statement = function(codigoPais, codigoRegion, codigoZona, oidCliente){
    return 'SELECT COUNT(1) OCURRENCIAS ' +
           'FROM sicc_corp.MAE_CLIEN_UNIDA_ADMIN ua, ' +
                'sicc_corp.ZON_TERRI_ADMIN zta, ' +
                'sicc_corp.ZON_ZONA  zz, ' +
                'sicc_corp.ZON_SECCI zs, ' +
                'sicc_corp.ZON_REGIO zr ' +
           `WHERE ua.CLIE_OID_CLIE = '${oidCliente}' ` +
                'AND ua.IND_ACTI = 1 ' +
                'AND ua.ZTAD_OID_TERR_ADMI = zta.OID_TERR_ADMI ' +
                'AND zs.OID_SECC = zta.ZSCC_OID_SECC ' +
                'AND zz.OID_ZONA = zs.ZZON_OID_ZONA ' +
                'AND zr.OID_REGI = zz.ZORG_OID_REGI ' +
                `AND zr.COD_REGI = '${codigoRegion}' ` +
                `AND zz.COD_ZONA = '${codigoZona}' ` +
                `AND ua.ISOPAIS = '${codigoPais}' ` +
				`AND zta.ISOPAIS = '${codigoPais}' ` +
				`AND zz.ISOPAIS = '${codigoPais}' ` +
				`AND zs.ISOPAIS = '${codigoPais}' ` +
				`AND zr.ISOPAIS = '${codigoPais}'`;
}