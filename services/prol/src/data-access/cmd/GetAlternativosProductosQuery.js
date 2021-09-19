'use strict'

module.exports.statement = function(codigoPais, oidDetaOfertas)
{
	let filterOidDetaOfertas = '';

    if(Array.isArray(oidDetaOfertas))
    {
        if (oidDetaOfertas.length > 0)
        {
            filterOidDetaOfertas = `and pmf.ofde_oid_deta_ofer IN (${oidDetaOfertas.join(", ")}) `;
        }
        else
        {
            filterOidDetaOfertas = `and pmf.ofde_oid_deta_ofer = null `;            
        }
    }
    else 
    {
        filterOidDetaOfertas = `and pmf.ofde_oid_deta_ofer = ${oidDetaOfertas} `;
    }    

    return 'SELECT DISTINCT ' +
                'pmf.OFDE_OID_DETA_OFER oidDetaOfertaOriginal, ' +
                'pod.OID_DETA_OFER oidDetaOferta, ' +
                'pod.PROD_OID_PROD oidProducto, ' +
                'mp.COD_SAP codigoSap, ' +
                'pod.VAL_CODI_VENT cuv, ' +
                'pmca.NUM_ORDE numeroOrden ' +
            'FROM sicc_corp.pre_matri_factu       pmf, ' +
                'sicc_corp.pre_matri_codig_alter pmca, ' +
                'sicc_corp.pre_matri_factu       pmf2, ' +
                'sicc_corp.pre_ofert_detal       pod, ' +
                'sicc_corp.mae_produ             mp ' +
            'WHERE pmf.oid_matr_fact = pmca.mafa_oid_cod_ppal ' +
                filterOidDetaOfertas +
                'AND pmca.mafa_oid_cod_alte = pmf2.oid_matr_fact ' +
                'AND pmf2.ofde_oid_deta_ofer = pod.oid_deta_ofer ' +
                'AND pod.prod_oid_prod = mp.oid_prod ' +
                'AND ifnull(pmca.ind_acti, 1) = 1 ' +
                `AND pmf.ISOPAIS = '${codigoPais}' ` + 
                `AND pmca.ISOPAIS = '${codigoPais}' ` +
                `AND pmf2.ISOPAIS = '${codigoPais}' ` +
                `AND pod.ISOPAIS = '${codigoPais}' ` +
                `AND mp.ISOPAIS = '${codigoPais}' ` +
            'ORDER BY pod.oid_deta_ofer, pmca.num_orde ASC';
}