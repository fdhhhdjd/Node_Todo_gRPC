const reasonPhrases = require('@/utils/reasonPhrases');
const statusCodes = require('@/utils/statusCodes');
const errorCodes = require('@/utils/errorCode');

class ErrorResponse extends Error {
  constructor(message, status, code, details) {
    super(message);
    this.status = status;
    this.code = code;
    this.timestamp = new Date().toISOString();
    this.details = details || [];
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
};
