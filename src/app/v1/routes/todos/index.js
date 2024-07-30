const express = require("express");

const { AsyncHandler } = require("@/utils");
const todoControllers = require("@/app/v1/controllers/todoControllers");

const router = express.Router();

//* GET
router.get("/:todoId", AsyncHandler(todoControllers.getTodoDetail));
router.get("/user/:userId", AsyncHandler(todoControllers.getTodoByUser));

//* POST
router.post("/", AsyncHandler(todoControllers.createTodo));
router.post("/:todoId", AsyncHandler(todoControllers.updateTodo));

module.exports = router;
