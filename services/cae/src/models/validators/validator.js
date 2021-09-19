import InvalidRequestException from "../../utils/exceptions/invalidRequestException";

export default class Validator {
  static validate(query) {
    let properties = Object.keys(query);
    if (properties.indexOf("isoPais") > -1 && (!query.isoPais || query.isoPais.toString().length !== 3))
      throw new InvalidRequestException("ISO Pais no válido");
    if (properties.indexOf("periodo") > -1 && (!query.periodo || query.periodo.toString().length !== 6))
      throw new InvalidRequestException("Periodo no válido");
    if (query.codRegi && query.codRegi.toString().length !== 2) throw new InvalidRequestException("Código de Región no válido");
    if (query.codZona && query.codZona.toString().length !== 4) throw new InvalidRequestException("Código de Zona no válido");
    if (query.codSecc && query.codSecc.toString().length !== 1) throw new InvalidRequestException("Código de Sección no válido");

    return true;
  }
}
