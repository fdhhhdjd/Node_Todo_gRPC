"use strict";

const { BadRequestResponse } = require("@/cors/error.response");
const { userClient } = require("@/protos");

class UserServices {
  async GetAllUsers() {
    const response = await new Promise((resolve, reject) => {
      userClient.GetAllUsers({}, (err, response) => {
        if (err) reject(new BadRequestResponse({ details: err.message }));
        else {
          resolve(response.users);
        }
      });
    });
    return response;
  }

  async GetUserProfile({ id }) {
    const response = await new Promise((resolve, reject) => {
      userClient.GetUser({ id }, (err, response) => {
        if (err) reject(new BadRequestResponse({ details: err.message }));
        else {
          resolve(response.user);
        }
      });
    });
    return response;
  }

  async CreateUser(req) {
    const { fullname, email, picture } = req;
    const response = await new Promise((resolve, reject) => {
      userClient.CreateUser({ fullname, email, picture }, (err, response) => {
        if (err)
          reject(
            new BadRequestResponse({
              details: err.details,
            }),
          );
        else resolve(response.user);
      });
    });
    return response;
  }

  async UpdateUser(id, body) {
    const { fullname, email, picture } = body;
    const response = await new Promise((resolve, reject) => {
      userClient.UpdateUser(
        { id, fullname, email, picture },
        (err, response) => {
          if (err)
            reject(
              new BadRequestResponse({
                details: err.details,
              }),
            );
          else resolve(response.user);
        },
      );
    });
    return response;
  }

  async DeleteUser(id) {
    const response = await new Promise((resolve, reject) => {
      userClient.DeleteUser({ id }, (err, response) => {
        if (err)
          reject(
            new BadRequestResponse({
              details: err.details,
            }),
          );
        else resolve(response.user);
      });
    });
    return response;
  }
}

module.exports = new UserServices();
