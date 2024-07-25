const errorCodes = require("@/utils/errorCodeGRPC");
const statusCodes = require("@/utils/statusCodes");

class ErrorResponse extends Error {
  constructor(message, code, status) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

class NotFoundResponse extends ErrorResponse {
  constructor({
    message = errorCodes.NOT_FOUND.message,
    code = errorCodes.NOT_FOUND.code,
    status = statusCodes.NOT_FOUND,
  } = {}) {
    super(message, code, status);
  }
}

module.exports = {
  NotFoundResponse,
};
