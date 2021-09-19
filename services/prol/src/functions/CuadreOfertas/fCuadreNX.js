'use strict'

const enumerable = require('node-enumerable');
const logger = require('./../../utility/Logger');
const dbContext = require('../../data-access/dbContextValidaciones');
const dto = require('../../persistence/pedidoConsolidado');

async function validate(pedido, oidPeriodoSiguiente) 
{
    let performance = logger.start("Starting Cuadre NX");

    let listPosiciones = [];
    
    // Recorremos las Posiciones
    for (let posicion of pedido.posiciones) 
    {
      listPosiciones.push(posicion);
    }

    //getNivelesOfertaProductosNX: fusion del query getNivelesOfertaNX y getProductosNivelNX
    //para evitar hacer invocaciones por cada oidNiveOferta        
    let listNivelesOfertaNX = await dbContext.getNivelesOfertaNX(pedido.codigoPais, pedido.oidPeriodo);
    //let listNivelesOfertaProductosNX = await dbContext.getNivelesOfertaProductosNX(pedido.codigoPais, pedido.oidPeriodo);
    //let listNivelesOfertaNX = enumerable.from(listNivelesOfertaProductosNX).distinctBy(x => x.OIDNIVEOFERTA).toArray();
    // Recorremos los niveles
    for (let mapNivel of listNivelesOfertaNX) 
    {
      //let performanceNivel = logger.start("Starting Nivel " + String(mapNivel.OIDNIVEOFERTA));      
      let oidNiveOferta = String(mapNivel.OIDNIVEOFERTA);
      let tipoNivel = String(mapNivel.TIPONIVEL);
      let listProductosNivelNX = await dbContext.getProductosNivelNX(pedido.codigoPais, oidNiveOferta);
      //let listProductosNivelNX = listNivelesOfertaProductosNX.filter(x => x.OIDNIVEOFERTA == oidNiveOferta);
      let sumaUnidades = 0;
      //Suma todas las unidades por atender de las posiciones cuyo oidDetaOferta pertenece a oidNiveOferta
      for (let mapProductoNivelNX of listProductosNivelNX) 
      {
        let oidDetaOferta = String(mapProductoNivelNX.OIDDETAOFERTA);
        //logger.debug("Detalle Oferta " + oidDetaOferta);
        for(let posicion of listPosiciones)
        {
          if (oidDetaOferta == String(posicion.oidDetaOferta)) 
          {
            sumaUnidades = sumaUnidades + Number.parseFloat(posicion.unidadesPorAtender);
          }
        }
        //console.log("Suma " + oidDetaOferta + " " + String(sumaUnidades));
      }

      if (sumaUnidades == 0) 
      {
        //logger.stop('Next Iteration Nivel ' + String(mapNivel.OIDNIVEOFERTA), performanceNivel);
        continue;
      }

      
      if ("1" == tipoNivel)
      {
        for (let mapProductoNivelNX of listProductosNivelNX) 
        {
          let oidDetaOferta = String(mapProductoNivelNX.OIDDETAOFERTA);
          
          for(let posicion of listPosiciones)
          {
            if (oidDetaOferta == String(posicion.oidDetaOferta))
            {
              posicion.precioCatalogo = "0";
              posicion.numUnidOrig = posicion.unidadesPorAtender;
              posicion.valCodiOrig = posicion.cuv;
            }
          }
          
        }
      }

      let listRangoNivelNX = await dbContext.getRangoNivelNX(pedido.codigoPais, oidNiveOferta);
      if (listRangoNivelNX != null) 
      {
        for (let mapRangoNivelNX of listRangoNivelNX) 
        {
          let factorRepeticion = String(mapRangoNivelNX.FACTORREPETICION);
          let precioUnitario = null; 
          let oidRango = String(mapRangoNivelNX.OIDRANGO);
          
          if(mapRangoNivelNX.PRECIOUNITARIO !=null)
          {
            precioUnitario = String(mapRangoNivelNX.PRECIOUNITARIO);
          }
          
          let temp = Number.parseInt(sumaUnidades / Number.parseFloat(factorRepeticion)) * Number.parseInt(factorRepeticion);
          let temp2 = Number.parseInt(sumaUnidades / Number.parseFloat(factorRepeticion));
          let temp_p = temp;
          
          if ("1" == tipoNivel) 
          {
            let mapUnidades = new Map();
            let listUnidades = [];
            
            for (let mapProductoNivelNX of listProductosNivelNX)
            {
              let oidDetaOferta = String(mapProductoNivelNX.OIDDETAOFERTA);
              
              for(let posicion of listPosiciones)
              {
                if (oidDetaOferta == posicion.oidDetaOferta) 
                {
                  if (Number.parseFloat(posicion.precioCatalogo) == 0) 
                  {
                    
                    if (mapUnidades.has(posicion.unidadesPorAtender)) 
                    {
                      let unidades = String(mapUnidades.get(posicion.unidadesPorAtender));
                      mapUnidades.set(posicion.unidadesPorAtender, unidades + ";" + posicion.oidProducto
                          + "__" + posicion.oidDetaOferta + "__" + posicion.unidadesPorAtender);
                    } 
                    else 
                    {
                      mapUnidades.set(
                          posicion.unidadesPorAtender,
                          posicion.oidProducto + "__" + posicion.oidDetaOferta + "__"
                              + posicion.unidadesPorAtender);
                    }
                    
                  }
                }
              }
            }
            
            let mapUnidadesReversed = new Map([...mapUnidades].sort((a, b) => a[1] === b[1] ? 0 : a[1] > b[1] ? 1 : -1));
            let iterator = mapUnidadesReversed[Symbol.iterator]();
            var itemUnidades;
      
            // Actualizamos los grupos Ordenados en una lista
            while(itemUnidades = iterator.next().value)
            {
              logger.debug(itemUnidades);
              let key = itemUnidades[0];
              let valor = String(itemUnidades[1]);
              
              if (valor.indexOf(";") > 0) 
              {
                let st = valor.split(";");
                for(let elemento of st)
                {
                  logger.debug("Unidades CX -> " + key.toString() + "__" + elemento);
                  listUnidades.push(elemento);
                }
              } 
              else 
              {
                logger.debug("Unidades CX -> " + key.toString() + "__" + valor);
                listUnidades.push(valor);              
              }
            }
            
            for (let unidad of listUnidades) 
            {
              let st = unidad.split("__");
              
              let oidProducto = st[0];
              let oidDetaOferta = st[1];
              let unidadesPorAtender = st[2];
              
              if (Number.parseInt(factorRepeticion) > 1) 
              {
                
                if (temp > 0) 
                {
                  
                  if (Number.parseInt(unidadesPorAtender) <= temp) 
                  {
                    //SELECT
                    let querymapCuvNX = await dbContext.getCuvNX(pedido.codigoPais, oidNiveOferta, oidProducto, factorRepeticion);
                    let mapCuvNX = querymapCuvNX[0];
                    let oidDetaOfertaNX = String(mapCuvNX.OIDDETAOFERTA);
                    let cuv = String(mapCuvNX.CUV);
                    let oidFormaPago = null;
                    
                    if (mapCuvNX.OIDFORMAPAGO != null) 
                    {
                      oidFormaPago = String(mapCuvNX.OIDFORMAPAGO);
                    }
                    
                    //UPDATE
                    for(let posicion of listPosiciones)
                    {
                      if (oidDetaOferta == posicion.oidDetaOferta) 
                      {
                        if (Number.parseFloat(posicion.precioCatalogo) == 0) 
                        {
                          posicion.precioCatalogo = precioUnitario;
                          posicion.precioUnitario = precioUnitario;
                          posicion.precioContable = "0";
                          posicion.oidDetaOferta = oidDetaOfertaNX;
                          posicion.cuv = cuv;
                          posicion.oidFormaPago = oidFormaPago;
                          posicion.oidNiveOferta = oidNiveOferta;
                          posicion.oidNiveOfertaRango = oidRango;
                        }
                      }
                    }
                    
                    temp = temp - Number.parseInt(unidadesPorAtender);
                    sumaUnidades = sumaUnidades - Number.parseInt(unidadesPorAtender);
                  } 
                  else 
                  {
                    //SELECT
                    let queryResultmapCuvNX = await dbContext.getCuvNX(pedido.codigoPais, oidNiveOferta, oidProducto, factorRepeticion);
                    let mapCuvNX = queryResultmapCuvNX[0];
                    let oidDetaOfertaNX = String(mapCuvNX.OIDDETAOFERTA);
                    let cuv = String(mapCuvNX.CUV);
                    let oidFormaPago = null;
                    
                    if (mapCuvNX.OIDFORMAPAGO != null) 
                    {
                      oidFormaPago = String(mapCuvNX.OIDFORMAPAGO);
                    }
                    
                    // actualiza el registro con el que se evaluo                    
                    //UPDATE
                    for(let posicion of listPosiciones)
                    {
                      if (oidDetaOferta == posicion.oidDetaOferta) 
                      {
                        if (Number.parseFloat(posicion.precioCatalogo) == 0) 
                        {
                          posicion.precioCatalogo = precioUnitario;
                          posicion.precioUnitario = precioUnitario;
                          posicion.precioContable = "0";
                          //posicion.unidadesDemandadas = String(temp);
                          posicion.unidadesPorAtender = String(temp);
                          posicion.oidDetaOferta = oidDetaOfertaNX;
                          posicion.cuv = cuv;
                          posicion.oidFormaPago = oidFormaPago;
                          posicion.oidNiveOferta = oidNiveOferta;
                          posicion.oidNiveOfertaRango = oidRango;
                        }
                      }
                    }
                    
                    sumaUnidades = sumaUnidades - temp;
                    
                    // Ingresa un registro con la diferencia para ser evaluado posteriormente                    
                    //INSERT
                    for(let posicion of listPosiciones)
                    {
                      if (oidDetaOfertaNX == (posicion.oidDetaOferta))
                      {
                        let posicionAux = new dto.PedidoConsolidadoPosicion();
                        
                        posicionAux.cuv = cuv;
                        posicionAux.unidadesDemandadas = "0";
                        posicionAux.unidadesPorAtender = String(Number.parseInt(unidadesPorAtender) - temp);
                        
                        let queryResultmapDatosPosicion = await dbContext.getDatosPosicion(pedido.codigoPais, pedido.codigoPeriodo, posicionAux.cuv);
                        let mapDatosPosicion = queryResultmapDatosPosicion[0];
                        posicionAux.oidOferta = String(mapDatosPosicion.OIDOFERTA);
                        posicionAux.oidDetaOferta = oidDetaOfertaNX;
                        posicionAux.oidEstrategia = String(mapDatosPosicion.OIDESTRATEGIA);
                        posicionAux.oidFormaPago = oidFormaPago;
                        if (mapDatosPosicion.PAGINA != null) { posicionAux.pagina = String(mapDatosPosicion.PAGINA); }
                        if (mapDatosPosicion.OIDCATALOGO != null) { posicionAux.oidCatalogo = String(mapDatosPosicion.OIDCATALOGO); }
                        if (mapDatosPosicion.PRECIOUNITARIO != null) { posicionAux.precioUnitario = String(mapDatosPosicion.PRECIOUNITARIO); }
                        if (mapDatosPosicion.PRECIOCATALOGO != null) { posicionAux.precioCatalogo = String(mapDatosPosicion.PRECIOCATALOGO); }
                        if (mapDatosPosicion.PRECIOCONTABLE != null) { posicionAux.precioContable = String(mapDatosPosicion.PRECIOCONTABLE); }
                        if (mapDatosPosicion.FACTOREPETICION != null) { posicionAux.factorRepeticion = String(mapDatosPosicion.FACTORREPETICION); }
                        if (mapDatosPosicion.OIDGRUPOOFERTA != null) { posicionAux.oidGrupoOferta = String(mapDatosPosicion.OIDGRUPOOFERTA); }
                        if (mapDatosPosicion.OIDINDICADORCUADRE != null) { posicionAux.oidIndicadorCuadre = String(mapDatosPosicion.OIDINDICADORCUADRE); }
                        if (mapDatosPosicion.FACTORCUADRE != null) { posicionAux.factorCuadre = String(mapDatosPosicion.FACTORCUADRE); }
                        if (mapDatosPosicion.RANKING != null) { posicionAux.ranking = String(mapDatosPosicion.RANKING); }
                        posicionAux.oidProducto = String(mapDatosPosicion.OIDPRODUCTO);
                        if (mapDatosPosicion.CODSAP != null) { posicionAux.codigoSap = String(mapDatosPosicion.CODSAP); }
                        if (mapDatosPosicion.NUMEROSECCIONDETALLE != null) { posicionAux.numeroSeccionDetalle = String(mapDatosPosicion.NUMEROSECCIONDETALLE); }
                        if (mapDatosPosicion.PRECIOPUBLICO != null) { posicionAux.precioPublico = String(mapDatosPosicion.PRECIOPUBLICO); }
                        if (mapDatosPosicion.INDICADORRECUPERACION != null) { posicionAux.indicadorRecuperacion = String(mapDatosPosicion.INDICADORRECUPERACION); }
                        
                        posicionAux.precioUnitario = "0";
                        posicionAux.precioCatalogo = "0";
                        posicionAux.precioContable = "0";
                        
                        posicionAux.oidSubtipoPosicion = "22";
                        posicionAux.oidTipoPosicion = "1";
                        
                        posicionAux.oidNiveOferta = oidNiveOferta;
                        posicionAux.oidNiveOfertaRango = oidRango;
                        
                        posicionAux.numUnidOrig = posicion.numUnidOrig;
                        posicionAux.valCodiOrig = posicion.valCodiOrig;
                        
                        listPosiciones.push(posicionAux);
                        logger.debug("Datos de la Posicion CuadreNX: " + posicionAux);
                        
                        break;
                      }
                    }
                    
                    break;
                  }
                }
                
              } 
              else 
              {

                let queryResultmapCuvNX = await dbContext.getCuvNX(pedido.codigoPais, oidNiveOferta, oidProducto, factorRepeticion);
                let mapCuvNX = queryResultmapCuvNX[0];

                let oidDetaOfertaNX = String(mapCuvNX.OIDDETAOFERTA);
                let cuv = String(mapCuvNX.CUV);
                let oidFormaPago = null;
                
                if (oidFormaPago != null) 
                {
                  oidFormaPago = String(mapCuvNX.OIDFORMAPAGO);
                }
                
                for(let posicion of listPosiciones)
                {
                  if (oidDetaOferta == posicion.oidDetaOferta) 
                  {
                    if (Number.parseFloat(posicion.precioCatalogo) == 0) 
                    {
                      posicion.precioCatalogo = precioUnitario;
                      posicion.precioUnitario = precioUnitario;
                      posicion.precioContable = "0";
                      posicion.oidDetaOferta = oidDetaOfertaNX;
                      posicion.cuv = cuv;
                      posicion.oidFormaPago = oidFormaPago;
                      posicion.oidNiveOferta = oidNiveOferta;
                      posicion.oidNiveOfertaRango = oidRango;
                    }
                  }
                }
              }
            }
            
          } 
          else 
          {
            sumaUnidades = sumaUnidades - temp;
          }
          
          //Productos Gratis
          if (temp_p > 0) 
          {
            let listPosicionesAux = await dbContext.getProductosGratisNX(pedido.codigoPais, oidRango);
            
            if (listPosicionesAux != null) 
            {
              for (let mapDatosPosicion of listPosicionesAux) 
              {
                let posicionAux = new dto.PedidoConsolidadoPosicion();

                posicionAux.cuv = String(mapDatosPosicion.CUV);
                //correccion
                //posicionAux.unidadesDemandadas = "0";
                //posicionAux.unidadesPorAtender = String(mapDatosPosicion.UNIDADES);
                posicionAux.unidadesDemandadas = temp2;
                posicionAux.unidadesPorAtender = String(mapDatosPosicion.UNIDADES * temp2);
                
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
                
                posicionAux.oidNiveOferta = String(mapDatosPosicion.OIDNIVEOFERTA);
                posicionAux.oidNiveOfertaRango = String(mapDatosPosicion.OIDRANGO);
                
                listPosiciones.push(posicionAux);
                logger.debug("Datos de la Posicion NX: " + posicionAux.cuv);
              }
            }
          }
        }
        
      }

      //logger.stop('Completed Nivel ' + String(mapNivel.OIDNIVEOFERTA), performanceNivel);
    }
    
    pedido.posiciones = listPosiciones;

    logger.stop('Completed Cuadre NX', performance);

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