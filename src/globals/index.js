"use strict";

const { initPg } = require("@/inits");

// require("@/tests/dropTableTests");
class Globals {
  static async init() {
    //* POSTGRES SQL
    await initPg.initDatabase();
  }
}

Globals.init();
