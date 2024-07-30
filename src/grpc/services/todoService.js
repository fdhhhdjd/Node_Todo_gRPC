const todoModels = require("@/app/v1/models/todoModels");
const { InvalidArgumentGRPC } = require("@/cors");
const { ErrorHandlerGRPC } = require("@/utils");

class TodoServices {
  async GetTodosByUser(call, callback) {
    ErrorHandlerGRPC.handleRequest(call, callback, async () => {
      const getTodoByUser = await todoModels.getTodoByUser(
        call.request.user_id,
      );
      return { todos: getTodoByUser };
    });
  }

  async GetTodo(call, callback) {
    ErrorHandlerGRPC.handleRequest(call, callback, async () => {
      const getTodoId = await todoModels.getTodoWithUser(call.request.id);
      return { todo: getTodoId };
    });
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

  async UpdateTodo(call, callback) {
    ErrorHandlerGRPC.handleRequest(call, callback, async () => {
      const todo = {
        title: call.request.title,
        description: call.request.description,
        completed: call.request.completed,
        user_id: call.request.user_id,
      };

      const { numberOfUpdateRows, updatedTodo } = await todoModels.updateTodo(
        call.request.id,
        todo,
      );

      if (numberOfUpdateRows === 0) {
        throw new InvalidArgumentGRPC();
      }

      return { todo: updatedTodo };
    });
  }

  async DeleteTodo(call, callback) {
    ErrorHandlerGRPC.handleRequest(call, callback, async () => {
      const { numberOfDeletedRows } = await todoModels.deleteTodoById(
        call.request.id,
      );

      if (numberOfDeletedRows === 0) {
        throw new InvalidArgumentGRPC();
      }

      return {
        todo: {
          id: call.request.id,
        },
      };
    });
  }

  async streamData(call) {
    call.on("data", (request) => {
      console.log("Received request:", request.message);
      call.write({ message: `Echo: Ok` });
    });

    call.on("end", () => {
      call.end();
    });
  }
}

module.exports = new TodoServices();
