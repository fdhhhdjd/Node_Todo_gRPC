const grpc = require("@grpc/grpc-js");
const path = require("path");
const LoadFile = require("@/helpers/loadFileHelpers");

const protoDir = path.join(__dirname, "..", "protos");

const protos = LoadFile.loadProtos(protoDir);

const todoProto = protos.todo;

const port = 50052;

const client = new todoProto.TodoService(
  `localhost:${port}`,
  grpc.credentials.createInsecure(),
);

const startClient = () => {
  const call = client.streamData();

  call.on("data", (response) => {
    console.log("Received response:", response.message);
  });

  call.on("end", () => {
    console.log("Stream ended");
  });

  call.on("error", (error) => {
    console.error("Stream error:", error);
  });

  // Send multiple requests
  call.write({ message: "Hello, server!" });
  call.write({ message: "How are you?" });
  call.write({ message: "Goodbye!" });

  // End the stream
  call.end();
};

// Start the client
startClient();

module.exports = {
  client,
};
