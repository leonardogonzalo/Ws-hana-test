module.exports.statement = function(codigoPais, codigoPaisDefault, codigoPeriodo, codigoPeriodoAnt, codigoCliente){
    return 'SELECT IFNULL(SUM(CASE ' +
                                `WHEN COD_CANA = 'RT' AND IFNULL(rc.cam_reta,rc.cam_proc) = '${codigoPeriodo}' THEN IFNULL(rc.val_mont_bapl_dcto,0) ` +
                                'ELSE 0 ' +
                             'END), 0) MONTOVENTARETAIL, ' +
                  'IFNULL(SUM(CASE ' +
                                `WHEN COD_CANA = 'IN' THEN IFNULL(rc.val_mont_bapl_dcto, 0) ` +
                                'ELSE 0 ' +
                             'END), 0) MONTOTIENDAVIRTUAL ' +                        
           'FROM sicc_corp.ret_venta_cabec rc ' +
           `WHERE rc.val_cuen_consu = '${codigoCliente}'` +
                        `AND (IFNULL(rc.cam_reta, rc.cam_proc) = '${codigoPeriodo}' OR (ifnull(rc.cam_reta,rc.cam_proc) = '${codigoPeriodoAnt}' AND FEC_FACT IS NULL)) ` +
                        `AND rc.cod_pais = '${codigoPaisDefault}' `+
                        `AND rc.ISOPAIS = '${codigoPais}'`;
}