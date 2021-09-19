module.exports.statement = function(codigoPais, codigoPaisDefault, codigoPeriodoRef, codigoPeriodoRefAnt, codigoCliente, fechaFacturacionRef){
    let filtro = '';
    
    if(fechaFacturacionRef != ''){
        filtro = `AND rc.fec_fact <= TO_DATE('${fechaFacturacionRef}', 'dd/MM/yyyy')`;
    }

    return 'SELECT SUM(CASE '+ 
                        `WHEN COD_CANA='RT' AND IFNULL(rc.cam_reta,rc.cam_proc) = '${codigoPeriodoRef}' AND fec_fact is not null THEN IFNULL(rc.val_mont_bapl_dcto, 0) ` +
                        'ELSE 0 ' +
                      'END) MON_VENT_RETA MONTOVENTARETAIL, ' +
                  'SUM(CASE ' +
                        `WHEN COD_CANA='IN' AND cam_apli_desc= '${codigoPeriodoRef}' THEN IFNULL(rc.val_mont_bapl_dcto, 0) ` +
                        'ELSE 0 ' +
                      'END) MON_TIEN_VIRT MONTOTIENDAVIRTUAL ' +
           'FROM sicc_corp.ret_venta_cabec rc ' +
           `WHERE rc.val_cuen_consu = '${codigoCliente}' ` +
                `AND IFNULL(rc.cam_reta,rc.cam_proc) BETWEEN '${codigoPeriodoRefAnt}' AND '${codigoPeriodoRef}' ` +
                `AND rc.cod_pais = '${codigoPaisDefault}' ` +
                `AND rc.ISOPAIS = '${codigoPais}' ` + 
                filtro;
}