require("module-alias/register");

const grpc = require("@grpc/grpc-js");
const {
  grpcConfigs: {
    grpc: { port },
  },
} = require("@/configs");
const userService = require("@/app/v1/services/userServices");
const { userProto } = require("@/protos");
const { GRPCInterceptor } = require("@/loggers");

// Create gRPC server with configuration options
const server = new grpc.Server({
  "grpc.max_send_message_length": -1,
  "grpc.max_receive_message_length": -1,
  interceptors: [GRPCInterceptor.createInterceptor],
});

// Add user service
server.addService(userProto.UserService.service, userService);

// Start the server
server.bindAsync(
  `0.0.0.0:${port}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
    console.info(`gRPC server listening on port ${port}`);
  },
);
