const reasonPhrases = require("@/utils/codes/reasonPhrases");
const statusCodes = require("@/utils/codes/statusCodes");
const errorCodes = require("@/utils/codes/errorCode");
const { checkStringHelpers } = require("@/helpers");

class ErrorResponse extends Error {
  constructor(message, status, code, details) {
    super(message);
    this.status = status;
    this.code = code;
    this.timestamp = new Date().toISOString();
    this.details = checkStringHelpers.isJSONString(details)
      ? JSON.parse(details)
      : details || [];
  }
}

class BadRequestResponse extends ErrorResponse {
  constructor({
    message = reasonPhrases.BAD_REQUEST,
    status = statusCodes.BAD_REQUEST,
    code = errorCodes.BAD_REQUEST.code,
    details,
  } = {}) {
    super(message, status, code, details);
  }
}

class UnauthorizedResponse extends ErrorResponse {
  constructor({
    message = reasonPhrases.UNAUTHORIZED,
    status = statusCodes.UNAUTHORIZED,
    code = errorCodes.UNAUTHORIZED.code,
    details,
  } = {}) {
    super(message, status, code, details);
  }
}

class NotFoundError extends ErrorResponse {
  constructor({
    message = reasonPhrases.NOT_FOUND,
    status = statusCodes.NOT_FOUND,
    code = errorCodes.NOT_FOUND.code,
    details,
  } = {}) {
    super(message, status, code, details);
  }
}

module.exports = {
  BadRequestResponse,
  NotFoundError,
  UnauthorizedResponse,
};
