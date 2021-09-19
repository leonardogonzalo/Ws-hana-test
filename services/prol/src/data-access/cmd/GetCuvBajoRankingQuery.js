'use strict'
module.exports.statement = function(codigoPais, oidOferta, oidGrupoOferta)
{
    return  'SELECT TOP 1 val_Codi_vent CUV ' +
            'FROM (SELECT val_codi_vent ' +
            'FROM sicc_corp.pre_ofert_detal a ' +
            `WHERE a.ofer_oid_ofer = '${oidOferta}' ` +
            `AND a.gofe_oid_grup_ofer = '${oidGrupoOferta}' ` +
            `AND a.ISOPAIS = '${codigoPais}'  ` +
            'ORDER BY a.num_posi_rank ASC)  ';
}
