require("module-alias/register");

const grpc = require("@grpc/grpc-js");
const {
  grpcConfigs: {
    userGRPC: { port },
  },
} = require("@/configs");
const userService = require("./services/userServices");
const { userProto } = require("@/protos");

const userGRPCServer = new grpc.Server({
  "grpc.max_send_message_length": -1,
  "grpc.max_receive_message_length": -1,
});

// Add user service with interceptor
userGRPCServer.addService(userProto.UserService.service, userService);

// Start the server
userGRPCServer.bindAsync(
  `0.0.0.0:${port}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.info(`gRPC server listening on port ${port}`);
  },
);
