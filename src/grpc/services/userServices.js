const userModels = require("@/app/v1/models/userModels");
const { InvalidArgumentGRPC } = require("@/cors");
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

      if (!user.fullname || !user.email) {
        throw new InvalidArgumentGRPC();
      }

      const newUser = await userModels.createUser(user);
      console.log(newUser);

      return { user };
    });
  }
}

module.exports = new UserServices();
