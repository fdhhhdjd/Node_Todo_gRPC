"use strict";

const { initPg } = require("@/inits");

class Globals {
  static async init() {
    //* PostgreSQL
    await initPg.initDatabase();
  }
}

Globals.init();
