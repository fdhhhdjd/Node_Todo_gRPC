const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

// Load proto files
const todoProtoPath = path.join(__dirname, "..", "protos", "todo.proto");

const todoPackageDef = protoLoader.loadSync(todoProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const todoProto = grpc.loadPackageDefinition(todoPackageDef).todo;

// Define the port
const port = 50052;

function startClient() {
  const client = new todoProto.TodoService(
    `localhost:${port}`,
    grpc.credentials.createInsecure(),
  );

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
}

// Start the client
startClient();
