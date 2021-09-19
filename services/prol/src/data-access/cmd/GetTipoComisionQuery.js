'use strict'

module.exports.statement = function(codigoPais, tipoSolicitud){
    return 'SELECT tsp.ind_comi TIPOCOMISION ' +
           'FROM sicc_corp.ped_tipo_solic_pais tsp, ' +
                'sicc_corp.ped_tipo_solic ts ' +
           'WHERE tsp.tsol_oid_tipo_soli = ts.oid_tipo_soli ' +
           `AND ts.cod_tipo_soli = '${tipoSolicitud}' ` +
           `AND tsp.ISOPAIS = '${codigoPais}' ` +
    	   `AND ts.ISOPAIS = '${codigoPais}'`;
}