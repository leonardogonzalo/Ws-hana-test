'use strict'
module.exports.statement =  function(codigoPais, codigoPeriodo)
{
    let query =  'SELECT a.cod_cupon CODIGOCUPON, ' +
                    'a.cod_venta CODIGOVENTA, ' +
                    'a.val_unid_maxi UNIDADESMAXIMA ' +
            'FROM sicc_Corp.cup_equiv_matr a, ' + 
                'sicc_Corp.cup_prog_nueva_cupon b ' +
            'WHERE a.cod_prog = b.cod_prog ' +
            `AND b.ind_esta IN ('A', 'V') ` +
            `AND a.cod_peri = '${codigoPeriodo}' `+
            'AND a.cod_venta IS NOT NULL ' +
            `AND a.ISOPAIS = '${codigoPais}' ` +
            `AND b.ISOPAIS = '${codigoPais}'`;
    return query;
}