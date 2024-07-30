const { fieldHelpers } = require("@/helpers");
const { initPg } = require("@/inits");
const { ErrorHandlerPg } = require("@/utils");
const User = require("@/app/v1/models/orm/userORM")(initPg.getDatabase());
const Todo = require("@/app/v1/models/orm/todoORM")(initPg.getDatabase());

Todo.associate({ User });

class TodoModels {
  constructor() {
    this.User = User;
    this.Todo = Todo;
  }

  async createTodo(data) {
    return this.Todo.create(data, {
      attributes: ["id", "title", "description", "completed", "user_id"],
    }).catch((error) => ErrorHandlerPg.handlePostgresError(error));
  }

  async getTodoWithUser(todoId) {
    return this.Todo.findOne({
      where: { id: todoId },
      attributes: ["id", "title", "description", "completed", "user_id"],
      include: [
        {
          model: this.User,
          attributes: ["id", "fullname", "email", "picture"],
          as: "user",
        },
      ],
    })
      .then((todo) => todo)
      .catch((error) => ErrorHandlerPg.handlePostgresError(error));
  }

  async updateTodo(id, data) {
    const filteredTodo = fieldHelpers.filterTodo(data);
    return await this.Todo.update(filteredTodo, {
      where: { id },
      returning: true,
    })
      .then(([numberOfUpdateRows, [updatedTodo]]) => {
        return { numberOfUpdateRows, updatedTodo };
      })
      .catch((error) => ErrorHandlerPg.handlePostgresError(error));
  }

  async getTodoByUser(userId) {
    return this.Todo.findAll({
      where: { user_id: userId },
      attributes: ["id", "title", "description", "completed", "user_id"],
    })
      .then((todos) => todos)
      .catch((error) => ErrorHandlerPg.handlePostgresError(error));
  }
}

module.exports = new TodoModels();
