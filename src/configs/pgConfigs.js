'use strict';

const { pgConstants, appConstants } = require('@/constants');

require('dotenv').config();

const DEV = {
  pg: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
};

const PROD = {
  pg: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
};

const config = {
  DEV,
  PROD,
};

const getConfig = env => {
  if (env === appConstants.NODE_ENVS[0]) return config.DEV;
  if (env === appConstants.NODE_ENVS[1]) return config.PROD;
  return null;
};

const env = process.env.NODE_ENV;

module.exports = getConfig(env);
