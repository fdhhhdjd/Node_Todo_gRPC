"use strict";

const { appConstants } = require("@/constants");

require("dotenv").config();

const DEV = {
  userGRPC: {
    port: process.env.USER_GRPC_PORT,
  },
  todoGRPC: {
    port: process.env.TODO_GRPC_PORT,
  },
};

const PROD = {
  userGRPC: {
    port: process.env.USER_GRPC_PORT,
  },
  todoGRPC: {
    port: process.env.TODO_GRPC_PORT,
  },
};

const config = {
  DEV,
  PROD,
};

const getConfig = (env) => {
  if (env === appConstants.NODE_ENVS[0]) return config.DEV;
  if (env === appConstants.NODE_ENVS[1]) return config.PROD;
  return null;
};

const env = process.env.NODE_ENV;

module.exports = getConfig(env);
