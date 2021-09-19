'use strict'

module.exports.statement = function(codigoPais, codTipoClasificacion, codClasificacion, codTipoCliente, codSubTipoCliente, oidCliente){
    return 'SELECT COUNT(1) OCURRENCIAS ' +
           'FROM sicc_corp.MAE_CLIEN_CLASI X, ' +
                'sicc_corp.MAE_CLIEN_TIPO_SUBTI Y, ' +
                'sicc_corp.MAE_TIPO_CLIEN TCL, ' +
                'sicc_corp.MAE_SUBTI_CLIEN SUB, ' +
                'sicc_corp.MAE_TIPO_CLASI_CLIEN TCC, ' +
                'sicc_corp.MAE_CLASI CLA ' +
           'WHERE X.CTSU_OID_CLIE_TIPO_SUBT = Y.OID_CLIE_TIPO_SUBT ' +
                `AND Y.CLIE_OID_CLIE = '${oidCliente}' ` +
                `AND Y.IND_PPAL = '1' ` +
                'AND Y.TICL_OID_TIPO_CLIE = TCL.OID_TIPO_CLIE ' +
                'AND Y.SBTI_OID_SUBT_CLIE = SUB.OID_SUBT_CLIE ' +
                'AND X.TCCL_OID_TIPO_CLASI = TCC.OID_TIPO_CLAS ' +
                'AND X.CLAS_OID_CLAS = CLA.OID_CLAS ' +
                `AND TCC.COD_TIPO_CLAS = '${codTipoClasificacion}' ` +
                `AND CLA.COD_CLAS = '${codClasificacion}' ` +
                `AND TCL.COD_TIPO_CLIE = '${codTipoCliente}' ` +
                `AND SUB.COD_SUBT_CLIE = '${codSubTipoCliente}' `  +
                `AND X.ISOPAIS = '${codigoPais}' ` +
                `AND Y.ISOPAIS = '${codigoPais}' ` +
                `AND TCL.ISOPAIS = '${codigoPais}' ` +
                `AND SUB.ISOPAIS = '${codigoPais}' ` +
                `AND TCC.ISOPAIS = '${codigoPais}' ` +
                `AND CLA.ISOPAIS = '${codigoPais}'`;
}