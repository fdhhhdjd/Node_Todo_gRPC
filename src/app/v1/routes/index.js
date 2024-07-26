"use strict";

const { StatusCodes } = require("@/utils");
const express = require("express");

const router = express.Router();

router.get("/", async (_, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: "Ok",
    timestamp: Date.now(),
  };
  return res.status(StatusCodes.OK).send(healthCheck);
});

router.use("/users", require("./users"));
router.use("/todos", require("./todos"));

module.exports = router;
