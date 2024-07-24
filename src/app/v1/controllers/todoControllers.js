const { Ok } = require("@/cors");
const todoServices = require("@/app/v1/services/todoService");

class TodoControllers {
  async getTodoDetail(req, res) {
    const todoId = req.params.todoId;
    new Ok({
      metadata: await todoServices.getTodoDetail({ id: todoId }),
    }).send(res);
  }
}

module.exports = new TodoControllers();
