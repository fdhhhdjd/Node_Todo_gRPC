"use strict";

const EventBus = require("./");

const ListenEvents = () => {
  EventBus.onTodoAdded("messageAdded", (message) => {
    console.log("New message added:", message);
  });
};

ListenEvents();
