"use strict";

class CheckStringHelpers {
  static isJSONString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
}

module.exports = CheckStringHelpers;
