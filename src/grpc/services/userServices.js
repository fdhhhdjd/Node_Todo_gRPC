const { NotFoundGRPC } = require("@/cors");
const { NotFoundResponse } = require("@/cors/errorGRPC.response");
const { ErrorHandlerGRPC } = require("@/utils");

class UserServices {
  async GetUser(call, callback) {
    ErrorHandlerGRPC.handleRequest(call, callback, async () => {
      const user = {
        id: call.request.id,
        fullname: "Nguyen Tien Tai",
        email: "nguyentientai10@gmail.com",
        picture: "ádasdasdasdas",
      };
      return { user };
    });
  }

  async CreateUser(call, callback) {
    ErrorHandlerGRPC.handleRequest(call, callback, async () => {
      const user = {
        fullname: call.request.fullname,
        email: call.request.email,
        picture: call.request.picture,
      };

      if (!call.request.id) {
        throw new NotFoundResponse();
      }

      return { user };
    });
  }
}

module.exports = new UserServices();
