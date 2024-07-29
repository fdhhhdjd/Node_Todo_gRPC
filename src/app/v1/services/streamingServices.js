const { client } = require("@/streamings/subStreamings");

class StreamingService {
  async getStreamingService(req) {
    const { message } = req;
    const call = client.streamData();

    call.write({ message });

    call.end();

    return {
      message,
    };
  }
}

module.exports = new StreamingService();
