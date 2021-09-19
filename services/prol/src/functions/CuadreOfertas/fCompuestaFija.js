'use strict'

const enumerable = require('node-enumerable');
const logger = require('./../../utility/Logger');
const dbContext = require('../../data-access/dbContextValidaciones');
const dto = require('../../persistence/pedidoConsolidado');

async function validate(pedido, oidPeriodoSiguiente)
{
  let performance = logger.start("Starting Compuesta Fija");

  let listPosiciones = [];

  // Devolver las posiciones del input
  pedido.posiciones.forEach(item => listPosiciones.push(item));

  let posicionesEstrategias = pedido.posiciones.filter(x => ("2002" === String(x.oidEstrategia) || "2009" === String(x.oidEstrategia)));
  let oidOfertas = enumerable.from(posicionesEstrategias).select(x => x.oidOferta).toArray();  

  if (oidOfertas.length > 0)
  {
    let queryResultDatosPosicionCF = await dbContext.getDatosPosicionCF(pedido.codigoPais, oidOfertas);

    // Mas las posiciones de los paquetes de ofertas
    //for (let posicion of pedido.posiciones) 
    for(let posicion of posicionesEstrategias)  
    {
      //if ("2002" === String(posicion.oidEstrategia) || "2009" === String(posicion.oidEstrategia)) 
      //{
        //let posicionesNuevas = await dbContext.getDatosPosicionCF(pedido.codigoPais, posicion.oidOferta);
        let posicionesNuevas = queryResultDatosPosicionCF.filter(x => x.OIDOFERTA == posicion.oidOferta);

        if (posicionesNuevas != null) 
        {
          for (let posicionData of posicionesNuevas) 
          {
            let newPosicion = new dto.PedidoConsolidadoPosicion();

            newPosicion.cuv = String(posicionData.CUV);
            newPosicion.unidadesDemandadas = "0";
            newPosicion.unidadesPorAtender = String(posicion.unidadesDemandadas);
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
            logger.debug("Nueva Posicion Compuesta Fija: " + newPosicion.cuv);
          }
        }
      //}
    }
  }
  pedido.posiciones = listPosiciones;
  
  logger.stop('Completed Compuesta Fija', performance);

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

