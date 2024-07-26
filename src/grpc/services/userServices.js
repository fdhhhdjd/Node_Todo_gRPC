const userModels = require("@/app/v1/models/userModels");
const { InvalidArgumentGRPC } = require("@/cors");
const { ErrorHandlerGRPC } = require("@/utils");

class UserServices {
  async GetAllUsers(call, callback) {
    ErrorHandlerGRPC.handleRequest(call, callback, async () => {
      const users = await userModels.getAllUsers();
      return { users };
    });
  }

  async GetUser(call, callback) {
    ErrorHandlerGRPC.handleRequest(call, callback, async () => {
      const getUserId = await userModels.getUserById(call.request.id);
      return { user: getUserId };
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

      return {
        user: {
          id: newUser.id,
          fullname: newUser.fullname,
          email: newUser.email,
          picture: newUser.picture,
        },
      };
    });
  }

  async UpdateUser(call, callback) {
    ErrorHandlerGRPC.handleRequest(call, callback, async () => {
      const user = {
        fullname: call.request.fullname,
        email: call.request.email,
        picture: call.request.picture,
      };

      const updateUser = await userModels.updateUser(call.request.id, user);
      return {
        user: {
          id: updateUser.id,
          fullname: updateUser.fullname,
          email: updateUser.email,
          picture: updateUser.picture,
        },
      };
    });
  }
}

module.exports = new UserServices();
