const EventBus = require("./index");

const ListenEvents = () => {
  EventBus.onTodoAdded("messageAdded", (message) => {
    console.log("New message added:", message);
  });
};

ListenEvents();
