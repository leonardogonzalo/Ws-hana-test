'use strict'

const enumerable = require('node-enumerable');
const logger = require('./../utility/Logger');
const dbContext = require('../data-access/dbContextValidaciones');
const dto = require('../persistence/pedidoConsolidado');
const common = require('./common/base');

async function validate(pedido)
{
    let performance = logger.start("Starting Incentivos");  

    let codigoPeriodoAnt = common.obtenerPeriodo(pedido.codigoPeriodo, -1);
    
    //Calcular el Monto del Pedido: Sumatoria de las unidades de cada producto multiplicado por el precio unitario.
    let montoPedido = 0; 
    let montoAcumulado = 0;
    for (let posicion of pedido.posiciones) 
    {
        montoPedido = montoPedido + Number.parseFloat(posicion.unidadesPorAtender) * Number.parseFloat(posicion.precioUnitario);
    }

    //Obtenemos los concursos activos
    let listPuntajeIncentivos = await dbContext.getConcursosActivos(pedido.codigoPais, pedido.codigoPeriodo, pedido.oidCliente);
    let listConcursos = [];
    let oidConcursos = [];

    //Si hay concursos activos
    if(listPuntajeIncentivos != null && listPuntajeIncentivos.length > 0) 
    {
        let concursosValidos = [];
        let hasMontoMinimoPedido = false;
        let hasValidatePasoPedido = false;
        //Crear array oidOfertas para realizar las consultas de todos los concursos a la vez y no una invocacion al query por cada Concurso
        for(let concurso of listPuntajeIncentivos)
        {
            concursosValidos.push(concurso.OIDCONCURSO);
            if (concurso.MONTOMINIMOPEDIDO > 0) hasMontoMinimoPedido = true;
            if (concurso.INDCONSRANGO == "1" && concurso.CAMPANIADESDE != pedido.codigoPeriodo) hasValidatePasoPedido = true;
        }

        let montoAux;
        //Solo si hay algun Concurso que valide el Monto Minimo del Pedido
        if (hasMontoMinimoPedido) 
        {
            //Obtener Monto Acumulado de los pedidos del Cliente en el periodo dado
            let queryResultMontoAux = await dbContext.getMontoAcumulado(pedido.codigoPais, pedido.oidPeriodo, pedido.oidCliente);
            montoAux = queryResultMontoAux[0];

            if(montoAux!=null) 
            {
                //Incluir el Monto del Pedido actual
                montoAcumulado = montoPedido + Number.parseFloat(montoAux.MONTOTOTAL);
            }            
        }

        //Con los Concursos activos validar el Ambito Geografico
        let queryresultAllAmbito = [];
        if (concursosValidos.length > 0)      
        {
            //Obtener el ambito geografico de los concursos
            queryresultAllAmbito = await dbContext.getValidacionAmbitoGeografico(pedido.codigoPais, pedido.oidCliente, concursosValidos);
            let tmpConcursosValidos = [];
            //for(let ambito of queryresultAllAmbito)
            for (let oidConcurso of concursosValidos)
            {
                let ambito = queryresultAllAmbito.find(x => x.OIDCONCURSO == oidConcurso);
                let concursoPuntaje = listPuntajeIncentivos.find(x => x.OIDCONCURSO == oidConcurso);
                //Si (TotalGeografico > 0 y AmbitoGeografico = 0) 
                //Si ambito = null asume ambito.RESULT = 0
                //Entonces se declara como no valido el concurso
                let valido = true;
                if ( (  concursoPuntaje.TOTALGEOGRAFICO > 0 && 
                        ( 
                            ( 
                                ( (ambito) && ambito.RESULT == 0 )
                                || 
                                ( !(ambito) )
                            ) 
                        )  
                     )
                    )
                    //|| !(concursoPuntaje.TOTALGEOGRAFICO > 0)
                    //|| !(ambito) )
                {
                    valido = false;
                }
                if (valido == true) tmpConcursosValidos.push(concursoPuntaje.OIDCONCURSO);
            } 
            concursosValidos = tmpConcursosValidos;
        }

        //Con los Concursos, que pasaron la validacion anterior, validar el Total Clasificacion 
        let queryresultAllParticipantes = [];
        if (concursosValidos.length > 0)      
        {
            //Obtener indicador si el cliente puede participar en los concursos            
            queryresultAllParticipantes = await dbContext.getValidacionParticipante(pedido.codigoPais, pedido.oidCliente, concursosValidos);
            //let validosParticipante = queryresultAllParticipantes.filter(x => (!(x.CONTADOR > 0) && !(x.CONTADOREXCLUSION == 0) ))
            let tmpConcursosValidos = [];
            for(let oidConcurso of concursosValidos)
            {
                let concursoPuntaje = listPuntajeIncentivos.find(x => x.OIDCONCURSO == oidConcurso);
                let participa = queryresultAllParticipantes.find(x => x.OIDCONCURSO == oidConcurso)
                //Si el TotalClasificacion > 0 y Si Existe en ValidacionParticipante y Contador = 0 y ContadorExclusion es > 0
                //Si participa = null se asume  participa.CONTADOR = 0
                //Entonces se declara como no valido el concurso
                let valido = true;
                if ( (  concursoPuntaje.TOTALCLASIFICACION > 0 && 
                        ( 
                            ( 
                                (participa) && 
                                ( (participa.CONTADOR == 0) || (participa.CONTADOREXCLUSION > 0) ) 
                            ) 
                            ||
                            (!(participa))
                        )
                     )
                    //|| !(concursoPuntaje.TOTALCLASIFICACION > 0)
                    //|| !(participa))
                   )
                {
                    valido = false;
                }
                if (valido == true) tmpConcursosValidos.push(concursoPuntaje.OIDCONCURSO);
                //if (concursoPuntaje.TOTALSTATUS > 0) concursosValidos.push(participa.OIDCONCURSO);
            }
            concursosValidos = tmpConcursosValidos;
        }


        let cuvs = [];
        for (let posicion of pedido.posiciones) 
        {
            cuvs.push(posicion.cuv);
        }
        
        //for(let mapConcurso of listPuntajeIncentivos)
        for(let concurso of concursosValidos)
        {
            let mapConcurso = listPuntajeIncentivos.find(x => x.OIDCONCURSO == concurso);
            logger.debug("Concurso Valido " + mapConcurso.OIDCONCURSO);

            let numeroConcurso = String(mapConcurso.NUMEROCONCURSO);
            let oidConcurso = String(mapConcurso.OIDCONCURSO);
            let nombreConcurso = String(mapConcurso.NOMBRECONCURSO);
            let clasifConcurso = String(mapConcurso.CLASIFCONCURSO);
            let oidBaseCalculo = String(mapConcurso.OIDBASECALCULO);
            let factorConversion = String(mapConcurso.FACTORCONVERSION);
            let puntosAsignar = String(mapConcurso.PUNTOSASIGNAR);
            let tipoCuadre = String(mapConcurso.TIPOCUADRE);
            let indConsRango = String(mapConcurso.INDCONSRANGO);
            let montoMinimoPedido = String(mapConcurso.MONTOMINIMOPEDIDO);
            let codPeriodoDesde = String(mapConcurso.CODIGOPERIODODESDE);
            let totalGeografico = String(mapConcurso.TOTALGEOGRAFICO);
            let totalClasificacion = String(mapConcurso.TOTALCLASIFICACION);
            let totalEstatus = String(mapConcurso.TOTALESTATUS);
            let totalProdValidos = String(mapConcurso.TOTALPRODVALIDOS);
            let totalProdExcluidos = String(mapConcurso.TOTALPRODEXCLUIDOS);
            let totalProdBonif = String(mapConcurso.TOTALPRODBONIF);
            let totalProdExigidos = String(mapConcurso.TOTALPRODEXIGIDOS);
            let totalProdExigObli = String(mapConcurso.TOTALPRODEXIGOBLI);
            let campaniaDesde = String(mapConcurso.CAMPANIADESDE);
            
            let puntajeTotal = 0;
            let puntajeBonificado = 0;
            let puntajeExigido = 0;

            let puntajeTotalAux = 0;
            let puntajeExigidoAux = 0;
            let puntajeBonifFactor = 0;
            let puntajeBonifUnidades = 0;
        
            let valido = true;
         
            //VALIDAMOS EL AMBITO GEOGRAFICO
            if(Number.parseInt(totalGeografico) > 0) {
                //let queryresultValidacion = await dbContext.getValidacionAmbitoGeografico(pedido.codigoPais, pedido.oidCliente, oidConcurso);
                let queryresultValidacion = queryresultAllAmbito.filter(x => x.OIDCONCURSO == oidConcurso);
                let validacion = queryresultValidacion[0];
                if(validacion == 0) { valido = false; }
            }
        
            //VALIDAMOS PARTICIPANTES
            if(valido && (Number.parseInt(totalClasificacion) > 0)) 
            {
                //let queryresultMapValidacion = await dbContext.getValidacionParticipante(pedido.codigoPais, pedido.oidCliente, oidConcurso);
                let queryresultMapValidacion = queryresultAllParticipantes.filter(x => x.OIDCONCURSO == oidConcurso);
                let mapValidacion =queryresultMapValidacion[0];
                let contador = String(mapValidacion.CONTADOR);
                let contadorExclusion = String(mapValidacion.CONTADOREXCLUSION);
                
                if(Number.parseInt(contadorExclusion) > 0) { valido = false; }                
                if(Number.parseInt(contador) == 0) { valido = false; }
            }

            //VALIDAMOS ESTATUS DEL CLIENTE
            if(valido && (Number.parseInt(totalEstatus) > 0)) 
            {
                //ValidacionEstatus: Extension de la Validacion que determina si el Cliente puede participar del Concurso.
                //let validacion = await validacionEstatus(queryresultAllListEstatus, pedido.codigoPais, pedido.codigoPeriodo, codigoPeriodoAnt, pedido.oidCliente, oidConcurso);
                let validacion = await validacionEstatus(pedido.codigoPais, pedido.codigoPeriodo, codigoPeriodoAnt, pedido.oidCliente, oidConcurso);
                if(validacion == 0) { valido = false; }
            }
            
            //VALIDAMOS MONTO MINIMO ???aqui pq se suma montopedido por cada concurso
            if(valido && Number.parseFloat(montoMinimoPedido)>0) 
            {
                //let montoAcumulado = montoPedido;
                //let queryResultMontoAux = await dbContext.getMontoAcumulado(pedido.codigoPais, pedido.oidPeriodo, pedido.oidCliente);
                //let montoAux = queryResultMontoAux[0];
                /*
                if(montoAux!=null) 
                {
                    montoAcumulado = montoPedido + Number.parseFloat(montoAux.montoTotal);
                }
                */
                if(montoAcumulado < Number.parseFloat(montoMinimoPedido)) { valido = false; }
            }            

            if(valido == true && "1" == indConsRango)
            {
                if (campaniaDesde != pedido.codigoPeriodo)
                {
                    let queryresultMapParticipante = await dbContext.getValidacionPasoPedido2(pedido.codigoPais, pedido.codigoPeriodo, codigoPeriodoAnt, pedido.oidCliente);
                    let mapParticipante = queryresultMapParticipante[0];                    
                    if (mapParticipante.RESULT == "0")
                    {
                        valido = false;
                    }
                }
                /*
                let queryresultMapParticipante = await dbContext.getValidacionPasoPedido(pedido.codigoPais, codPeriodoDesde, codigoPeriodoAnt, pedido.oidCliente, oidConcurso);
                let mapParticipante = queryresultMapParticipante[0];
                let numPeriodosConcurso = String(mapParticipante.NUMPERIODOSCONCURSO);
                let numPeriodos = String(mapParticipante.NUMPERIODOS);
                
                if(Number.parseInt(numPeriodosConcurso) < Number.parseInt(numPeriodos))
                {
                    valido = false;
                }
                */
            }
        
            if(valido) 
            {
                let listProductosExigidos = [];
                
                //SE VERIFICA SI TIENE PRODUCTOS EXIGIDOS OBLIGATORIOS
                if(Number.parseInt(totalProdExigObli) > 0) 
                {
                    listProductosExigidos = await dbContext.getProductosExigidos(pedido.codigoPais, oidConcurso);
                }
                
                // Valida si el producto participa del Concurso
                let listProductosIncentivos =  await dbContext.getProductosIncentivos(pedido.codigoPais, pedido.codigoPeriodo, oidConcurso, cuvs);

                // Datos de las Posiciones
                for (let posicion of pedido.posiciones) 
                {
                    let mapProducto = listProductosIncentivos.find( x=> x.CUV == posicion.cuv);
                    
                    if (mapProducto)
                    {
                    let oidProducto = String(mapProducto.OIDPRODUCTO);
                    let oidTipoOferta = String(mapProducto.OIDTIPOOFERTA);
                
                    let oidMarcaProducto = "";
                    let oidNegocio = "";
                    let oidUnidadNegocio = "";
                    let oidGenerico = ""; 
                    let oidSuperGenerico = "";
                    
                    let oidDetalleOferta = String(mapProducto.OIDDETALLEOFERTA);
                    
                    if(mapProducto.OIDMARCAPRODUCTO != null) { oidMarcaProducto = String(mapProducto.OIDMARCAPRODUCTO); }
                    if(mapProducto.OIDNEGOCIO != null) { oidNegocio = String(mapProducto.OIDNEGOCIO); }
                    if(mapProducto.OIDUNIDADNEGOCIO != null) { oidUnidadNegocio = String(mapProducto.OIDUNIDADNEGOCIO); }
                    if(mapProducto.OIDGENERICO != null) { oidGenerico = String(mapProducto.OIDGENERICO); }
                    if(mapProducto.OIDSUPERGENERICO != null) { oidSuperGenerico = String(mapProducto.oidSuperGenerico); }
                
                    /*
                    criteria.put("oidProducto", oidProducto);
                    criteria.put("oidTipoOferta", oidTipoOferta);
                    criteria.put("oidMarcaProducto", oidMarcaProducto);
                    criteria.put("oidNegocio", oidNegocio);
                    criteria.put("oidUnidadNegocio", oidUnidadNegocio);
                    criteria.put("oidGenerico", oidGenerico);
                    criteria.put("oidSuperGenerico", oidSuperGenerico);
                    criteria.put("oidDetalleOferta", oidDetalleOferta);
                    */
                                
                    let validoProducto = true;
                    let puntajePosicion = 0;
                
                    if(Number.parseInt(totalProdValidos) > 0) 
                    {
                        let valProdVali = String(mapProducto.VALPRODVALI);
                        if(Number.parseInt(valProdVali) == 0) { validoProducto = false; }
                    }
                
                    if(Number.parseInt(totalProdExcluidos) > 0) 
                    {
                        let valProdExcl = String(mapProducto.VALPRODEXCL);
                        if(Number.parseInt(valProdExcl) > 0) { validoProducto = false; }
                    }
                
                    if(validoProducto) 
                    {
                        if(oidBaseCalculo == "1") { //POR MONTO
                            puntajePosicion = (Number.parseFloat(posicion.unidadesPorAtender) * Number.parseFloat(posicion.precioUnitario))
                                              / Number.parseFloat(factorConversion);
                        }
                        
                        if(oidBaseCalculo == "2") { //POR UNIDADES
                            puntajePosicion = Number.parseFloat(posicion.unidadesPorAtender) / Number.parseFloat(factorConversion);
                        }
                        
                        puntajeTotalAux = puntajeTotalAux + puntajePosicion;
                        
                        if(Number.parseInt(totalProdBonif) > 0) 
                        {
                            let valProdBoni = String(mapProducto.VALPRODBONI);
                            
                            if(Number.parseInt(valProdBoni) > 0) 
                            {
                                let queryresultMapCalculoBoni = await dbContext.getCalculoProductosBoni(pedido.codigoPais, pedido.codigoPeriodo,
                                                                                             oidConcurso, oidProducto,
                                                                                             oidTipoOferta, oidMarcaProducto,
                                                                                             oidNegocio, oidUnidadNegocio,
                                                                                             oidGenerico, odSuperGenerico,
                                                                                             oidDetalleOferta,
                                                                                             puntajePosicion, posicion.unidadesPorAtender);
                                let mapCalculoBoni = queryresultMapCalculoBoni[0];
                                puntajeBonifFactor = puntajeBonifFactor + Number.parseFloat(String(mapCalculoBoni.PUNTAJEFACTOR));
                                puntajeBonifUnidades = puntajeBonifUnidades + Number.parseFloat(String(mapCalculoBoni.PUNTAJEUNIDADES));
                            }
                        }

                    }
                    
                    //VALIDAMOS PRODUCTOS EXIGIDOS
                    if(Number.parseInt(totalProdExigidos) > 0) 
                    {
                        let valProdExig = String(mapProducto.VALPRODEXIG);
                        
                        if(Number.parseInt(valProdExig)>0) 
                        {
                            if(listProductosExigidos.length > 0) 
                            {
                                let listProductosExigidosOblig = await dbContext.getProductosExigidosOblig(pedido.codigoPais, pedido.codigoPeriodo,
                                                                                                            oidConcurso, oidProducto,
                                                                                                            odTipoOferta, oidMarcaProducto,
                                                                                                            oidNegocio, oidUnidadNegocio,
                                                                                                            oidGenerico, oidSuperGenerico,
                                                                                                            oidDetalleOferta);
                                if(listProductosExigidosOblig != null && listProductosExigidosOblig.length > 0) 
                                {
                                    for(let exigidoOblig of listProductosExigidosOblig) 
                                    {
                                        for(let exigido of listProductosExigidos) 
                                        {
                                            if(String(exigidoOblig.LINEA) == String(exigido.LINEA)) 
                                            {
                                                let total = Number.parseInt(String(exigido.TOTAL)) + 1;
                                                exigido.TOTAL = total;
                                            }
                                        }    
                                    }
                                }
                            }
                            
                            if(oidBaseCalculo == "1") { //POR MONTO
                                puntajePosicion = (Number.parseFloat(posicion.unidadesPorAtender) * Number.parseFloat(posicion.precioUnitario))
                                                  / Number.parseFloat(factorConversion);
                            }
                            
                            if(oidBaseCalculo == "2") { //POR UNIDADES
                                puntajePosicion = Number.parseFloat(posicion.unidadesPorAtender) / Number.parseFloat(factorConversion);
                            }
                        
                            puntajeExigidoAux = puntajeExigidoAux + puntajePosicion;
                        
                        }
                    }

                    }
                    else
                    {
                        console.log("Incentivos: No encontro cuv: " + posicion.cuv);
                    }
                
                }
                
                if(Number.parseInt(totalProdExigObli) > 0) 
                {
                    for(let exigido of listProductosExigidos) 
                    {
                        if(Number.parseInt(String(exigido.TOTAL)) == 0) 
                        {
                            puntajeExigidoAux = 0;
                            break;
                        }
                    }
                }
                
                if("1" == tipoCuadre) { //Redondeo
                    puntajeBonificado = Number.parseInt(Math.round(puntajeBonifFactor)) * Number.parseInt(puntosAsignar) + Number.parseInt(puntajeBonifUnidades);
                    puntajeTotal = Number.parseInt(Math.round(puntajeTotalAux)) * Number.parseInt(puntosAsignar) + puntajeBonificado;
                    puntajeExigido = Number.parseInt(Math.round(puntajeExigidoAux)) * Number.parseInt(puntosAsignar);
                }
                
                if("2" == tipoCuadre) { //Al Entero
                    puntajeBonificado = Number.parseInt(Math.floor(puntajeBonifFactor)) * Number.parseInt(puntosAsignar) + Number.parseInt(puntajeBonifUnidades);
                    puntajeTotal = Number.parseInt(Math.floor(puntajeTotalAux)) * Number.parseInt(puntosAsignar) + puntajeBonificado;
                    puntajeExigido = Number.parseInt(Math.floor(puntajeExigidoAux)) * Number.parseInt(puntosAsignar);
                }
                
                let concurso = new dto.PedidoConsolidadoConcurso();
                concurso.codigoConcurso = numeroConcurso;
                concurso.nombreConcurso = nombreConcurso;
                concurso.puntajeTotal = String(puntajeTotal);
                concurso.puntajeBonificado = String(puntajeBonificado);
                concurso.puntajeExigido = String(puntajeExigido);
                
                listConcursos.push(concurso);
            }

        }
        
    }  

    
    //Agregamos los concursos en los que participa la consultora para este pedido
    if(listConcursos.length > 0) 
    {
        let concursos = [];
        for(let concurso of listConcursos) 
        {
            concursos.push(concurso);
        }        
        
        pedido.concursos = concursos;
    }

    logger.stop('Completed Incentivos', performance);        

    return pedido;
}

//async function validacionEstatus(queryresultAllListEstatus, codigoPais, codigoPeriodo, codigoPeriodoAnt, oidCliente, oidConcurso) 
async function validacionEstatus(codigoPais, codigoPeriodo, codigoPeriodoAnt, oidCliente, oidConcurso) 
{
    let listEstatus = await dbContext.getValidacionEstatusVenta1(codigoPais, codigoPeriodo, oidConcurso);
    //let listEstatus = queryresultAllListEstatus.filter(x => x.OIDCONCURSO == oidConcurso);
    let codigoPeriodoAntAux = null;
    let totalOcurrencias = 0;

    if(listEstatus!=null && listEstatus.length > 0) 
    {
      for(let mapEstatus of listEstatus) 
      {
        let oidEstatus = String(mapEstatus.OIDESTATUS);
        let oidEstatus2 = "";
        let codPeriodoDesde = String(mapEstatus.CODPERIODODESDE);
        let codPeriodoHasta = String(mapEstatus.CODPERIODOHASTA);
        
        if(mapEstatus.OIDESTATUS2 != null)
        {
          oidEstatus2 = String(mapEstatus.OIDESTATUS2);
        }
        
        if(codPeriodoHasta < codigoPeriodo) 
        {
          codigoPeriodoAntAux = codPeriodoHasta;
        }
        else
        {
          codigoPeriodoAntAux = codigoPeriodoAnt;
        }
  
        if(codPeriodoDesde < codigoPeriodo) 
        {
          let queryresultValidacionEstatusVenta2 = await dbContext.getValidacionEstatusVenta2(codigoPais, codPeriodoDesde, codigoPeriodoAntAux, oidCliente, oidEstatus);
          totalOcurrencias = queryresultValidacionEstatusVenta2[0].RESULT;
          
          if(totalOcurrencias == 0 && codPeriodoHasta == codigoPeriodo) 
          {
            let queryresultValidacionEstatusVenta3 = await dbContext.getValidacionEstatusVenta3(codigoPais, codigoPeriodoAnt, oidCliente, oidEstatus2);
            totalOcurrencias = queryresultValidacionEstatusVenta3[0].RESULT;

            if(totalOcurrencias == 0 && "2" == oidEstatus) 
            {
              let queryresultValidacionEstatusVenta4 = await dbContext.getValidacionEstatusVenta4(codigoPais, codigoPeriodo, oidCliente, oidEstatus, oidEstatus2);
              totalOcurrencias = queryresultValidacionEstatusVenta4[0].RESULT;
            }
          }
          
          if(totalOcurrencias > 0)
            return 1;
        }
          
      }
    }
    
    return 0;
}

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

module.exports = { validate: validate, execute: execute }