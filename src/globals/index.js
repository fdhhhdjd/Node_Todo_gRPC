"use strict";

const { initPg } = require("@/inits");

// require("@/tests/dropTableTests");
class Globals {
  static async init() {
    //* PostgreSQL
    await initPg.initDatabase();
  }
}

Globals.init();
