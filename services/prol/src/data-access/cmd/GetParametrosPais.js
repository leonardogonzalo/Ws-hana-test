module.exports.statement = function(codigoPais, codigoPaisDefault, codigoSistema, codigoParametro, nombreParametro, valorParametro, observacionParametro, indicadorActivo){   
    let andFiltro = '';
    
    if(codigoPaisDefault != ''){
        andFiltro = `AND COD_PAIS = '${codigoPaisDefault}' `;
    }

    if(codigoSistema != ''){
        andFiltro = andFiltro + `AND COD_SIST = '${codigoSistema}' `;
    }

    if(codigoParametro != ''){ 
        andFiltro = andFiltro  + `AND COD_PARA = '${codigoParametro}' `;
    }

    if(nombreParametro != ''){
        andFiltro = andFiltro + `AND NOM_PARA = '${nombreParametro}' `;
    }

    if(valorParametro != ''){
        andFiltro = andFiltro + `AND VAL_PARA = '${valorParametro}' `;
    }
   
    if(observacionParametro != ''){
        andFiltro = andFiltro + `AND OBS_PARA = '${observacionParametro}' `;
    }

    if(indicadorActivo != ''){
        andFiltro = andFiltro + `AND IND_ACTI = '${indicadorActivo}' `;
    }

    let cmd = 'SELECT COD_PAIS CODIGOPAIS, ' +
                  'COD_SIST CODIGOSISTEMA, ' +
                  'COD_PARA CODIGOPARAMETRO, ' +
                  'NOM_PARA NOMBREPARAMETRO, ' +
                  'VAL_PARA VALORPARAMETRO, ' +
                  'OBS_PARA OBSERVACIONES, ' +
                  'IND_ACTI INDICADORACTIVIDAD ' +
           'FROM sicc_corp.BAS_PARAM_PAIS ' +
           'WHERE 1 = 1 ' +                
                `AND ISOPAIS = '${codigoPais}' ` +
                andFiltro;

    return cmd;
}   