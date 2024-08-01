"use strict";

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const fs = require("fs");
const path = require("path");

class LoadFile {
  static loadProtos = (protoDir) => {
    const protoFiles = fs
      .readdirSync(protoDir)
      .filter((file) => file.endsWith(".proto"));
    const packageDefinitions = protoFiles.map((file) => {
      const filePath = path.join(protoDir, file);
      return protoLoader.loadSync(filePath, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
      });
    });

    const allPackageDefinitions = packageDefinitions.reduce((acc, def) => {
      return { ...acc, ...grpc.loadPackageDefinition(def) };
    }, {});

    return allPackageDefinitions;
  };
}

module.exports = LoadFile;
