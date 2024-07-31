"use strict";

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
const { appConstants } = require("@/constants");

const getServer = () => {
  const todoGRPCServer = new grpc.Server({
    "grpc.max_send_message_length": appConstants.NOT_SIZE_LIMIT,
    "grpc.max_receive_message_length": appConstants.NOT_SIZE_LIMIT,
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
  `${appConstants.HOST_EVERY_WHERE}:${port}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.info(`gRPC server listening on port ${port}`);
  },
);
