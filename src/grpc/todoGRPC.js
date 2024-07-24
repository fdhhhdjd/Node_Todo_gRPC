require("module-alias/register");

const grpc = require("@grpc/grpc-js");
const {
  grpcConfigs: {
    todoGRPC: { port },
  },
} = require("@/configs");
const todoService = require("./services/todoService");
const { todoProto } = require("@/protos");

const todoGRPCServer = new grpc.Server({
  "grpc.max_send_message_length": -1,
  "grpc.max_receive_message_length": -1,
});

// Add user service
todoGRPCServer.addService(todoProto.TodoService.service, todoService);

// Start the server
todoGRPCServer.bindAsync(
  `0.0.0.0:${port}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.info(`gRPC server listening on port ${port}`);
  },
);
