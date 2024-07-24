"use strict";

const express = require("express");

const router = express.Router();

router.get("/", async (_, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: "Ok",
    timestamp: Date.now(),
  };
  return res.status(200).send(healthCheck);
});

router.use("/users", require("./users"));

module.exports = router;
