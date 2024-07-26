const { BadRequestResponse } = require("@/cors/error.response");
const { todoClient } = require("@/protos");

class TodoServices {
  async getTodoDetail({ id }) {
    return new Promise((resolve, reject) => {
      todoClient.GetTodo({ id }, (err, response) => {
        if (!err) {
          resolve(response.todo);
        } else {
          reject(new BadRequestResponse({ details: err }));
        }
      });
    });
  }

  async createTodo(req) {
    const { title, description, user_id } = req;
    const response = await new Promise((resolve, reject) => {
      todoClient.CreateTodo(
        { title, description, user_id },
        (err, response) => {
          if (err)
            reject(
              new BadRequestResponse({
                details: err.details,
              }),
            );
          else resolve(response.todo);
        },
      );
    });
    return response;
  }

  async updateTodo(id, req) {
    const { title, description, completed, user_id } = req;
    const response = await new Promise((resolve, reject) => {
      todoClient.UpdateTodo(
        { id, title, description, completed, user_id },
        (err, response) => {
          if (err)
            reject(
              new BadRequestResponse({
                details: err.details,
              }),
            );
          else resolve(response.todo);
        },
      );
    });
    return response;
  }
}

module.exports = new TodoServices();
