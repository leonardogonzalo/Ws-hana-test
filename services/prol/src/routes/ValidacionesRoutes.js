'use strict'

module.exports = function (app)
{
    const CuadreOfertasConsolidado = require('../functions/fCuadreOfertasConsolidado');

    const SaldoDeuda = require('../functions/fSaldoDeuda');
    const HomologacionCupones = require('../functions/fHomologacionCupones');
    const CompuestaFija = require('../functions/CuadreOfertas/fCompuestaFija');
    const CompuestaVariable = require('../functions/CuadreOfertas/fCompuestaVariable');
    const CuadreOfertas = require('../functions/CuadreOfertas/fCuadreOfertas');
    const MontoMaximo = require('../functions/fMontoMaximo');
    const MontoMinimo = require('../functions/fMontoMinimo');

    app.route('/CuadreOfertasConsolidado')
        .post(CuadreOfertasConsolidado.execute);


    app.route('/SaldoDeuda')
        .post(SaldoDeuda.execute);

    app.route('/HomologacionCupones')
        .post(HomologacionCupones.execute);

    app.route('/CompuestaFija')
        .post(CompuestaFija.execute);

    app.route('/CompuestaVariable')
        .post(CompuestaVariable.execute);

    app.route('/CuadreOfertas')
        .post(CuadreOfertas.execute);

    app.route('/MontoMaximo')
        .post(MontoMaximo.execute);

    app.route('/MontoMinimo')
        .post(MontoMinimo.execute);  
        
}