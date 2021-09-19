'use strict'

const enumerable = require('node-enumerable');
const logger = require('./../../utility/Logger');
const dbContext = require('../../data-access/dbContextValidaciones');
const dto = require('../../persistence/pedidoConsolidado');
const utils = require('../../utility/funciones');

async function validate(pedido, oidPeriodoSiguiente)
{
    let performance = logger.start("Starting Cuadre de Promoción");

    let listPosiciones = [];
    let listOfertas = [];

    //Crear Lista de Cuvs de Estrategias que no sean del 2005 2006 2007
    //para reducir invocaciones en la funcion obtenerMontoPromocion
    let cuvsForPromocion2005 = [];    
    for (let posicion of pedido.posiciones) 
    {
      if (!("2005" == String(posicion.oidEstrategia) 
          || "2006" == String(posicion.oidEstrategia) 
          || "2007" == String(posicion.oidEstrategia) ) ) 
      {
        //totalCuvs = totalCuvs + 1;
        cuvsForPromocion2005.push(posicion.cuv);
      }
    }

    //let mapPromocion;
    let queryResultmapPromocion;
    let queryresultAllCuvsPromocion2005;
    //Obtener promociones de posiciones con Estrategia 2005 o 2006
    let haveEstrategias2005 = pedido.posiciones.filter(x => String(x.oidEstrategia) == "2005" || String(x.oidEstrategia) == "2006");
    if (haveEstrategias2005.length > 0)
    {
      let oidOfertas2005 = enumerable.from(haveEstrategias2005).select(x => x.oidOferta).toArray();
      queryResultmapPromocion = await dbContext.getPromociones(pedido.codigoPais, oidOfertas2005);
      //mapPromocion = queryResultmapPromocion[0];

      //let oidPromociones2005 = mapPromocion.OIDPROMOCION;
      let oidPromociones2005 = enumerable.from(queryResultmapPromocion).select(x => x.OIDPROMOCION).toArray();
      queryresultAllCuvsPromocion2005 = await dbContext.getCuvsPromocion(pedido.codigoPais, oidPromociones2005, cuvsForPromocion2005);
    }
    
    // Recorremos las Posiciones de tipo Estrategia (2005, 2006)
    for (let posicion of pedido.posiciones) 
    {
      if ("2005" == String(posicion.oidEstrategia) || "2006" == String(posicion.oidEstrategia))
      {
        let mapPromocion = queryResultmapPromocion.find(x => x.OIDPROMOCION == posicion.oidPromocion);
        if (mapPromocion != null && mapPromocion != undefined) 
        {
          let oidPromocion = String(mapPromocion.OIDPROMOCION);
          let indicadorCuadre = String(mapPromocion.INDICADORCUADRE);
          let factorCuadre = String(mapPromocion.FACTORCUADRE);
          
          let montoPromocion = await obtenerMontoPromocion(pedido, queryresultAllCuvsPromocion2005, oidPromocion, indicadorCuadre);
          let unidadesReales = Number.parseInt(montoPromocion / Number.parseFloat(factorCuadre));
          
          if (Number.parseInt(posicion.unidadesPorAtender) > unidadesReales) 
          {
            posicion.unidadesPorAtender = String(unidadesReales);
            if (unidadesReales == 0) {
              posicion.observaciones = "PROMOCION NO CUMPLE";
            }
            
            logger.debug("Datos de la Promocion (2005, 2006): " + posicion.cuv);
          }
        }
      }
    }
    
    // Recorremos las Posiciones y obtenemos los Oids Ofertas de Compuesta
    // Variable relacionado a Promociones
    for (let posicion of pedido.posiciones) 
    {
      if ("2007" == String(posicion.oidEstrategia))
      {
        if (!listOfertas.includes(posicion.oidOferta)) {
          listOfertas.push(posicion.oidOferta);
        }
      }
    }
    
   
    // Recorremos los Oids Ofertas de Compuesta Variable relacionado a
    // Promociones
    for (let oidOferta of listOfertas) 
    {
      let listGruposOrdenados = [];
      
      // Recuperamos los grupos
      //let mapGruposOrdenados = new TreeMap(java.util.Collections.reverseOrder());
      let mapGruposOrdenados = new Map();
      let listPromocionesCV = await dbContext.getPromocionesCV(pedido.codigoPais, oidOferta);
      

      //Crear Lista de Cuvs a consultar por promocion
      let cuvsForPromocionCVO = [];    
      for (let posicion of pedido.posiciones) 
      {
        if (!("2005" == String(posicion.oidEstrategia) 
        || "2006" == String(posicion.oidEstrategia) 
        || "2007" == String(posicion.oidEstrategia))) 
        {
          //totalCuvs = totalCuvs + 1;
          cuvsForPromocionCVO.push(posicion.cuv);
        }
      }

      let oidPromocionesCVO = enumerable.from(listPromocionesCV).select(x => x.OIDPROMOCION).toArray();
      let queryresultAllCuvsPromocionCVO = await dbContext.getCuvsPromocion(pedido.codigoPais, oidPromocionesCVO, cuvsForPromocionCVO);


      // Recorremos los grupos
      let numeroUnidades = 0;
      for (let mapPromocionCV of listPromocionesCV) 
      {
        // Por cada Grupo obtenemos los CUVs relacionados, lo recorremos y
        // contamos las unidades por atender
        let oidGrupoOferta = String(mapPromocionCV.OIDGRUPOOFERTA);
        let oidPromocion = String(mapPromocionCV.OIDPROMOCION);
        let indicadorCuadre = String(mapPromocionCV.INDICADORCUADRE);
        let factorCuadre = String(mapPromocionCV.FACTORCUADRE);
        
        for (let posicion of pedido.posiciones) {
          if (oidOferta == String(posicion.oidOferta) && oidGrupoOferta == String(posicion.oidGrupoOferta)) {
            numeroUnidades = numeroUnidades + Number.parseInt(posicion.unidadesPorAtender);
          }
        }
        
        let montoPromocion = await obtenerMontoPromocion(pedido, queryresultAllCuvsPromocionCVO, oidPromocion, indicadorCuadre);
        let unidadesReales = Number.parseInt(montoPromocion / Number.parseFloat(factorCuadre));
        
        if (mapGruposOrdenados.has(numeroUnidades)) 
        {
          let valorCuadre = String(mapGruposOrdenados.get(numeroUnidades));
          mapGruposOrdenados.set(numeroUnidades, valorCuadre + ";" + oidGrupoOferta + "__" + numeroUnidades + "__"
              + unidadesReales);
        } 
        else 
        {
          mapGruposOrdenados.set(numeroUnidades, oidGrupoOferta + "__" + numeroUnidades + "__" + unidadesReales);
        }
      }
      
      // Actualizamos los grupos Ordenados en una lista
      let mapGruposOrdenadosReversed = new Map([...mapGruposOrdenados].sort((a, b) => a[1] === b[1] ? 0 : a[1] > b[1] ? 1 : -1));
      let iterator = mapGruposOrdenadosReversed[Symbol.iterator]();  
      let itemGrupoOrdenado;

      while(itemGrupoOrdenado = iterator.next().value)
      {
        logger.debug(itemGrupoOrdenado);
        let key = itemGrupoOrdenado[0];
        let valor = String(itemGrupoOrdenado[1]);
        
        if (valor.indexOf(";") > 0) 
        {
          //Multiples values
          let valores = valor.split(";");
          for(let elemento of valores)
          {
            logger.debug("Grupo Ordenado Promocion -> " + key.toString() + "__" + elemento);
            listGruposOrdenados.push(elemento);
          }
        } 
        else 
        {
          //Single value
          listGruposOrdenados.push(valor);
          logger.debug("Grupo Ordenado Promocion -> " + key.toString() + "__" + valor);
        }
        
      }
      
      // Recorremos los grupos Ordenados por su Factor de Cuadre
      for (let elemento of listGruposOrdenados) 
      {
        //let st = new StringTokenizer(elemento, "__");
        let st = elemento.split("__");
        
        let oidGrupoOferta = st[0];
        let totalUnidades = Number.parseInt(st[1]);
        let unidadesReales = Number.parseInt(st[2]);
        
        if (unidadesReales == 0) 
        {
          for (let posicion of pedido.posiciones) 
          {
            if (oidOferta == String(posicion.oidOferta) && oidGrupoOferta == String(posicion.oidGrupoOferta)) 
            {
              posicion.unidadesPorAtender = "0";
              posicion.observaciones = "PROMOCION NO CUMPLE";
            }
          }
        } 
        else 
        {
          if (unidadesReales < totalUnidades) 
          {
            let diferencia = totalUnidades - unidadesReales;
            let cuv = "";
            let unidadesPorAtender = 0;
            
            while (diferencia > 0) {
              // ubicamos al cuv del grupo con la menor cantidad de unidades a atender
              for (let posicion of pedido.posiciones) {
                if (oidOferta == String(posicion.oidOferta) && oidGrupoOferta == String(posicion.oidGrupoOferta)) {
                  if (unidadesPorAtender < Number.parseInt(posicion.unidadesPorAtender)) {
                    unidadesPorAtender = Number.parseInt(posicion.unidadesPorAtender);
                    cuv = posicion.cuv;
                  }
                }
              }
              if (diferencia > unidadesPorAtender) 
              {
                diferencia = diferencia - unidadesPorAtender;
                
                for (let posicion of pedido.posiciones) 
                {
                  if (cuv == String(posicion.cuv)) {
                    posicion.unidadesPorAtender = "0";
                    posicion.observaciones = "PROMOCION NO CUMPLE";
                  }
                }
              } 
              else 
              {
                for (let posicion of pedido.posiciones) 
                {                 
                  if (cuv == String(posicion.cuv)) 
                  {
                    posicion.unidadesPorAtender = (String(Math.round(Number.parseFloat(posicion
                        .unidadesPorAtender) - diferencia)));
                    posicion.observaciones = "PROMOCION NO CUMPLE";
                  }
                }
                diferencia = 0;
              }
            }

          }
        }
      }
    }
    
    pedido = await compuestaFijaPromocion(pedido, oidPeriodoSiguiente);
    pedido = await compuestaVariablePromocion(pedido, oidPeriodoSiguiente);

    // Recorremos las Posiciones
    for (let posicion of pedido.posiciones) 
    {
      listPosiciones.push(posicion);
    }

    // PROMOCIONES DE DESPACHO AUTOMATICOS DE INDIVIDUAL y COMPUESTA FIJA
    let listCuvsDespachoAutomatico = await dbContext.getCuvsDespachoAutomatico(pedido.codigoPais, pedido.oidPeriodo);
    if (listCuvsDespachoAutomatico != null) {

      //Crear Lista de Cuvs a consultar por promocion
      let cuvsForPromocion = [];    
      for (let posicion of pedido.posiciones) 
      {
        if (!("2005" == String(posicion.oidEstrategia) 
        || "2006" == String(posicion.oidEstrategia) 
        || "2007" == String(posicion.oidEstrategia))) 
        {
          //totalCuvs = totalCuvs + 1;
          cuvsForPromocion.push(posicion.cuv);
        }
      }
      //Incluir los cuvs que podrian agregarse a la lista de posiciones
      for (let mapCuv of listCuvsDespachoAutomatico) {
        cuvsForPromocion.push(mapCuv.CUV);
      }

      let oidPromociones = enumerable.from(listCuvsDespachoAutomatico).select(x => x.OIDPROMOCION).toArray();
      let queryresultAllCuvsPromocion = await dbContext.getCuvsPromocion(pedido.codigoPais, oidPromociones, cuvsForPromocion);

      for (let mapCuv of listCuvsDespachoAutomatico) {
        let cuv = String(mapCuv.CUV);
        let oidPromocion = String(mapCuv.OIDPROMOCION);
        let indicadorCuadre = String(mapCuv.INDICADORCUADRE);
        let factorCuadre = String(mapCuv.FACTORCUADRE);
        
        //let encontrado = false;
        let encontrado = (pedido.posiciones.find(x => x.cuv == mapCuv.CUV)) ? true : false;
        /*
        for (let posicion of pedido.posiciones) {
          if (cuv == posicion.cuv) 
          {
            encontrado = true;
            break;
          }
        }
        */
        if (encontrado) 
        {
          continue;
        }
        let montoPromocion = await obtenerMontoPromocion(pedido, queryresultAllCuvsPromocion, oidPromocion, indicadorCuadre);
        let unidadesReales = Number.parseInt(montoPromocion / Number.parseInt(factorCuadre));
        
        if (unidadesReales > 0) 
        {
          let posicionAux = new dto.PedidoConsolidadoPosicion();
          
          posicionAux.cuv = cuv;
          posicionAux.unidadesDemandadas = "0";
          posicionAux.unidadesPorAtender = String(unidadesReales);
          
          let queryresultMapDatosPosicion = await dbContext.getDatosPosicion(pedido.codigoPais, pedido.codigoPeriodo, posicionAux.cuv);
          let mapDatosPosicion = queryresultMapDatosPosicion[0];
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
          posicionAux.oidProducto = String(mapDatosPosicion.oidProducto);
          if (mapDatosPosicion.CODSAP != null) { posicionAux.codigoSap = String(mapDatosPosicion.CODSAP); }
          if (mapDatosPosicion.NUMEROSECCIONDETALLE != null) { posicionAux.numeroSeccionDetalle = String(mapDatosPosicion.NUMEROSECCIONDETALLE); }
          if (mapDatosPosicion.PRECIOPUBLICO != null) { posicionAux.precioPublico = String(mapDatosPosicion.PRECIOPUBLICO); }
          if (mapDatosPosicion.INDICADORRECUPERACION != null) { posicionAux.indicadorRecuperacion = String(mapDatosPosicion.INDICADORRECUPERACION); }
          
          posicionAux.observaciones = "PROMOCION AUTOMATICA";
          posicionAux.oidSubtipoPosicion = "5";
          posicionAux.oidTipoPosicion = "4";
          
          listPosiciones.push(posicionAux);
          logger.debug("Nueva Posicion Despacho Automatico: " + posicionAux.cuv);
        }
      }
    }
    
    // PROMOCIONES DE DESPACHO AUTOMATICOS DE COMPUESTA VARIABLE
    let listCuvsDespachoAutomaticoCV = await dbContext.getCuvsDespachoAutomaticoCV(pedido.codigoPais, pedido.oidPeriodo);
    if (listCuvsDespachoAutomaticoCV != null) 
    {
      //Crear Lista de Cuvs a consultar por promocion
      let cuvsForPromocionCV = [];    
      for (let posicion of pedido.posiciones) 
      {
        if (!("2005" == String(posicion.oidEstrategia) 
        || "2006" == String(posicion.oidEstrategia) 
        || "2007" == String(posicion.oidEstrategia))) 
        {
          //totalCuvs = totalCuvs + 1;
          cuvsForPromocionCV.push(posicion.cuv);
        }
      }
      //Incluir los cuvs que podrian agregarse a la lista de posiciones
      for (let mapCuv of listCuvsDespachoAutomaticoCV) {
        cuvsForPromocionCV.push(mapCuv.CUV);
      }

      let oidPromocionesCV = enumerable.from(listCuvsDespachoAutomaticoCV).select(x => x.OIDPROMOCION).toArray();
      let queryresultAllCuvsPromocionCV = await dbContext.getCuvsPromocion(pedido.codigoPais, oidPromocionesCV, cuvsForPromocionCV);


      for (let mapCuv of listCuvsDespachoAutomaticoCV) 
      {
        let cuv = String(mapCuv.CUV);
        let oidPromocion = String(mapCuv.OIDPROMOCION);
        let indicadorCuadre = String(mapCuv.INDICADORCUADRE);
        let factorCuadre = String(mapCuv.FACTORCUADRE);
        
        let montoPromocion = Number.parseFloat(await obtenerMontoPromocion(pedido, queryresultAllCuvsPromocionCV, oidPromocion, indicadorCuadre));
        let unidadesReales = Number.parseInt(montoPromocion / Number.parseFloat(factorCuadre));
        
        if (unidadesReales > 0) 
        {
          let posicionAux = new dto.PedidoConsolidadoPosicion();
          
          posicionAux.cuv = cuv;
          posicionAux.unidadesDemandadas = "0";
          posicionAux.unidadesPorAtender = String(unidadesReales);

          let queryresultmapDatosPosicion = await dbContext.getDatosPosicion(pedido.codigoPais, pedido.codigoPeriodo, posicion.cuv);
          let mapDatosPosicion = queryresultmapDatosPosicion[0];
          posicionAux.oidOferta = String(mapDatosPosicion.OIDOFERTA);
          posicionAux.oidDetaOferta = String(mapDatosPosicion.OIDDETAOFERTA);
          posicionAux.oidEstrategia = String(mapDatosPosicion.OIDESTRATEGIA);
          if (mapDatosPosicion.OIDFORMAPAGO != null) { posicionAux.oidFormaPago = String(mapDatosPosicion.OIDFORMAPAGO); }
          if (mapDatosPosicion.PAGINA != null) { posicionAux.pagina = String(mapDatosPosicion.PAGINA); }
          if (mapDatosPosicion.OIDCATALOGO != null) { posicionAux.oidCatalogo = String(mapDatosPosicion.oidCatalogo); }
          if (mapDatosPosicion.PRECIOUNITARIO != null) { posicionAux.precioUnitario = String(mapDatosPosicion.PRECIOUNITARIO); }
          if (mapDatosPosicion.PRECIOCATALOGO != null) { posicionAux.precioCatalogo = String(mapDatosPosicion.PRECIOCATALOGO); }
          if (mapDatosPosicion.PRECIOCONTABLE != null) { posicionAux.precioContable = String(mapDatosPosicion.PRECIOCONTABLE); }
          if (mapDatosPosicion.FACTORREPETICION != null) { posicionAux.factorRepeticion = String(mapDatosPosicion.FACTORREPETICION); }
          if (mapDatosPosicion.OIDGRUPOOFERTA != null) { posicionAux.oidGrupoOferta = String(mapDatosPosicion.OIDGRUPOOFERTA); }
          if (mapDatosPosicion.OIDINDICADORCUADRE != null) { posicionAux.oidIndicadorCuadre = String(mapDatosPosicion.oidIndicadorCuadre); }
          if (mapDatosPosicion.FACTORCUADRE != null) { posicionAux.factorCuadre = String(mapDatosPosicion.FACTORCUADRE); }
          if (mapDatosPosicion.RANKING != null) { posicionAux.Ranking = String(mapDatosPosicion.RANKING); }
          posicionAux.oidProducto = String(mapDatosPosicion.OIDPRODUCTO);
          if (mapDatosPosicion.CODSAP != null) { posicionAux.codigoSap = String(mapDatosPosicion.CODSAP); }
          if (mapDatosPosicion.NUMEROSECCIONDETALLE != null) { posicionAux.numeroSeccionDetalle = String(mapDatosPosicion.NUMEROSECCIONDETALLE); }
          if (mapDatosPosicion.PRECIOPUBLICO != null) { posicionAux.precioPublico = String(mapDatosPosicion.PRECIOPUBLICO); }
          if (mapDatosPosicion.INDICADORRECUPERACION != null) { posicionAux.indicadorRecuperacion = String(mapDatosPosicion.INDICADORRECUPERACION); }
          
          posicionAux.observaciones = "PROMOCION AUTOMATICA";
          posicionAux.oidSubtipoPosicion = "5";
          posicionAux.oidTipoPosicion = "4";
          
          listPosiciones.push(posicionAux);
          logger.debug("Datos de la Posicion Despacho Automatico (CV): " + posicionAux.cuv);
        }
      }
    }
    
    pedido.posiciones = listPosiciones;

    logger.stop('Completed Cuadre de Promoción', performance);

    return pedido;
  }

async function obtenerMontoPromocion(pedido, queryResult, oidPromocion, indicadorCuadre)
{
    let totalCuvs = 0;
    let suma = 0;
    let cuvs = [];
  // Recorremos las Posiciones y obtenemos los Oids Ofertas de Compuesta
  // Variable
  for (let posicion of pedido.posiciones) 
  {
    
    if (!("2005" == String(posicion.oidEstrategia) 
          || "2006" == String(posicion.oidEstrategia) 
          || "2007" == String(posicion.oidEstrategia))) 
    {
      //totalCuvs = totalCuvs + 1;
      cuvs.push(posicion.cuv);
    }
  }
  
  if (cuvs.length > 0) 
  {
    /*
    let cuvs = new Array(totalCuvs);
    let contador = 0;
    for (let posicion of pedido.posiciones) 
    {
      if (!("2005" == String(posicion.oidEstrategia) 
          || "2006" == String(posicion.oidEstrategia)
          || "2007" == String(posicion.oidEstrategia))) 
      {
        cuvs[contador] = posicion.cuv;
        contador = contador + 1;
      }
    }    
    */
    //let listCuvsPromocion = await dbContext.getCuvsPromocion(pedido.codigoPais, oidPromocion, cuvs);
    //console.log("queryresult filter cuv prom");
    //console.log(queryResult);
    let listCuvsPromocion = queryResult.filter(x => x.OIDPROMOCION == oidPromocion );
    
    for (let posicion of pedido.posiciones) 
    {     
      //let encontrado = false;
      //for (int j = 0; j < listCuvsPromocion.size(); j++) {
        //final Map mapCuvPromocion = (Map) listCuvsPromocion.get(j);
        /*
      for(let mapCuvPromocion of listCuvsPromocion) 
      {
        let cuv = String(mapCuvPromocion.CUV);
        
        if (cuv == String(posicion.cuv)) {
          encontrado = true;
          break;
        }
      }
      */
     let encontrado = (listCuvsPromocion.find(x => x.CUV == posicion.cuv)) ? true: false;
      
      if (encontrado) 
      {
        if ("1" == String(indicadorCuadre)) 
        {
          suma =
              suma
                  + (Number.parseInt(posicion.unidadesPorAtender) * Number.parseInt(posicion
                      .factorRepeticion));
        } 
        else 
        {
          suma =
              suma
                  + (Number.parseInt(posicion.unidadesPorAtender)
                      * Number.parseInt(posicion.factorRepeticion) * Number.parseFloat(posicion
                      .precioCatalogo));
        }
      }
    }
  }
  
  return suma;
}

async function compuestaFijaPromocion(pedido, oidPeriodoSiguiente) 
{
    let listPosiciones = [];
    
    // Recorremos las Posiciones
    for(let posicion of pedido.posiciones)
    {
      listPosiciones.push(posicion);
    }
    
    // Recorremos las Posiciones
    for (let posicion of pedido.posiciones)
    {
      if ("2006" == String(posicion.oidEstrategia) && !("PROMOCION NO CUMPLE" == String(posicion.getObservaciones)))
      {
        let listPosicionesAux = await dbContext.getDatosPosicionPromocionCF(pedido.codigoPais, posicion.oidOferta);
        
        if (listPosicionesAux != null) {
          for (let mapDatosPosicion of listPosicionesAux)
          {
            let posicionAux = new dto.PedidoConsolidadoPosicion();
            let cuv = String(mapDatosPosicion.CUV);
            let encontrado = false;
            for(let posicionAux2 of pedido.posiciones)
            {
              if (cuv == String(posicionAux2.cuv)) 
              {
                encontrado = true;
                break;
              }
            }
            if (encontrado) {
              continue;
            }
            posicionAux.cuv = cuv;
            posicionAux.unidadesDemandadas = "0";
            posicionAux.unidadesPorAtender = posicion.unidadesPorAtender;
            
            posicionAux.oidOferta = String(mapDatosPosicion.OIDOFERTA);
            posicionAux.oidDetaOferta = String(mapDatosPosicion.OIDDETAOFERTA);
            posicionAux.oidEstrategia = String(mapDatosPosicion.OIDESTRATEGIA);
            if (mapDatosPosicion.OIDFORMAPAGO != null) { posicionAux.oidFormaPago = String(mapDatosPosicion.OIDFORMAPAGO); }
            if (mapDatosPosicion.PAGINA != null) { posicionAux.pagina = String(mapDatosPosicion.PAGINA); }
            if (mapDatosPosicion.OIDCATALOGO != null) { posicionAux.oidCatalogo = String(mapDatosPosicion.OIDCATALOGO); }
            if (mapDatosPosicion.PRECIOUNITARIO != null) { posicionAux.precioUnitario = (mapDatosPosicion.PRECIOUNITARIO); }
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
            
            posicionAux.oidSubtipoPosicion = "5";
            posicionAux.oidTipoPosicion = "4";
            
            listPosiciones.push(posicionAux);
            logger.debug("Nueva Posicion en Compuesta Fija (Promocion): " + posicionAux.cuv);
          }
        }
      }
    }
    
    pedido.posiciones = listPosiciones;

    return pedido;
  }
  
async function compuestaVariablePromocion(pedido, oidPeriodoSiguiente) 
{
    let listPosiciones = [];
    let mapOidOferta = [];
    
    // Recorremos las Posiciones y obtenemos los Oids Ofertas de Compuesta
    // Variable
    for(let posicion of pedido.posiciones)
    {
      listPosiciones.push(posicion);
      
      if ("2007" == String(posicion.oidEstrategia)) {
        if (!"PROMOCION NO CUMPLE" == String(posicion.observaciones)
            && (Number.parseInt(posicion.unidadesPorAtender) > 0)) 
        {
          if (!mapOidOferta.includes(posicion.oidOferta)) 
          {
            mapOidOferta.push(posicion.oidOferta);
          }
        }
      }
    }
    
    // Recorremos los Oids Ofertas de Compuesta Variable
    for (let oidOferta of mapOidOferta) 
    {
      let listGruposOrdenados = [];
      
      // Recuperamos los grupos
      //final SortedMap mapGruposOrdenados = new TreeMap(java.util.Collections.reverseOrder());
      let mapGruposOrdenados = new Map();
      let listGrupos = await dbContext.getGrupos(pedido.codigoPais, oidOferta);
      
      // Recorremos los grupos
      for (let mapGrupo of listGrupos) 
      {
        // Por cada Grupo obtenemos los CUVs relacionados, lo recorremos y
        // contamos las unidades por atender
        let oidGrupoOferta = String(mapGrupo.OIDGRUPOOFERTA);
        let factorCuadre = mapGrupo.FACTORCUADRE;
        
        let listCuvsGrupo = await dbContext.getCuvsGrupo(pedido.codigoPais, oidOferta, oidGrupoOferta);
        let numeroUnidades = 0;
        for (let mapCuvsGrupo of listCuvsGrupo)
        {
          let cuv = String(mapCuvsGrupo.CUV);
          for (let posicion of pedido.posiciones)    
          {
            if (cuv == String(posicion.cuv)
                && ((Number.parseInt(posicion.unidadesPorAtender) > 0) && ("0" == String(posicion
                    .indLimiteVenta) || posicion.indLimiteVenta == ""))) {
              numeroUnidades = numeroUnidades + Number.parseInt(posicion.unidadesPorAtender);
            }
          }
        }
        
        let indicadorCuadre = numeroUnidades / factorCuadre;
        
        if (mapGruposOrdenados.has(indicadorCuadre)) {
          let valorCuadre = String(mapGruposOrdenados.get(indicadorCuadre));
          mapGruposOrdenados.set(indicadorCuadre, valorCuadre + ";" + oidGrupoOferta + "__" + numeroUnidades + "__"
              + factorCuadre);
        } else {
          mapGruposOrdenados.set(indicadorCuadre, oidGrupoOferta + "__" + numeroUnidades + "__" + factorCuadre);
        }
      }
      
      // Actualizamos los grupos Ordenados en una lista
      /*
      final Iterator iterator = mapGruposOrdenados.keySet().iterator();
      while (iterator.hasNext()) {
        final Object key = iterator.next();
        final String valor = (String) mapGruposOrdenados.get(key);
        
      */
     let mapGruposOrdenadosReversed = new Map([...mapGruposOrdenados].sort((a, b) => a[1] === b[1] ? 0 : a[1] > b[1] ? 1 : -1))          
     let iterator = mapGruposOrdenadosReversed[Symbol.iterator]();
     let itemGrupoOrdenado;

     // Actualizamos los grupos Ordenados en una lista
     while(itemGrupoOrdenado = iterator.next().value)
     {
       logger.debug(itemGrupoOrdenado);
       let key = itemGrupoOrdenado[0];
       let valor = String(itemGrupoOrdenado[1]);
        if (valor.indexOf(";") > 0) {
          let st = valor.split(";");
          //while (st.hasMoreTokens()) {             final String elemento = st.nextToken();
          for (let elemento of st) 
          {
            logger.debug("Grupo Ordenado -> " + key.toString() + "__" + elemento);
            listGruposOrdenados.push(elemento);
          }
        } else {
          listGruposOrdenados.push(valor);
          logger.debug("Grupo Ordenado -> " + key.toString() + "__" + valor);
        }

      }
      
      // Recorremos los grupos Ordenados por su Factor de Cuadre
      let cuadreGrupo = 0;
      for (let elemento of listGruposOrdenados) {
        let st = elemento.split("__");
        
        let oidGrupoOferta = st[0];
        let sumaUnidades = Number.parseInt(st[1]);
        let factorCuadre = Number.parseFloat(st[2]);
        
        if (factorCuadre > sumaUnidades) {
          if (cuadreGrupo < factorCuadre) {
            cuadreGrupo = 1;
          }
        } else {
          if ((cuadreGrupo * factorCuadre) < sumaUnidades) {
            cuadreGrupo = Number.parseInt(sumaUnidades / factorCuadre);
            let residuo = sumaUnidades - Number.parseInt(cuadreGrupo * factorCuadre);
            
            if (residuo > 0) {
              cuadreGrupo = cuadreGrupo + 1;
            }
          }
        }
        
        if ((cuadreGrupo * factorCuadre) > sumaUnidades) {
          let diferencia = (cuadreGrupo * factorCuadre) - sumaUnidades;
          
          if (diferencia > 0) {
            let cuvBajoRanking = await dbContext.getCuvBajoRanking(pedido.codigoPais, oidOferta, oidGrupoOferta);
            let encontrado = false;
            for (let posicion of pedido.posiciones) 
            {
              
              if (cuvBajoRanking[0].CUV == String(posicion.cuv)) {
                posicion.unidadesPorAtender = String(Math.round(Number.parseFloat(posicion
                    .unidadesPorAtender) + diferencia));
                encontrado = true;
                break;
              }
            }
            
            if (!encontrado) {
              let posicionAux = new dto.PedidoConsolidadoPosicion();
              
              posicionAux.cuv = cuvBajoRanking[0].CUV;
              posicionAux.unidadesDemandadas = "0";
              posicionAux.unidadesPorAtender = utils.obtenerValorEnteroFormateado(String(diferencia));
              
              let queryresultmapDatosPosicion = await dbContext.getDatosPosicion(pedido.codigoPais, pedido.codigoPeriodo, posicionAux.cuv);
              let mapDatosPosicion = queryresultmapDatosPosicion[0];
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
              
              posicionAux.oidSubtipoPosicion = "5";
              posicionAux.oidTipoPosicion = "4";
              
              listPosiciones.push(posicionAux);
              logger.debug("Nueva Posicion en Compuesta Variable (Promocion): " + posicionAux.cuv);
            }
          }
        }
        
      }
      
    }
    
    pedido.posiciones = listPosiciones;

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

