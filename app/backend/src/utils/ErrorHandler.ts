export default class ErrorHandler extends Error {
  public status: number;

  constructor(
    message: string,
    status: number,
  ) {
    super();
    this.status = status;
    this.message = message;
    Object.setPrototypeOf(this, ErrorHandler.prototype);
  }
}
