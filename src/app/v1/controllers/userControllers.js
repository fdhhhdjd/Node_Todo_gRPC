const { Ok, Created } = require("@/cors");
const userServices = require("@/app/v1/services/userServices");

class UserControllers {
  async GetUserDetail(req, res) {
    const userId = req.params.userId;
    new Ok({
      metadata: await userServices.GetUserProfile({ id: userId }),
    }).send(res);
  }
  async CreateUser(req, res) {
    new Created({
      metadata: await userServices.CreateUser(req.body),
    }).send(res);
  }
}

module.exports = new UserControllers();
