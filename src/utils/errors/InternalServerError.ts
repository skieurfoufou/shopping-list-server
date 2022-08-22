import BaseError from "./BaseError";

class InternalServerError extends BaseError {
  constructor(message: string) {
    super(500, message);
  }
}

export default InternalServerError;
