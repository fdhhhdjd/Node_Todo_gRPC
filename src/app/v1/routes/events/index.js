const express = require("express");

const { AsyncHandler } = require("@/utils");
const eventBusControllers = require("@/app/v1/controllers/eventBusControllers");

const router = express.Router();

//* POST
router.post("/", AsyncHandler(eventBusControllers.pushEvent));

module.exports = router;
