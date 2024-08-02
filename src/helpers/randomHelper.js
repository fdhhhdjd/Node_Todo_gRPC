"use strict";
const crypto = require("crypto");

class RandomHelper {
  static generateAvatar(fullname) {
    const avatarUrl = `https://ui-avatars.com/api/?background=0D8ABC&size=350&color=fff&length=3&name=${encodeURIComponent(fullname)}`;
    return avatarUrl;
  }

  static createSignatureV1(baseString) {
    return crypto
      .createHmac("sha256", "your_secret_key_v1")
      .update(baseString)
      .digest("hex");
  }

  static createSignatureV2(baseString) {
    return crypto
      .createHmac("sha256", "your_secret_key_v2")
      .update(baseString)
      .digest("hex");
  }
}

module.exports = RandomHelper;
