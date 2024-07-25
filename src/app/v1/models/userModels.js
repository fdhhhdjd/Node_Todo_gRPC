"use strict";

const { initPg } = require("@/inits");
const { ErrorHandlerPg } = require("@/utils");

class UserModels {
  constructor() {
    this.User = require("@/app/v1/models/orm/userORM")(initPg.getDatabase());
  }
  async createUser(data) {
    return this.User.create(data).catch((error) =>
      ErrorHandlerPg.handlePostgresError(error),
    );
  }
}

module.exports = new UserModels();
