"use strict";

const {
  appConfigs: {
    app: { node },
  },
} = require("@/configs");
const { appConstants } = require("@/constants");

class AppHelpers {
  // Check Node file environment
  static isNodeEnvMatch(env) {
    return node === env;
  }

  // Get option morgan
  static getMorganFormat() {
    return this.isNodeEnvMatch(appConstants.NODE_ENVS[0])
      ? appConstants.MORGAN_FORMATS[0]
      : appConstants.MORGAN_FORMATS[1];
  }
}

module.exports = AppHelpers;
