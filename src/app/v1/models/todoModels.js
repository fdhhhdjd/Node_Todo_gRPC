const { initPg } = require("@/inits");
const { ErrorHandlerPg } = require("@/utils");

class TodoModels {
  constructor() {
    this.Todo = require("@/app/v1/models/orm/todoORM")(initPg.getDatabase());
  }
  async createTodo(data) {
    return this.Todo.create(data, {
      attributes: ["id", "title", "description", "completed", "user_id"],
    }).catch((error) => ErrorHandlerPg.handlePostgresError(error));
  }
}

module.exports = new TodoModels();
