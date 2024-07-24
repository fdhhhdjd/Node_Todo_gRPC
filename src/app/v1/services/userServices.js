const { BadRequestResponse } = require("@/cors/error.response");
const { userClient } = require("@/protos");

class UserServices {
  async getUserProfile({ id }) {
    return new Promise((resolve, reject) => {
      userClient.GetUser({ id }, (err, response) => {
        if (!err) {
          resolve(response.user);
        } else {
          reject(new BadRequestResponse({ details: err }));
        }
      });
    });
  }
}

module.exports = new UserServices();
