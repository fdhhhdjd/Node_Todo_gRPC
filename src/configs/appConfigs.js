"use strict";

const { appConstants } = require("@/constants");

require("dotenv").config();

const DEV = {
  app: {
    port: process.env.PORT,
    node: process.env.NODE_ENV || appConstants.NODE_ENVS[0],
    keySecretV1: process.env.KEY_SECRET_V1,
    keySecretV2: process.env.KEY_SECRET_V2,
  },
};

const PROD = {
  app: {
    port: process.env.PORT,
    node: process.env.NODE_ENV || appConstants.NODE_ENVS[1],
    keySecretV1: process.env.KEY_SECRET_V1,
    keySecretV2: process.env.KEY_SECRET_V2,
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
