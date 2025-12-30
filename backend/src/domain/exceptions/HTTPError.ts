export class HTTPError extends Error {
  /**
   * The type of error message
   */
  isCustom: boolean;

  /**
   * HTTP status code to be sent as response status
   */
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.isCustom = true;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
