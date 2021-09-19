'use strict'
module.exports.statement = function(codigoPais, codigoPeriodo){
    return    'SELECT a.cod_venta CODIGOVENTA, ' +
                    'IFNULL((SELECT MON_VENT_EXIG ' + 
                            'FROM sicc_corp.nvs_exige_venta ' +
                            `WHERE tip_cupo = 'B' ` +
                                'AND prog_cod_prog = a.cod_prog ' +
                                'AND nive_cod_nive = a.cod_nivel ' +
                                `AND ISOPAIS = '${codigoPais}'), 0) VENTAEXIGIDA ` +
              'FROM sicc_corp.cup_equiv_matr a, ' +
                   'sicc_corp.cup_prog_nueva_cupon b ' +
              'WHERE a.cod_prog = b.cod_prog ' +
                    `AND b.ind_esta IN ('A', 'V')` +
                    `AND a.cod_peri = '${codigoPeriodo}' ` +
                    'AND a.cod_venta IS NOT NULL ' +
                    'AND IFNULL(a.ind_cupo_indp, 0) = 0 ' +
                    `AND a.ISOPAIS = '${codigoPais}' `+
                    `AND b.ISOPAIS = '${codigoPais}' `;
}