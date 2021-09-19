'use strict'

const enumerable = require('node-enumerable');
const logger = require('./../../utility/Logger');
const dbContext = require('../../data-access/dbContextValidaciones');
const dto = require('../../persistence/pedidoConsolidado');

async function validate(pedido, oidPeriodoSiguiente) 
{
    let performance = logger.start("Starting Cuadre de Revisión");

    let listPosiciones = [];
    
    // Recorremos las Posiciones
    for(let posicion of pedido.posiciones)
    {
      listPosiciones.push(posicion);
    }

    //getNivelesOfertaProductos: fusion del query getNivelesOferta y getProductosNivel 
    //para evitar hacer invocaciones por cada oidNiveOferta    
    let listNivelesOferta = await dbContext.getNivelesOferta(pedido.codigoPais, pedido.oidPeriodo);
    //let listNivelesOfertaProductos = await dbContext.getNivelesOfertaProductos(pedido.codigoPais, pedido.oidPeriodo);
    //let listNivelesOferta = enumerable.from(listNivelesOfertaProductos).distinctBy(x => x.OIDNIVEOFERTA).toArray();

    // Recorremos los niveles
    for(let mapNivel of listNivelesOferta)
    {
      let oidNiveOferta = String(mapNivel.OIDNIVEOFERTA);
      let tipoCuadre = String(mapNivel.TIPOCUADRE);
      let tipoNivel = String(mapNivel.TIPONIVEL);
      
      let listProductosNivel = await dbContext.getProductosNivel(pedido.codigoPais, oidNiveOferta);
      //let listProductosNivel = listNivelesOfertaProductos.filter(x => x.OIDNIVEOFERTA == oidNiveOferta);

      let suma = 0;
      
      for(let mapProductoNivel of listProductosNivel)
      {
        let oidDetaOferta = String(mapProductoNivel.OIDDETAOFERTA);
        
        for(let posicion of pedido.posiciones)
        {
          if (oidDetaOferta == String(posicion.oidDetaOferta)) 
          {
            if ("1" == String(tipoCuadre)) 
            {
              suma = suma + Number.parseFloat(posicion.unidadesPorAtender);
            } 
            else 
            {
              suma =
                  suma
                      + (Number.parseFloat(posicion.unidadesPorAtender) * Number.parseFloat(posicion
                          .precioCatalogo));
            }
          }
        }
      }
      
      let mapRangosNivel = await dbContext.getRangoNivel(pedido.codigoPais, oidNiveOferta, suma);
      if (mapRangosNivel != null && mapRangosNivel.length > 0) 
      {
        let mapRangoNivel = mapRangosNivel[0];
        let precio = null;
        let oidRango = String(mapRangoNivel.OIDRANGO);
        
        if (mapRangoNivel.PRECIO != null) { precio = String(mapRangoNivel.PRECIO); }
        
        for (let mapProductoNivel of listProductosNivel) 
        {
          let oidDetaOferta = String(mapProductoNivel.OIDDETAOFERTA);
          
          for(let posicion of pedido.posiciones)
          {
            if (oidDetaOferta == String(posicion.oidDetaOferta)) 
            {
              if ("1" == tipoNivel) 
              {
                posicion.precioUnitario = precio;
                posicion.precioCatalogo = precio;
                posicion.precioContable = "0";
              }
              
              posicion.oidNiveOferta = oidNiveOferta;
              posicion.oidNiveOfertaRango = oidRango;
            }
          }
        }
        
        let listPosicionesAux = await dbContext.getProductosGratis(pedido.codigoPais, oidRango);
        
        if (listPosicionesAux != null) 
        {
          for (let mapDatosPosicion of listPosicionesAux) 
          {
            let posicionAux = new dto.PedidoConsolidadoPosicion();

            posicionAux.cuv = String(mapDatosPosicion.CUV);
            posicionAux.unidadesDemandadas = "0";
            posicionAux.unidadesPorAtender = String(mapDatosPosicion.UNIDADES);
            
            posicionAux.oidOferta = String(mapDatosPosicion.OIDOFERTA);
            posicionAux.oidDetaOferta = String(mapDatosPosicion.OIDDETAOFERTA);
            posicionAux.oidEstrategia = String(mapDatosPosicion.OIDESTRATEGIA);
            if (mapDatosPosicion.OIDFORMAPAGO != null) { posicionAux.oidFormaPago = String(mapDatosPosicion.OIDFORMAPAGO); }
            if (mapDatosPosicion.PAGINA != null) { posicionAux.pagina = String(mapDatosPosicion.PAGINA); }
            if (mapDatosPosicion.OIDCATALOGO != null) { posicionAux.oidCatalogo = String(mapDatosPosicion.OIDCATALOGO); }
            if (mapDatosPosicion.PRECIOUNITARIO != null) { posicionAux.precioUnitario = String(mapDatosPosicion.PRECIOUNITARIO); }
            if (mapDatosPosicion.PRECIOCATALOGO != null) { posicionAux.precioCatalogo = String(mapDatosPosicion.PRECIOCATALOGO); }
            if (mapDatosPosicion.PRECIOCONTABLE != null) { posicionAux.precioContable = String(mapDatosPosicion.PRECIOCONTABLE); }
            if (mapDatosPosicion.FACTORREPETICION != null) { posicionAux.factorRepeticion = String(mapDatosPosicion.FACTORREPETICION); }
            if (mapDatosPosicion.OIDGRUPOOFERTA != null) { posicionAux.oidGrupoOferta = String(mapDatosPosicion.OIDGRUPOOFERTA); }
            if (mapDatosPosicion.OIDINDICADORCUADRE != null) { posicionAux.oidIndicadorCuadre = String(mapDatosPosicion.OIDINDICADORCUADRE); }
            if (mapDatosPosicion.FACTORCUADRE != null) { posicionAux.factorCuadre = String(mapDatosPosicion.FACTORCUADRE); }
            if (mapDatosPosicion.RANKING != null) { posicionAux.ranking = String(mapDatosPosicion.RANKING); }
            posicionAux.oidProducto = String(mapDatosPosicion.OIDPRODUCTO);
            if (mapDatosPosicion.CODSAP != null) { posicionAux.codigoSap = String(mapDatosPosicion.CODSAP); }
            if (mapDatosPosicion.NUMEROSECCIONDETALLE != null) { posicionAux.numeroSeccionDetalle = String(mapDatosPosicion.NUMEROSECCIONDETALLE); }
            if (mapDatosPosicion.PRECIOPUBLICO != null) { posicionAux.precioPublico = String(mapDatosPosicion.PRECIOPUBLICO); }
            if (mapDatosPosicion.INDICADORRECUPERACION != null) { posicionAux.indicadorRecuperacion = String(mapDatosPosicion.INDICADORRECUPERACION); }
            
            posicionAux.oidSubtipoPosicion = "22";
            posicionAux.oidTipoPosicion = "1";
            
            posicionAux.oidNiveOferta = oidNiveOferta;
            posicionAux.oidNiveOfertaRango =  String(mapDatosPosicion.OIDRANGO);
            posicionAux.oidNiveOfertaGratis = String(mapDatosPosicion.OIDNIVEOFERTA);
            
            listPosiciones.push(posicionAux);
            logger.debug("Nueva Posicion en CuadreRevision: " + posicionAux.cuv);
          }
        }
      }
      
    }
    
    pedido.posiciones = listPosiciones;

    logger.stop('Completed Cuadre de Revisión', performance);

    return pedido;
}

async function execute(request, response) 
{
  try
  {
    response.json(await validate(request.body));
  }
  catch(exception)
  {
    response.send(exception); 
  }
};

module.exports = { validate: validate, execute: execute }