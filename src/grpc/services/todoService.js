const todoModels = require("@/app/v1/models/todoModels");
const { InvalidArgumentGRPC } = require("@/cors");
const { ErrorHandlerGRPC } = require("@/utils");

class TodoServices {
  async GetTodo(call, callback) {
    const todo = {
      id: call.request.id,
      title: "Hello",
      description: "This is todo example",
      user_id: 1,
    };

    callback(null, { todo });
  }

  async CreateTodo(call, callback) {
    ErrorHandlerGRPC.handleRequest(call, callback, async () => {
      const todo = {
        title: call.request.title,
        description: call.request.description,
        user_id: call.request.user_id,
      };

      if (!todo.title || !todo.description || !todo.user_id) {
        throw new InvalidArgumentGRPC();
      }

      const newTodo = await todoModels.createTodo(todo);

      return {
        todo: {
          id: newTodo.id,
          title: newTodo.title,
          description: newTodo.description,
          completed: newTodo.completed,
          user_id: newTodo.user_id,
        },
      };
    });
  }
}

module.exports = new TodoServices();
