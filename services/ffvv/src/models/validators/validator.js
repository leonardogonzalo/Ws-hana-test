import InvalidRequestException from "../../utils/exceptions/invalidRequestException";

export default class Validator {
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
    if (properties.indexOf("codPais") > -1 && (!query.codPais || query.codPais.toString().length !== 3))
      throw new InvalidRequestException("Código de Pais no válido");
    if (properties.indexOf("campania") > -1 && (!query.campania || query.campania.toString().length !== 6))
      throw new InvalidRequestException("Código de Campaña no válido");
    if (properties.indexOf("facturacion") > -1 && (!query.facturacion || "0,1,V,F".toString().indexOf(query.facturacion.toString()) < 0))
      throw new InvalidRequestException("Facturación no válida");
    if (
      properties.indexOf("tipo") > -1 &&
      (!query.tipo || query.tipo.toString().length !== 1 || !Number.isInteger(Number.parseInt(query.tipo.toString())))
    )
      throw new InvalidRequestException("Tipo no válido");
    if (query.codRegi && query.codRegi.toString().length !== 2) throw new InvalidRequestException("Código de Región no válido");
    if (query.codZona && query.codZona.toString().length !== 4) throw new InvalidRequestException("Código de Zona no válido");
    if (query.codSecc && query.codSecc.toString().length !== 1) throw new InvalidRequestException("Código de Sección no válido");

    return true;
  }
}
