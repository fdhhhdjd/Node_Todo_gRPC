const grpc = require("@grpc/grpc-js");
const path = require("path");

const {
  grpcConfigs: {
    todoGRPC: { port: todoPort },
    userGRPC: { port: userPort },
  },
} = require("@/configs");
const LoadFile = require("@/helpers/loadFileHelpers");

//* Load File Protos
const protoDir = path.join(__dirname, "..", "protos");
const protos = LoadFile.loadProtos(protoDir);
const userProto = protos.user;
const todoProto = protos.todo;

//* Get service client
const userClient = new userProto.UserService(
  `localhost:${userPort}`,
  grpc.credentials.createInsecure(),
);

const todoClient = new todoProto.TodoService(
  `localhost:${todoPort}`,
  grpc.credentials.createInsecure(),
);

module.exports = { userProto, todoProto, userClient, todoClient };
