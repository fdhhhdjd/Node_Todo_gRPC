const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");

const userProtoPath = path.join(__dirname, "user.proto");
const todoProtoPath = path.join(__dirname, "todo.proto");

//* Users
const userPackageDef = protoLoader.loadSync(userProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

//* Todo
const todoPackageDef = protoLoader.loadSync(todoProtoPath, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userProto = grpc.loadPackageDefinition(userPackageDef).user;
const todoProto = grpc.loadPackageDefinition(todoPackageDef).todo;

const userClient = new userProto.UserService(
  "localhost:50051",
  grpc.credentials.createInsecure(),
);

const todoClient = new todoProto.TodoService(
  "localhost:50052",
  grpc.credentials.createInsecure(),
);

module.exports = { userProto, todoProto, userClient, todoClient };
