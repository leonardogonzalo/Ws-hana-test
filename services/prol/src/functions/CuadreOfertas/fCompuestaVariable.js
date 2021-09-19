'use strict'

const logger = require('./../../utility/Logger');
const dbContext = require('../../data-access/dbContextValidaciones');
const dto = require('../../persistence/pedidoConsolidado');

async function validate(pedido, oidPeriodoSiguiente)
{
    let performance = logger.start("Starting Compuesta Variable");

    let listPosiciones = [];
    let listOfertas = [];

    // Recorremos las Posiciones y obtenemos los Oids Ofertas de Compuesta Variable
    for(let posicion of pedido.posiciones) 
    {
      listPosiciones.push(posicion);
      if ("2003" == String(posicion.oidEstrategia)) 
      {
        if ((Number.parseInt(posicion.unidadesPorAtender) > 0)
            && (posicion.indLimiteVenta == undefined || "0" == String(posicion.indLimiteVenta)) || String(posicion.indLimiteVenta) == "" ) 
        {
          if (!listOfertas.includes(posicion.oidOferta))
          {
            //Si Estrategia es 2003 y UnidadesPorAtender es mayor a cero e IndiceLimiteVenta es cero
            listOfertas.push(posicion.oidOferta);
          }
        } 
      }
    }

    // Recorremos los Oids Ofertas de Compuesta Variable
    for (let oidOferta of listOfertas)
    {
      let listGruposOrdenados = [];
      
      // Recuperamos los grupos
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
          for (let posicion of pedido.posiciones) 
          {                
            if ((String(mapCuvsGrupo.CUV) == posicion.cuv) 
                && 
                (
                  (Number.parseInt(posicion.unidadesPorAtender) > 0) 
                  && 
                  (posicion.indLimiteVenta == undefined || "0" == posicion.indLimiteVenta || posicion.indLimiteVenta == "" ) 
                )
            )
            {
              numeroUnidades = numeroUnidades + Number.parseInt(posicion.unidadesPorAtender);
            }
          }
        }
        
        let indicadorCuadre = numeroUnidades / factorCuadre;            
        
        if (mapGruposOrdenados.has(indicadorCuadre)) 
        {
          let valorCuadre = String(mapGruposOrdenados.get(indicadorCuadre));
          mapGruposOrdenados.set(indicadorCuadre, `${valorCuadre};${oidGrupoOferta}__${numeroUnidades}__${factorCuadre}`);
        } 
        else 
        {
          mapGruposOrdenados.set(indicadorCuadre, `${oidGrupoOferta}__${numeroUnidades}__${factorCuadre}`);
        }            
        
      }
      
      // Invertir la matriz de Grupos Ordenados: mapGruposOrdenados = new TreeMap(java.util.Collections.reverseOrder());
      let mapGruposOrdenadosReversed = new Map([...mapGruposOrdenados].sort((a, b) => a[1] === b[1] ? 0 : a[1] > b[1] ? 1 : -1));
      let iterator = mapGruposOrdenadosReversed[Symbol.iterator]();
      var itemGrupoOrdenado;

      // Actualizamos los grupos Ordenados en una lista
      while(itemGrupoOrdenado = iterator.next().value)
      {
        logger.debug(itemGrupoOrdenado);
        let key = itemGrupoOrdenado[0];
        let valor = String(itemGrupoOrdenado[1]);
        if (valor.indexOf(";") > 0) 
        {
          let st = valor.split(";");
          for (let elemento of st)
          {
            logger.debug("Grupo Ordenado -> " + String(key) + "__" + elemento);
            listGruposOrdenados.push(elemento);
          }
        } 
        else 
        {
          listGruposOrdenados.push(valor);
          logger.debug("Grupo Ordenado -> " + String(key) + "__" + valor);
        }
        
      }
      
      // Recorremos los grupos Ordenados por su Factor de Cuadre
      let cuadreGrupo = 0;          
      for (let elemento of listGruposOrdenados) 
      {
        let st = elemento.split("__");
        let oidGrupoOferta = st[0];
        let sumaUnidades = Number.parseInt(st[1]);
        let factorCuadre = Number.parseFloat(st[2]);

        if (factorCuadre > sumaUnidades) 
        {
          if (cuadreGrupo < factorCuadre) 
          {
            cuadreGrupo = 1;
          }
        } 
        else 
        {
          if ((cuadreGrupo * factorCuadre) < sumaUnidades) 
          {
            cuadreGrupo = Number.parseInt(sumaUnidades / factorCuadre);
            let residuo = sumaUnidades - Number.parseInt(cuadreGrupo * factorCuadre);
            
            if (residuo > 0) 
            {
              cuadreGrupo = cuadreGrupo + 1;
            }
          }
        }
        
        if ((cuadreGrupo * factorCuadre) > sumaUnidades) 
        {
          let diferencia = (cuadreGrupo * factorCuadre) - sumaUnidades;
          
          if (diferencia > 0) 
          {                
            let cuvBajoRanking = await dbContext.getCuvBajoRanking(pedido.codigoPais, oidOferta, oidGrupoOferta);
            let encontrado = false;
            for (let posicion of pedido.posiciones) 
            {
              if (cuvBajoRanking[0].CUV == posicion.cuv) 
              {
                posicion.UnidadesPorAtender = String(Math.round(Number.parseFloat(posicion.unidadesPorAtender + diferencia)));
                encontrado = true;
                break;
              }
            }
            
            if (!encontrado) 
            {
              let newPosicion = new dto.PedidoConsolidadoPosicion();
              
              newPosicion.cuv = cuvBajoRanking[0].CUV;
              newPosicion.unidadesDemandadas = "0";
              newPosicion.unidadesPorAtender = String(Number.parseInt(diferencia));

              let queryResultPosiciones = await dbContext.getDatosPosicion(pedido.codigoPais, pedido.codigoPeriodo, [ newPosicion.cuv ]);
              let posicionData = queryResultPosiciones[0];

              newPosicion.oidProducto = String(posicionData.OIDPRODUCTO);
              newPosicion.oidOferta = String(posicionData.OIDOFERTA);
              newPosicion.oidDetaOferta = String(posicionData.OIDDETAOFERTA);
              newPosicion.oidEstrategia = String(posicionData.OIDESTRATEGIA);
              newPosicion.oidTipoPosicion = "4";        
              newPosicion.oidSubtipoPosicion = "5";              

              if (posicionData.OIDFORMAPAGO != null) { newPosicion.oidFormaPago = String(posicionData.OIDFORMAPAGO); }
              if (posicionData.PAGINA != null) { newPosicion.pagina = String(posicionData.PAGINA); }
              if (posicionData.OIDCATALOGO != null) { newPosicion.oidCatalogo = String(posicionData.OIDCATALOGO); }
              if (posicionData.PRECIOUNITARIO != null) { newPosicion.precioUnitario = String(posicionData.PRECIOUNITARIO); }
              if (posicionData.PRECIOCATALOGO != null) { newPosicion.precioCatalogo = String(posicionData.PRECIOCATALOGO); }
              if (posicionData.PRECIOCONTABLE != null) { newPosicion.precioContable = String(posicionData.PRECIOCONTABLE); }
              if (posicionData.FACTORREPETICION != null) { newPosicion.factorRepeticion = String(posicionData.FACTORREPETICION); }
              if (posicionData.OIDGRUPOOFERTA != null) { newPosicion.oidGrupoOferta = String(posicionData.OIDGRUPOOFERTA); }
              if (posicionData.OIDINDICADORCUADRE != null) { newPosicion.oidIndicadorCuadre = String(posicionData.OIDINDICADORCUADRE); }
              if (posicionData.FACTORCUADRE != null) { newPosicion.factorCuadre = String(posicionData.FACTORCUADRE); }
              if (posicionData.RANKING != null) { newPosicion.ranking = String(posicionData.RANKING); }
              if (posicionData.CODSAP != null) { newPosicion.codigoSap = String(posicionData.CODSAP); }
              if (posicionData.NUMEROSECCIONDETALLE != null) { newPosicion.numeroSeccionDetalle = String(posicionData.NUMEROSECCIONDETALLE); }
              if (posicionData.PRECIOPUBLICO != null) { newPosicion.precioPublico = String(posicionData.PRECIOPUBLICO); }
              if (posicionData.INDICADORRECUPERACION != null) { newPosicion.indicadorRecuperacion = String(posicionData.INDICADORRECUPERACION); }

              listPosiciones.push(newPosicion);
              logger.debug("Nueva Posicion en Compuesta Variable: " + newPosicion.cuv);
            }
          }
        }
        
      }
      
    }
    
    pedido.posiciones = listPosiciones;   

    logger.stop('Completed Compuesta Variable', performance);

    return pedido;
}

async function execute(request, response) 
{
  try
  {
    let pedido = request.body;
    validate(pedido).then((result) => response.json(result))
                    .catch((exception) => 
                    {
                      logger.error(exception);
                      response.status(500).send(exception.message);
                    });
  }
  catch(exception)
  {
    response.status(500).send(exception); 
  }
};

module.exports = { validate: validate, execute: execute }