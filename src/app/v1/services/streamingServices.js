const { todoClient } = require("@/protos");

class StreamingService {
  async getStreamingService(req) {
    const { message } = req;
    const call = todoClient.streamData();

    call.write({ message });

    call.end();

    return {
      message,
    };
  }
}

module.exports = new StreamingService();
