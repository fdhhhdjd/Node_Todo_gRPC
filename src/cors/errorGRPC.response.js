const errorCodes = require("@/utils/codes/errorCodeGRPC");
const statusCodes = require("@/utils/codes/statusCodes");

class ErrorResponse extends Error {
  constructor(message, code, status) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

class InvalidArgumentGRPC extends ErrorResponse {
  constructor({
    message = errorCodes.INVALID_ARGUMENT.message,
    code = errorCodes.INVALID_ARGUMENT.code,
    status = statusCodes.BAD_REQUEST,
  } = {}) {
    super(message, status, code);
  }
}

class NotFoundGRPC extends ErrorResponse {
  constructor({
    message = errorCodes.NOT_FOUND.message,
    code = errorCodes.NOT_FOUND.code,
    status = statusCodes.NOT_FOUND,
  } = {}) {
    super(message, code, status);
  }
}

module.exports = {
  NotFoundGRPC,
  InvalidArgumentGRPC,
};
