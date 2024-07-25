"use strict";

const { initPg } = require("@/inits");
const { ErrorHandlerPg } = require("@/utils");

class UserModels {
  constructor() {
    this.User = require("@/app/v1/models/orm/userORM")(initPg.getDatabase());
  }
  async getAllUsers() {
    return await this.User.findAll({
      attributes: ["id", "fullname", "email", "picture"],
    }).catch((error) => ErrorHandlerPg.handlePostgresError(error));
  }

  async getUserById(id) {
    return await this.User.findByPk(id, {
      attributes: ["id", "fullname", "email", "picture"],
    }).catch((error) => ErrorHandlerPg.handlePostgresError(error));
  }

  async createUser(data) {
    return this.User.create(data).catch((error) =>
      ErrorHandlerPg.handlePostgresError(error),
    );
  }

  async updateUser(id, data) {
    return await this.User.update(data, { where: { id } }).catch((error) =>
      ErrorHandlerPg.handlePostgresError(error),
    );
  }

  async deleteUser(id) {
    return await this.User.destroy({ where: { id } }).catch((error) =>
      ErrorHandlerPg.handlePostgresError(error),
    );
  }
}

module.exports = new UserModels();
