import moment from "moment";

export default class Format {
  static toDateFormat(date, format) {
    if (!format) format = "YYYY-MM-DD";
    let result = null;
    if (date) {
      let isValid = new Date(date);
      if (isValid != "Invalid Date") {
        result = moment(date).format(format);
      }
    }
    return result;
  }
  static toDateTime(value) {
    let result = null;
    if (value) {
      let isValid = new Date(value);
      if (isValid != "Invalid Date") {
        result = isValid;
      }
    }
    return result;
  }
}
