const { Ok } = require("@/cors");
const eventBusServices = require("../services/eventBusService");

class EventBusControllers {
  async pushEvent(req, res) {
    new Ok({
      metadata: await eventBusServices.pushEvent(req.body),
    }).send(res);
  }
}

module.exports = new EventBusControllers();
