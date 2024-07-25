class ErrorHandlerGRPC {
  static handleRequest(_, callback, handler) {
    handler()
      .then((response) => {
        callback(null, response);
      })
      .catch((error) => {
        callback({
          code: error.code,
          details: JSON.stringify({
            code: error.code,
            status: error.status,
            message: error.message,
          }),
        });
      });
  }
}

module.exports = ErrorHandlerGRPC;
