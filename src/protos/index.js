const protoLoader = require("@grpc/proto-loader");
const grpc = require("@grpc/grpc-js");
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

module.exports = { userProto, todoProto };
