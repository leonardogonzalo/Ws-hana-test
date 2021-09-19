'use strict'

const db = require('./dbConnectionHana');

const GetDatosClienteQuery = require('./cmd/GetDatosClienteQuery');
const GetOidPeriodoQuery = require('./cmd/GetOidPeriodoQuery');
const GetParametrosPais = require('./cmd/GetParametrosPais');

module.exports.getDatosCliente = function(codigoPais, codigoCliente)
{
    let statement = GetDatosClienteQuery.statement(codigoPais, codigoCliente);
    return db.execute(statement, [], "GetDatosClienteQuery");
}

module.exports.getOidPeriodo = function(codigoPais, codigoPeriodo)
{
    let statement = GetOidPeriodoQuery.statement(codigoPais, codigoPeriodo);
    return db.execute(statement, [], "GetOidPeriodoQuery");
}

module.exports.getParametrosPais = function(codigoPais, codigoPaisDefault, codigoSistema, codigoParametro, nombreParametro, valorParametro, observacionParametro, indicadorActivo){
    let statement = GetParametrosPais.statement(codigoPais, codigoPaisDefault, codigoSistema, codigoParametro, nombreParametro, valorParametro, observacionParametro, indicadorActivo)
    return db.execute(statement, [], "GetParametrosPais");
}