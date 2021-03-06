export default class InvalidRequestException extends Error {
  constructor(message, status) {
    super(message);
    this.name = this.constructor.name;
    this.status = status || 400;
    Error.captureStackTrace(this, this.constructor);
  }
}
