'use strict'

const logger = require('./../../utility/Logger');

const dbContext = require('../../data-access/dbContextValidaciones');
const dto = require('../../persistence/pedidoConsolidado');

async function reemplazarProductos(objPedidoConsolidado, tipoReemplazo, oidPeriodoSiguiente)
{
    let performance = logger.start("Starting Reemplazo de Productos");

    let listReemplazos = [];
    
    // Obtenemos la descripcion del Mensaje de Reemplazo
    let descripcionReemplazo = "Reemp."; // procesoPEDCuadreOfertasDAO.getParametroImpresion(criteriaParametro);
    
    // Recorremos las Posiciones
    for (let posicion of objPedidoConsolidado.posiciones) 
    {
      listReemplazos.push(posicion);
    }
    
    let cuvs = [];
    for (let posicion of objPedidoConsolidado.posiciones) 
    {
      cuvs.push(posicion.cuv);
    }
    
    //Obtener posiciones de reemplazo
    let listPosiciones = await dbContext.getDatosPosicionReemplazo(objPedidoConsolidado.codigoPais, objPedidoConsolidado.oidPeriodo, objPedidoConsolidado.oidCliente, objPedidoConsolidado.oidTerrAdmi, tipoReemplazo, cuvs);        
    
    // Recorremos las Posiciones
    for (let posicionAux of objPedidoConsolidado.posiciones) 
    {
      let posicion = new dto.PedidoConsolidadoPosicion();
      //final Map mapDatosPosicion = procesoPEDCuadreOfertasDAO.getDatosPosicionReemplazo(criteria);
      
      let mapDatosPosicion = null;
      if(listPosiciones != null) 
      {
        for(let mapDatosPosicionAux of listPosiciones) 
        {
          if(posicionAux.cuv == mapDatosPosicionAux.CUVORIGINAL) 
          {
            mapDatosPosicion = mapDatosPosicionAux;
            break;
          }
        }
      }
      
      if (mapDatosPosicion != null) 
      {
        posicion.cuv = mapDatosPosicion.CUV;
        posicion.unidadesDemandadas = "0";
        
        posicion.oidOferta = String(mapDatosPosicion.OIDOFERTA);
        posicion.oidDetaOferta = String(mapDatosPosicion.OIDDETAOFERTA);
        posicion.oidEstrategia = String(mapDatosPosicion.OIDESTRATEGIA);
        if (mapDatosPosicion.OIDFORMAPAGO != null) { posicion.oidFormaPago = mapDatosPosicion.OIDFORMAPAGO; }
        if (mapDatosPosicion.PAGINA != null) { posicion.pagina = String(mapDatosPosicion.PAGINA); }
        if (mapDatosPosicion.OIDCATALOGO != null) { posicion.oidCatalogo = String(mapDatosPosicion.OIDCATALOGO); }
        if (mapDatosPosicion.PRECIOUNITARIO != null) { posicion.precioUnitario = mapDatosPosicion.PRECIOUNITARIO; }
        if (mapDatosPosicion.PRECIOCATALOGO != null) { posicion.precioCatalogo = mapDatosPosicion.PRECIOCATALOGO; }
        if (mapDatosPosicion.PRECIOCONTABLE != null) { posicion.precioContable = mapDatosPosicion.PRECIOCONTABLE; }

        if(tipoReemplazo == "0") 
        {
          if (mapDatosPosicion.FACTORREPETICION != null) { posicion.factorRepeticion = mapDatosPosicion.FACTORREPETICION; }
        } 
        else 
        {
          posicion.factorRepeticion = "1";
        }
        
        posicion.unidadesPorAtender = String(Math.round(parseFloat(posicionAux.unidadesPorAtender) * parseFloat(posicion.factorRepeticion)));
        
        if (mapDatosPosicion.OIDGRUPOOFERTA != null) { posicion.oidGrupoOferta = mapDatosPosicion.OIDGRUPOOFERTA; }
        if (mapDatosPosicion.OIDINDICADORCUADRE != null) { posicion.oidIndicadorCuadre = mapDatosPosicion.OIDINDICADORCUADRE; }
        if (mapDatosPosicion.FACTORCUADRE != null) { posicion.factorCuadre = mapDatosPosicion.FACTORCUADRE; }
        if (mapDatosPosicion.RANKING != null) { posicion.ranking = String(mapDatosPosicion.RANKING); }
        posicion.oidProducto = String(mapDatosPosicion.OIDPRODUCTO);
        if (mapDatosPosicion.CODSAP != null) { posicion.codigoSap = mapDatosPosicion.CODSAP; }
        if (mapDatosPosicion.NUMEROSECCIONDETALLE != null) { posicion.numeroSeccionDetalle = String(mapDatosPosicion.NUMEROSECCIONDETALLE); }
        if (mapDatosPosicion.PRECIOPUBLICO != null) { posicion.precioPublico = mapDatosPosicion.PRECIOPUBLICO; }
        if (mapDatosPosicion.INDICADORRECUPERACION != null) { posicion.indicadorRecuperacion = mapDatosPosicion.INDICADORRECUPERACION; }
        
        posicion.oidSubtipoPosicion = "2029";
        posicion.oidTipoPosicion = "4";
        
        listReemplazos.push(posicion);
        logger.debug('Reemplazo de Posicion: ' + posicion.cuv);
        
        // Seteamos los Productos que fueron Reemplazados
        posicionAux.unidadesPorAtender = "0";
        posicionAux.oidSubtipoPosicion = "2030";
        posicionAux.oidTipoPosicion = "4";
        posicionAux.observaciones = descripcionReemplazo + " " + posicion.cuv;
      }
    }

    objPedidoConsolidado.posiciones = listReemplazos;    

    logger.stop('Completed Reemplazo de Productos', performance);

    return objPedidoConsolidado;    
}

async function execute(request, response) 
{
  try
  {
    response.json(await reemplazarProductos(request.body));
  }
  catch(exception)
  {
    response.send(exception); //Cambiar por mensaje de error
  }
};

module.exports = { reemplazarProductos: reemplazarProductos, execute: execute }