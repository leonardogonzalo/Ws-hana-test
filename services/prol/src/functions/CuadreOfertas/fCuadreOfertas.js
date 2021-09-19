'use strict'

const leftPad = require('left-pad');
const logger = require('./../../utility/Logger');

const constantes = require('../../utility/constantes');
const funciones = require('../../utility/funciones');
const dbContext = require('../../data-access/dbContextValidaciones');
const common = require('../common/base');
const dto = require('../../persistence/pedidoConsolidado');
const fLimiteVenta = require('./fLimiteVenta');
const fReemplazoProductos = require('./fReemplazoProductos');
const fCompuestaFija = require('./fCompuestaFija');
const fCompuestaVariable = require('./fCompuestaVariable');
const fCuadrePromocion = require('./fCuadrePromocion');
const fCuadreRevision = require('./fCuadreRevision');
const fCuadreNX = require('./fCuadreNX');

async function validate(objPedidoConsolidado) 
{
    let performance = logger.start("Starting Cuadre de Ofertas");

    //Obtener datos del pedido
    let objDatosPedido = await common.obtenerDatosPedido(objPedidoConsolidado.codigoPais, objPedidoConsolidado.codigoPeriodo, objPedidoConsolidado.codigoCliente);

    objPedidoConsolidado.oidCliente = String(objDatosPedido.oidCliente);
    objPedidoConsolidado.oidTerrAdmi = String(objDatosPedido.oidTerrAdmi);
    objPedidoConsolidado.oidZona = String(objDatosPedido.oidZona);
    objPedidoConsolidado.oidPeriodo = String(objDatosPedido.oidPeriodo);

    //Obtener datos del periodo siguiente
    let oidPeriodoSiguiente = await common.obtenerPeriodoSiguiente(objPedidoConsolidado.codigoPais, objPedidoConsolidado.codigoPeriodo);

    let performancePosicionesInit = logger.start("Starting Posiciones Initialize");

    let arrayCuvs = new Array(objPedidoConsolidado.posiciones.length);
    let arrayOidDetaOferta = new Array(objPedidoConsolidado.posiciones.length);
    let arrayOidDetaOfertas = new Array(objPedidoConsolidado.posiciones.length);
    let arrayNroUnidades = new Array(objPedidoConsolidado.posiciones.length);

    //Obtener los cuvs del pedido
    for(let p=0; p<objPedidoConsolidado.posiciones.length; p++){
        arrayCuvs[p] = objPedidoConsolidado.posiciones[p].cuv;
    }

    //Obtener datos de las posisciones 
    let lstDatosPosicion = await dbContext.getDatosPosicion(objPedidoConsolidado.codigoPais, objPedidoConsolidado.codigoPeriodo, arrayCuvs);

    let objPedidoConsolidadoPosicion = new dto.PedidoConsolidadoPosicion();
    let objDatosPosicion;

    for(let p=0; p<objPedidoConsolidado.posiciones.length; p++){
        objPedidoConsolidadoPosicion = objPedidoConsolidado.posiciones[p];

        for(let i=0; i<lstDatosPosicion.length; i++) {
            objDatosPosicion = lstDatosPosicion[i];

            if(objPedidoConsolidadoPosicion.cuv === objDatosPosicion.CUV){
                break;
            }
        }

        objPedidoConsolidadoPosicion.unidadesPorAtender = String(objPedidoConsolidadoPosicion.unidadesDemandadas);
        objPedidoConsolidadoPosicion.oidOferta = String(objDatosPosicion.OIDOFERTA);
        objPedidoConsolidadoPosicion.oidDetaOferta = String(objDatosPosicion.OIDDETAOFERTA);
        objPedidoConsolidadoPosicion.oidEstrategia = String(objDatosPosicion.OIDESTRATEGIA);
        if(objDatosPosicion.OIDFORMAPAGO != null) objPedidoConsolidadoPosicion.oidFormaPago = objDatosPosicion.OIDFORMAPAGO;
        if(objDatosPosicion.PAGINA != null) objPedidoConsolidadoPosicion.pagina = String(objDatosPosicion.PAGINA);
        if(objDatosPosicion.OIDCATALOGO != null) objPedidoConsolidadoPosicion.oidCatalogo = String(objDatosPosicion.OIDCATALOGO);
        if(objDatosPosicion.PRECIOUNITARIO != null) objPedidoConsolidadoPosicion.precioUnitario = objDatosPosicion.PRECIOUNITARIO;
        if(objDatosPosicion.PRECIOCATALOGO != null) objPedidoConsolidadoPosicion.precioCatalogo = objDatosPosicion.PRECIOCATALOGO;
        if(objDatosPosicion.PRECIOCONTABLE != null) objPedidoConsolidadoPosicion.precioContable = objDatosPosicion.PRECIOCONTABLE;
        if(objDatosPosicion.FACTORREPETICION != null) objPedidoConsolidadoPosicion.factorRepeticion = String(objDatosPosicion.FACTORREPETICION);
        if(objDatosPosicion.OIDGRUPOOFERTA != null) objPedidoConsolidadoPosicion.oidGrupoOferta = objDatosPosicion.OIDGRUPOOFERTA;
        if(objDatosPosicion.OIDINDICADORCUADRE != null) objPedidoConsolidadoPosicion.oidIndicadorCuadre = objDatosPosicion.OIDINDICADORCUADRE;
        if(objDatosPosicion.FACTORCUADRE != null) objPedidoConsolidadoPosicion.factorCuadre = objDatosPosicion.FACTORCUADRE;
        if(objDatosPosicion.RANKING != null) objPedidoConsolidadoPosicion.ranking = String(objDatosPosicion.RANKING);
        objPedidoConsolidadoPosicion.oidProducto = String(objDatosPosicion.OIDPRODUCTO);
        if(objDatosPosicion.CODSAP != null) objPedidoConsolidadoPosicion.codigoSap = objDatosPosicion.CODSAP;
        if(objDatosPosicion.NUMEROSECCIONDETALLE != null) objPedidoConsolidadoPosicion.numeroSeccionDetalle = String(objDatosPosicion.NUMEROSECCIONDETALLE);
        if(objDatosPosicion.PRECIOPUBLICO != null) objPedidoConsolidadoPosicion.precioPublico = objDatosPosicion.PRECIOPUBLICO;
        if(objDatosPosicion.INDICADORRECUPERACION != null) objPedidoConsolidadoPosicion.indicadorRecuperacion = String(objDatosPosicion.INDICADORRECUPERACION);
        
        //posicion.cuv = objPosiciones.Cuv;
        arrayOidDetaOferta[p] = objPedidoConsolidadoPosicion.oidDetaOferta;
        arrayNroUnidades[p] = objPedidoConsolidadoPosicion.unidadesPorAtender;
        arrayOidDetaOfertas[p] = { "oid" : arrayOidDetaOferta[p], "numeroUnidades" :  arrayNroUnidades[p] }

        objPedidoConsolidado.posiciones[p] = objPedidoConsolidadoPosicion;
    }
    logger.stop('Completed Posiciones Initialize', performancePosicionesInit);

    //3.Validar limite de venta
    let performanceLimiteVenta = logger.start("Starting Limite Venta");
    let lstLimiteVentas = await dbContext.getLimiteVenta(objPedidoConsolidado.codigoPais, objPedidoConsolidado.codigoCliente, objPedidoConsolidado.oidTerrAdmi, arrayOidDetaOfertas);
    
    objPedidoConsolidadoPosicion = null;
    objPedidoConsolidadoPosicion = new dto.PedidoConsolidadoPosicion();

    objPedidoConsolidado.posiciones.forEach(objPedidoConsolidadoPosicion => {
        let limiteVenta = fLimiteVenta.validarLimiteVenta(objPedidoConsolidado, objPedidoConsolidadoPosicion, lstLimiteVentas);

        if (limiteVenta != null || limiteVenta != '') {
            if(parseInt(limiteVenta) <= parseInt(objPedidoConsolidadoPosicion.unidadesPorAtender)) {
                objPedidoConsolidadoPosicion.unidadesPorAtender = String(limiteVenta);
                objPedidoConsolidadoPosicion.indLimiteVenta = "1";
                objPedidoConsolidadoPosicion.observaciones = 'LIMITE DE VENTA';
            }
        }
    });
    logger.stop('Completed Limite Venta', performanceLimiteVenta);        

    //4. Reemplazo productos
    objPedidoConsolidado = await fReemplazoProductos.reemplazarProductos(objPedidoConsolidado, '1', oidPeriodoSiguiente);

    //Verificar si se validan los puntos (5), (6), (9), Consursos, Revision Concursos NX
    let validarCuadre = "SSSSS";
    let codigoPaisDefault = funciones.obtenerPaisDefault(objPedidoConsolidado.codigoPais);
    let calcularCuadre =  ''; //obtenerParametroPais(objPedidoConsolidado.codigoPais, codigoPaisDefault, "PED", "WSCalculaCuadre");

    if(calcularCuadre === ''){
        validarCuadre = 'SSSSS';
    }

    let validarCompuestaFija = validarCuadre.substr(0, 1);
    let validarCompuestaVariable = validarCuadre.substr(1,1);
    let validarCuadrePromocion = validarCuadre.substr(2,1);
    let validarCuadreConcursosRevision = validarCuadre.substr(3,1);
    let validarCuadreProductosNX = validarCuadre.substr(4,1);

    // 5. Compuesta fija
    if(validarCompuestaFija === 'S'){ 
        objPedidoConsolidado = await fCompuestaFija.validate(objPedidoConsolidado, oidPeriodoSiguiente); 
    }

    if(validarCompuestaVariable = 'S'){
        objPedidoConsolidado = await fCompuestaVariable.validate(objPedidoConsolidado, oidPeriodoSiguiente);
    }
    
    if(validarCuadrePromocion = 'S'){
        objPedidoConsolidado = await fCuadrePromocion.validate(objPedidoConsolidado, oidPeriodoSiguiente);
    }

    // Se aplica el Factor de Repeticion

    for (let posicion of objPedidoConsolidado.posiciones) 
    {
        posicion.unidadesPorAtender = String(Math.round(Number.parseFloat(posicion.unidadesPorAtender)
                                                        * Number.parseFloat(posicion.factorRepeticion)));
    }

    if(validarCuadreConcursosRevision === 'S')
    {
        objPedidoConsolidado = await fCuadreRevision.validate(objPedidoConsolidado, oidPeriodoSiguiente);
    }

    if(validarCuadreProductosNX === 'S')
    {
        objPedidoConsolidado = await fCuadreNX.validate(objPedidoConsolidado, oidPeriodoSiguiente); 
    }

    //Reemplazar productos
    objPedidoConsolidado = await fReemplazoProductos.reemplazarProductos(objPedidoConsolidado, '0', oidPeriodoSiguiente);

    //Limite venta
    arrayOidDetaOferta = new Array(objPedidoConsolidado.posiciones.length);
   
    objPedidoConsolidadoPosicion = new dto.PedidoConsolidadoPosicion();

    for(let p=0; p < objPedidoConsolidado.posiciones.length; p++){
        
        objPedidoConsolidadoPosicion = objPedidoConsolidado.posiciones[p];

        arrayOidDetaOferta[p] = { "oid" : parseInt(objPedidoConsolidadoPosicion.oidDetaOferta), "numeroUnidades" : objPedidoConsolidadoPosicion.unidadesPorAtender }
    }
    
    let lstLimiteVenta = await dbContext.getLimiteVenta(objPedidoConsolidado.codigoPais, objPedidoConsolidado.codigoCliente, objPedidoConsolidado.oidTerrAdmi, arrayOidDetaOferta);

    //Validar límite venta
    objPedidoConsolidadoPosicion = new dto.PedidoConsolidadoPosicion();

    for(let p=0; p < objPedidoConsolidado.posiciones.length; p++){
        objPedidoConsolidadoPosicion = objPedidoConsolidado.posiciones[p];

        let limiteVenta = fLimiteVenta.validarLimiteVenta(objPedidoConsolidado, objPedidoConsolidadoPosicion, lstLimiteVenta);

        if(limiteVenta != null && limiteVenta != '')
        {
            if(parseInt(limiteVenta) <= parseInt(objPedidoConsolidadoPosicion.unidadesPorAtender)){
                objPedidoConsolidadoPosicion.unidadesPorAtender = String(limiteVenta);
                objPedidoConsolidadoPosicion.indLimiteVenta = '1';
                objPedidoConsolidadoPosicion.posiciones = 'LIMITE DE VENTA';
            }       
        }
    }

    //SE ACTUALIZA LAS DESCRIPCIONES DE LOS PRODUCTOS
    objPedidoConsolidado = await actualizarDescripcionesSAP(objPedidoConsolidado);
    
    //SE ACTUALIZA LOS ALTERNATIVOS DE LOS PRODUCTOS
    objPedidoConsolidado = await actualizarAlternativos(objPedidoConsolidado);
    
    logger.stop('Completed Cuadre de Ofertas', performance);

    return objPedidoConsolidado;
};

async function execute(request, response) {
    try
    {
        response.json(await validate(request.body));
    }
    catch(exception)
    {
        response.send(exception);
    }
};

async function actualizarDescripcionesSAP(pedido) 
{
    let codigoSAPs = [];
    for(let posicion of pedido.posiciones)
    {
      codigoSAPs.push(posicion.codigoSap);
    }
    
    let listDescripciones = await dbContext.getDescripcionesProductos(pedido.codigoPais, codigoSAPs);
    
    // Datos de las Posiciones
    for (let posicion of pedido.posiciones)
    {
      for(let mapDescripcion of listDescripciones) 
      {
        if(posicion.codigoSap == mapDescripcion.CODIGOSAP) 
        {
          posicion.descripcionSap = String(mapDescripcion.DESCRIPCIONSAP);
          break;
        }
      }
    }

    return pedido;
}
  
async function actualizarAlternativos(pedido) 
{
    let oidDetaOfertas = [];
    
    for (let posicion of pedido.posiciones) 
    {
      oidDetaOfertas.push(posicion.oidDetaOferta);
    }
    
    let listAlternativos = await dbContext.getAlternativosProductos(pedido.codigoPais, oidDetaOfertas);
    
    // Datos de las Posiciones
    for (let posicion of pedido.posiciones) 
    {
      let listAlternativosAux = [];
      
      for(let mapAlternativo of listAlternativos) 
      {
        if(posicion.oidDetaOferta == String(mapAlternativo.oidDetaOfertaOriginal))
        {
          listAlternativosAux.push(mapAlternativo);
        }
      }
      
      let alternativos = [];
      
      for(let mapAlternativo of listAlternativosAux) 
      {
        let alternativo = new dto.PedidoConsolidadoAlternativo();
        
        alternativo.oidDetaOferta = String(mapAlternativo.OIDDETAOFERTA);
        alternativo.oidProducto = String(mapAlternativo.OIDPRODUCTO);
        alternativo.codigoSap = String(mapAlternativo.CODIGOSAP);
        alternativo.cuv = String(mapAlternativo.CUV);
        alternativo.numeroOrden = String(mapAlternativo.NUMEROORDEN);
        alternativos.push(alternativo);
      }
      
      posicion.alternativos = alternativos;
    }

    return pedido;
  }

module.exports = { validate: validate, execute: execute }