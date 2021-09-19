'use strict'
module.exports.statement = function(codigoPais, oidOfertas)
{
	let filterOfertas = '';

    if(Array.isArray(oidOfertas))
    {
        if (oidOfertas.length > 0)
        {
            filterOfertas = `and d.oid_ofer IN (${oidOfertas.join(", ")}) `;
        }
        else
        {
            filterOfertas = `and d.oid_ofer = null `;            
        }
    }
    else 
    {
        filterOfertas = `and d.oid_ofer = ${oidOfertas} `;
    }

    let query =  'select ' +
                'd.OID_OFER OIDOFERTA, ' +
                'e.OID_DETA_OFER OIDDETAOFERTA, ' +
                'd.COES_OID_ESTR OIDESTRATEGIA, ' +
                'd.FOPA_OID_FORM_PAGO OIDFORMAPAGO, ' +
                'e.NUM_PAGI_CATA PAGINA, ' +
                'd.OCAT_OID_CATA OIDCATALOGO, ' +
                'e.PRECIO_UNITARIO PRECIOUNITARIO, ' +
                'e.IMP_PREC_CATA PRECIOCATALOGO, ' +
                'e.IMP_PREC_POSI PRECIOCONTABLE, ' +
                'e.VAL_FACT_REPE FACTORREPETICION, ' +
                'e.GOFE_OID_GRUP_OFER OIDGRUPOOFERTA, ' +
                'G.CUES_OID_IND_CUAD_TIPO_ESTR OIDINDICADORCUADRE, ' +
                'g.COD_FACT_CUAD FACTORCUADRE, ' +
                'E.NUM_POSI_RANK RANKING, ' +
                'e.VAL_CODI_VENT CUV, ' +
                'e.PROD_OID_PROD OIDPRODUCTO, ' +
                'mp.COD_SAP CODSAP, ' +
                'tf.NUM_SECC_DETA_FACT NUMEROSECCIONDETALLE, ' +
                'e.IMP_PREC_PUBL PRECIOPUBLICO, ' +
                '0 INDICADORRECUPERACION ' +
		  'from sicc_corp.pre_matri_factu_cabec a, ' +
		       'sicc_corp.cra_perio             b, ' +
		       'sicc_corp.seg_perio_corpo       c, ' +
		       'sicc_corp.pre_ofert             d, ' +
		       'sicc_corp.mae_produ             mp, ' +
		       'sicc_corp.pre_ofert_detal       e left outer join   ' +
		       `(select * from sicc_corp.pre_grupo_ofert where ISOPAIS='${codigoPais}') g ` +
		       'on  e.GOFE_OID_GRUP_OFER = G.OID_GRUP_OFER, ' +
		       'sicc_corp.pre_tipo_ofert        tf ' +
		 'where a.perd_oid_peri = b.oid_peri ' +
		   'and b.peri_oid_peri = c.oid_peri ' +
		   'and a.oid_cabe = d.mfca_oid_cabe ' +
		   'and d.oid_ofer = e.ofer_oid_ofer ' +
		   filterOfertas +
		   'and e.ind_prod_prin = 0 ' +
		   'and d.coes_oid_estr in (2002, 2009) ' +
		   'and mp.oid_prod = e.PROD_OID_PROD ' +
		   'and tf.oid_tipo_ofer = e.tofe_oid_tipo_ofer ' +		   
		   `and a.ISOPAIS = '${codigoPais}' ` +
		   `and b.ISOPAIS = '${codigoPais}' ` +
		   `and c.ISOPAIS = '${codigoPais}' ` +
		   `and d.ISOPAIS = '${codigoPais}' ` +
		   `and e.ISOPAIS = '${codigoPais}' ` +
		   `and mp.ISOPAIS = '${codigoPais}' ` +
           `and tf.ISOPAIS = '${codigoPais}' `;
    return query;
}