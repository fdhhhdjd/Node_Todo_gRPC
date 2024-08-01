"use strict";

class FieldHelpers {
  static filterTodo = (todo) => {
    const filteredTodo = {};
    for (const key in todo) {
      if (todo[key] !== "" && todo[key] !== null && todo[key] !== false) {
        filteredTodo[key] = todo[key];
      }
    }
    return filteredTodo;
  };
}

module.exports = FieldHelpers;
