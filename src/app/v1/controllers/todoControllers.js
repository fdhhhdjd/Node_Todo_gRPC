const { Ok, Created } = require("@/cors");
const todoServices = require("@/app/v1/services/todoService");

class TodoControllers {
  async getTodoDetail(req, res) {
    const todoId = req.params.todoId;
    new Ok({
      metadata: await todoServices.getTodoDetail({ id: todoId }),
    }).send(res);
  }

  async createTodo(req, res) {
    new Created({
      metadata: await todoServices.createTodo(req.body),
    }).send(res);
  }

  async updateTodo(req, res) {
    const todoId = req.params.todoId;
    new Ok({
      metadata: await todoServices.updateTodo(todoId, req.body),
    }).send(res);
  }
}

module.exports = new TodoControllers();
