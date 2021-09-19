'use strict'
module.exports.statement = function(codigoPais, oidOferta, oidGrupoOferta)
{
    return 	'SELECT c.val_codi_vent CUV ' +
            'FROM sicc_corp.pre_ofert_detal c, ' +
                'sicc_corp.pre_ofert d, ' +
                'sicc_corp.pre_grupo_ofert h ' +
            'WHERE c.ofer_oid_ofer = d.oid_ofer ' +
              'AND c.ofer_oid_ofer = h.ofer_oid_ofer ' +
              'AND c.gofe_oid_grup_ofer = h.oid_grup_ofer ' +
              'AND h.cues_oid_ind_cuad_tipo_estr IN (1, 3) ' +
              `AND d.oid_ofer = '${oidOferta}' ` +     
              `AND h.oid_grup_ofer = '${oidGrupoOferta}' ` +
              `AND c.ISOPAIS = '${codigoPais}' ` +
              `AND d.ISOPAIS = '${codigoPais}' ` +
              `AND h.ISOPAIS = '${codigoPais}' `;
}