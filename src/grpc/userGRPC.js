"use strict";

require("module-alias/register");

const grpc = require("@grpc/grpc-js");

const {
  grpcConfigs: {
    userGRPC: { port },
  },
} = require("@/configs");
const { userProto } = require("@/protos");
const { appConstants } = require("@/constants");

//* GLOBAL
require("@/globals");

const getServer = () => {
  const userGRPCServer = new grpc.Server({
    "grpc.max_send_message_length": appConstants.NOT_SIZE_LIMIT,
    "grpc.max_receive_message_length": appConstants.NOT_SIZE_LIMIT,
  });

  // Add user service with interceptor
  userGRPCServer.addService(
    userProto.UserService.service,
    require("./services/userServices"),
  );

  return userGRPCServer;
};

const userGRPCServer = getServer();

// Start the server
userGRPCServer.bindAsync(
  `${appConstants.HOST_EVERY_WHERE}:${port}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.info(`gRPC server listening on port ${port}`);
  },
);
