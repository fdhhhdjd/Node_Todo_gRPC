"use strict";

const { appConstants } = require("@/constants");

require("dotenv").config();

const DEV = {
  grpc: {
    port: process.env.GRPC_PORT,
    node: process.env.NODE_ENV || appConstants.NODE_ENVS[0],
  },
};

const PROD = {
  grpc: {
    port: process.env.GRPC_PORT,
    node: process.env.NODE_ENV || appConstants.NODE_ENVS[1],
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
