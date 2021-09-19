const constantes = require('./constantes.js');

module.exports.obtenerPaisDefault = function(codigoPais){
    var result = '';

    if(codigoPais === constantes.Pais.BOLIVIA){ return result = constantes.PaisDefault.BOLIVIA; }
    if(codigoPais === constantes.Pais.CHILE){ return result = constantes.PaisDefault.CHILE; }
    if(codigoPais === constantes.Pais.COLOMBIA){ return result = constantes.PaisDefault.COLOMBIA; }
    if(codigoPais === constantes.Pais.COSTA_RICA){ return result = constantes.PaisDefault.COSTA_RICA; }
    if(codigoPais === constantes.Pais.ECUADOR){ return result = constantes.PaisDefault.ECUADOR; }
    if(codigoPais === constantes.Pais.SALVADOR){ return result = constantes.PaisDefault.SALVADOR; }
    if(codigoPais === constantes.Pais.MEXICO){ return result = constantes.PaisDefault.MEXICO; }
    if(codigoPais === constantes.Pais.PANAMA){ return result = constantes.PaisDefault.PANAMA; }
    if(codigoPais === constantes.Pais.PERU){ return result = constantes.PaisDefault.PERU; }
    if(codigoPais === constantes.Pais.PUERTO_RICO){ return result = constantes.PaisDefault.PUERTO_RICO; }
    if(codigoPais === constantes.Pais.DOMINICANA){ return result = constantes.PaisDefault.DOMINICANA; }
    if(codigoPais === constantes.Pais.VENEZUELA){ return result = constantes.PaisDefault.VENEZUELA;}
    if(codigoPais === constantes.Pais.GUATEMALA){ return result = constantes.PaisDefault.GUATEMALA;}

    return result;
}

module.exports.obtenerValorEnteroFormateado = function (valor) {
    return !((valor == "") || valor == undefined) ? Number.parseInt(valor).toString()
        : "0";
  }
