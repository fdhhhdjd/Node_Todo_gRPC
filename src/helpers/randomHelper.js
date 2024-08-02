"use strict";
const crypto = require("crypto");
const {
  appConfigs: {
    app: { keySecretV1, keySecretV2 },
  },
} = require("@/configs");

class RandomHelper {
  static generateAvatar(fullname) {
    const avatarUrl = `https://ui-avatars.com/api/?background=0D8ABC&size=350&color=fff&length=3&name=${encodeURIComponent(fullname)}`;
    return avatarUrl;
  }

  static createSignatureV1(baseString) {
    return crypto
      .createHmac("sha256", keySecretV1)
      .update(baseString)
      .digest("hex");
  }

  static createSignatureV2(baseString) {
    return crypto
      .createHmac("sha256", keySecretV2)
      .update(baseString)
      .digest("hex");
  }
}

module.exports = RandomHelper;
