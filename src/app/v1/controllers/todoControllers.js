"use strict";

const { Ok, Created } = require("@/cors");
const todoServices = require("@/app/v1/services/todoService");

class TodoControllers {
  async getTodoDetail(req, res) {
    const todoId = req.params.todoId;
    new Ok({
      metadata: await todoServices.getTodoDetail({ id: todoId }),
    }).send(res);
  }

  async getTodoByUser(req, res) {
    const userId = req.params.userId;
    new Ok({
      metadata: await todoServices.getTodoByUser({ user_id: userId }),
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

  async deleteTodo(req, res) {
    const todoId = req.params.todoId;
    new Ok({
      metadata: await todoServices.deleteTodo({
        id: todoId,
      }),
    }).send(res);
  }
}

module.exports = new TodoControllers();
