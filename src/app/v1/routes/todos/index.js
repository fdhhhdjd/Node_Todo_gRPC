const express = require("express");

const { AsyncHandler } = require("@/utils");
const todoControllers = require("@/app/v1/controllers/todoControllers");

const router = express.Router();

//* GET
router.get("/:todoId", AsyncHandler(todoControllers.getTodoDetail));

//* POST
router.post("/", AsyncHandler(todoControllers.createTodo));

module.exports = router;
