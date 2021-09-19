'use strict'
const dbContext = require('../../data-access/dbContextGenerico');
const constantes = require('../../utility/constantes');
const leftPad = require('left-pad');

async function obtenerPeriodoSiguiente(codigoPais, codigoPeriodo, numeroPeriodo)
{   
    /*
    let objDatosPeriodo = {
        OIDPERIODO : ''
    } 
    */
   let oidPeriodo = '';

    var periodosAnio = constantes.PERIODOS_ANIO;

     //Obtener el nro. de periodos anual.
     var periodo = ('' + codigoPeriodo.substring(0, 4)) * periodosAnio;

     //Agregar el nro. de periodos del codigo de periodo.
     //periodo = periodo + parseInt(codigoPeriodo.substring(5));
     periodo = periodo + parseInt(codigoPeriodo.substring(4,6));     

     //Agregar el número periodos ingresados.
     if (numeroPeriodo == undefined) numeroPeriodo = 1;
     periodo = periodo + numeroPeriodo;

    //Obtener el anio.
    var anio = parseInt(periodo / periodosAnio);

    //Obtener el periodo
    periodo = periodo % periodosAnio;

    if (periodo === 0) {
      periodo = periodosAnio;
      anio = anio - 1;
    }

    var codigoPeriodoAux = anio.valueOf() + leftPad(periodo.valueOf(), 2, "0");  
    
    //console.log("Obtener Periodo Siguiente");
    //console.log(codigoPeriodoAux);

    let queryResult = await dbContext.getOidPeriodo(codigoPais, codigoPeriodoAux);

    //if(objOidPeriodo != null){
    if (queryResult != undefined && queryResult.length > 0)
    {        
        //objDatosPeriodo.oidPeriodo = objOidPeriodo.OIDPERIODO;
        oidPeriodo = queryResult[0].OIDPERIODO;        
    }

    return oidPeriodo;
}

function obtenerPeriodo(codigoPeriodo, numeroPeriodo) 
{
    //From Incentivos
    let lnperiodosanio = 18;

    /*OBTENGO EL NUMERO DE PERIDOS ANUAL*/
    let lnperiodo = Number.parseInt(codigoPeriodo.substring(0, 4)) * lnperiodosanio;
                       

    /*AGREGO EL NUMERO DE PERIODOS DEL CODIGO DE PERIODO*/ //201813
    //lnperiodo = lnperiodo + Number.parseInt(codigoPeriodo.substring(5)); 3
    lnperiodo = lnperiodo + Number.parseInt(codigoPeriodo.substring(4, 6));    

    /*AGREGO EL NUMERO DE PERIODOS INGRESADOS*/
    lnperiodo = lnperiodo + numeroPeriodo;

    /*OBTENGO EL ANIO*/
    let lnanio = Number.parseInt(lnperiodo / lnperiodosanio);

    /*OBTENGO EL PERIODO*/
    lnperiodo = lnperiodo % lnperiodosanio;

    if (lnperiodo == 0) 
    {
      lnperiodo = lnperiodosanio;
      lnanio = lnanio - 1;
    }

    return String(lnanio) + leftPad(String(lnperiodo), 2, "0");
}


async function obtenerDatosPedido(codigoPais, codigoPeriodo, codigoCliente)
{
    let objDatosPedido = { 
        oidCliente : '', 
        oidTerrAdmi : '', 
        oidZona : '',
        oidPeriodo : ''  
    }
    
    let objDatosCliente = await dbContext.getDatosCliente(codigoPais, codigoCliente);

    if(objDatosCliente!= null)
    {
        objDatosPedido.oidCliente = objDatosCliente[0].OIDCLIENTE;
        objDatosPedido.oidTerrAdmi = objDatosCliente[0].OIDTERRADMI;
        objDatosPedido.oidZona = objDatosCliente[0].OIDZONA;
    }

    let objDatosPeriodo = await dbContext.getOidPeriodo(codigoPais, codigoPeriodo);

    if(objDatosPeriodo != null){
        objDatosPedido.oidPeriodo = objDatosPeriodo[0].OIDPERIODO;
    }

    return objDatosPedido;
}

async function obtenerParametroPais(codigoPais, codigoPaisDefault, codigoSistema, codigoParametro, nombreParametro, valorParametro, observacionParametro, indicadorActivo)
{
    let objParametroPais = {
        codigoPais : '',
		codigoSistema : '',
		codigoParametro : '',
		nombreParametro : '',
		valorParametro : '',
		observaciones : '',
		indicadorActividad : ''
    }

    let data = await dbContext.getParametrosPais(codigoPais, codigoPaisDefault, codigoSistema, codigoParametro, nombreParametro, valorParametro, observacionParametro, indicadorActivo);

    if(data != null && data.length > 0)
    {
        let objParametrosPais_ = data[0];
        objParametroPais.codigoPais = objParametrosPais_.CODIGOPAIS;
        objParametroPais.codigoSistema = objParametrosPais_.CODIGOSISTEMA;
        objParametroPais.codigoParametro = objParametrosPais_.CODIGOPARAMETRO;
        objParametroPais.nombreParametro = objParametrosPais_.NOMBREPARAMETRO;
        objParametroPais.valorParametro = objParametrosPais_.VALORPARAMETRO;
        objParametroPais.observaciones = objParametrosPais_.OBSERVACIONES;
        objParametroPais.indicadorActividad = objParametrosPais_.INDICADORACTIVIDAD;        
    }

    return objParametroPais;
}

module.exports = { 
    obtenerDatosPedido: obtenerDatosPedido, 
    obtenerParametroPais: obtenerParametroPais,
    obtenerPeriodoSiguiente: obtenerPeriodoSiguiente,
    obtenerPeriodo: obtenerPeriodo
}