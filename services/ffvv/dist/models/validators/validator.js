"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _invalidRequestException = _interopRequireDefault(require("../../utils/exceptions/invalidRequestException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Validator {
  static validate(query) {
    /*
      País	3 caracteres	PER
      Campaña	6 caracteres	201806
      Código Región	2 caracteres	13
      Código Zona	4 caracteres	1309
      Código Sección	1 carácter	A
      Facturación	0,1,'V','F'	V
      Tipo	0-9	2
    */
    let properties = Object.keys(query);
    if (properties.indexOf("codPais") > -1 && (!query.codPais || query.codPais.toString().length !== 3)) throw new _invalidRequestException.default("Código de Pais no válido");
    if (properties.indexOf("campania") > -1 && (!query.campania || query.campania.toString().length !== 6)) throw new _invalidRequestException.default("Código de Campaña no válido");
    if (properties.indexOf("facturacion") > -1 && (!query.facturacion || "0,1,V,F".toString().indexOf(query.facturacion.toString()) < 0)) throw new _invalidRequestException.default("Facturación no válida");
    if (properties.indexOf("tipo") > -1 && (!query.tipo || query.tipo.toString().length !== 1 || !Number.isInteger(Number.parseInt(query.tipo.toString())))) throw new _invalidRequestException.default("Tipo no válido");
    if (query.codRegi && query.codRegi.toString().length !== 2) throw new _invalidRequestException.default("Código de Región no válido");
    if (query.codZona && query.codZona.toString().length !== 4) throw new _invalidRequestException.default("Código de Zona no válido");
    if (query.codSecc && query.codSecc.toString().length !== 1) throw new _invalidRequestException.default("Código de Sección no válido");
    return true;
  }

}

exports.default = Validator;