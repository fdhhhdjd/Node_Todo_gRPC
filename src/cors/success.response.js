const statusCodes = require("@/utils/codes/statusCodes");

class SuccessResponse {
  constructor({ message, status, metadata = {} }) {
    this.message = message;
    this.status = status;
    this.metadata = metadata;
  }

  send(res) {
    return res.status(this.status).send(this);
  }
}

class Ok extends SuccessResponse {
  constructor({
    message,
    status = statusCodes.OK,
    metadata = {},
    options = {},
  } = {}) {
    super({ message, status, metadata });
    this.options = options;
  }
}

class Created extends SuccessResponse {
  constructor({
    message,
    status = statusCodes.CREATED,
    metadata = {},
    options = {},
  } = {}) {
    super({ message, status, metadata });
    this.options = options;
  }
}

module.exports = {
  Ok,
  Created,
};
