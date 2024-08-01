"use strict";

const EventBus = require("@/events");

class EventService {
  async pushEvent(req) {
    const { message } = req;

    EventBus.emitTodoAdded("messageAdded", message);

    return {
      message,
    };
  }
}

module.exports = new EventService();
