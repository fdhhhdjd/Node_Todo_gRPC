const { Ok } = require("@/cors");
const todoServices = require("@/app/v1/services/todoService");

class TodoControllers {
  async getTodoDetail(req, res) {
    const todoId = req.params.todoId;
    new Ok({
      metadata: await todoServices.getTodoDetail({ id: todoId }),
    }).send(res);
  }
  async createTodo(req, res) {
    new Ok({
      metadata: await todoServices.createTodo(req.body),
    }).send(res);
  }
}

module.exports = new TodoControllers();
