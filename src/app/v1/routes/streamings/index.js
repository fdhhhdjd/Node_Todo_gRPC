const express = require("express");

const { AsyncHandler } = require("@/utils");
const streamingControllers = require("@/app/v1/controllers/streamingControllers");

const router = express.Router();

// curl -X POST http://localhost:5000/api/v1/streamings \
//      -H "Content-Type: application/json" \
//      -d '{"message": "hello"}'

//* POST
router.post("/", AsyncHandler(streamingControllers.send));

module.exports = router;
