"use strict";

const { initPg } = require("@/inits");
const { ErrorHandlerPg } = require("@/utils");
const User = require("@/app/v1/models/orm/userORM")(initPg.getDatabase());
const Todo = require("@/app/v1/models/orm/todoORM")(initPg.getDatabase());

User.associate({ Todo });

class UserModels {
  constructor() {
    this.User = User;
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
    return this.User.create(data, {
      attributes: ["id", "fullname", "email", "picture"],
    }).catch((error) => ErrorHandlerPg.handlePostgresError(error));
  }

  async updateUser(id, data) {
    return await this.User.update(data, {
      where: { id },
      returning: true,
      individualHooks: true,
    })
      .then(([numberOfUpdateRows, [updatedUser]]) => {
        return { numberOfUpdateRows, updatedUser };
      })
      .catch((error) => ErrorHandlerPg.handlePostgresError(error));
  }

  async deleteUser(id) {
    return this.User.destroy({
      where: { id },
      returning: true,
    })
      .then((numberOfDeletedRows) => {
        return { numberOfDeletedRows };
      })
      .catch((error) => ErrorHandlerPg.handlePostgresError(error));
  }
}

module.exports = new UserModels();
