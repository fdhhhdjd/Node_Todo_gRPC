const { Ok } = require("@/cors");
const userServices = require("@/app/v1/services/userServices");

class UserControllers {
  async GetUserDetail(req, res) {
    const userId = req.params.userId;
    new Ok({
      metadata: await userServices.getUserProfile({ id: userId }),
    }).send(res);
  }
}

module.exports = new UserControllers();
