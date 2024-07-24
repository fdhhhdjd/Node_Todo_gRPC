const express = require("express");

const { AsyncHandler } = require("@/utils");
const todoControllers = require("@/app/v1/controllers/todoControllers");

const router = express.Router();

router.get("/:todoId", AsyncHandler(todoControllers.getTodoDetail));

module.exports = router;
