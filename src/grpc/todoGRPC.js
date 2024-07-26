require("module-alias/register");

const grpc = require("@grpc/grpc-js");
const {
  grpcConfigs: {
    todoGRPC: { port },
  },
} = require("@/configs");

//* GLOBAL
require("@/globals");

const { todoProto } = require("@/protos");

const getServer = () => {
  const todoGRPCServer = new grpc.Server({
    "grpc.max_send_message_length": -1,
    "grpc.max_receive_message_length": -1,
  });
  todoGRPCServer.addService(
    todoProto.TodoService.service,
    require("./services/todoService"),
  );
  return todoGRPCServer;
};

const todoGRPCServer = getServer();

// Start the server
todoGRPCServer.bindAsync(
  `0.0.0.0:${port}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.info(`gRPC server listening on port ${port}`);
  },
);
