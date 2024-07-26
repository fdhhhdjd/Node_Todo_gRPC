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
}

module.exports = new TodoServices();
