require("module-alias/register");

const grpc = require("@grpc/grpc-js");

const {
  grpcConfigs: {
    grpc: { port },
  },
} = require("@/configs");

const userService = require("@/app/v1/services/userServices");
const { userProto } = require("@/protos");

const server = new grpc.Server();
server.addService(userProto.UserService.service, userService);

server.bindAsync(
  `0.0.0.0:${port}`,
  grpc.ServerCredentials.createInsecure(),
  () => {
    server.start();
    console.log(`gRPC server listening on port ${port}`);
  },
);
