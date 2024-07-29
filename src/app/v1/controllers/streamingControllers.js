const { Ok } = require("@/cors");
const streamingServices = require("../services/streamingServices");

class StreamingControllers {
  async send(req, res) {
    new Ok({
      metadata: await streamingServices.getStreamingService(req.body),
    }).send(res);
  }
}

module.exports = new StreamingControllers();
