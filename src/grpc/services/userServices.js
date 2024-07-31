"use strict";

const userModels = require("@/app/v1/models/userModels");
const { pgConstants } = require("@/constants");
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

      const { numberOfUpdateRows, updatedUser } = await userModels.updateUser(
        call.request.id,
        user,
      );

      if (numberOfUpdateRows === pgConstants.USER_NOT_EXIT) {
        throw new InvalidArgumentGRPC();
      }

      return {
        user: {
          id: updatedUser.id,
          fullname: updatedUser.fullname,
          email: updatedUser.email,
          picture: updatedUser.picture,
        },
      };
    });
  }

  async DeleteUser(call, callback) {
    ErrorHandlerGRPC.handleRequest(call, callback, async () => {
      const { numberOfDeletedRows } = await userModels.deleteUser(
        call.request.id,
      );

      if (numberOfDeletedRows === pgConstants.USER_NOT_EXIT) {
        throw new InvalidArgumentGRPC();
      }
      return {
        user: {
          id: call.request.id,
        },
      };
    });
  }
}

module.exports = new UserServices();
