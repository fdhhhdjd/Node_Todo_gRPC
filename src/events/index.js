"use strict";

const EventEmitter = require("events");

class EventBus extends EventEmitter {
  emitTodoAdded(key, data) {
    this.emit(key, data);
  }

  onTodoAdded(key, listener) {
    this.on(key, listener);
  }
}

module.exports = new EventBus();
