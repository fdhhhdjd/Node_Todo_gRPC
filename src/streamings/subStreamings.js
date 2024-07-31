const { todoClient } = require("@/protos");

const startClient = () => {
  const call = todoClient.streamData();

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
