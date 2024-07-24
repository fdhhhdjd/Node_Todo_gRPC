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
}

module.exports = new TodoServices();
