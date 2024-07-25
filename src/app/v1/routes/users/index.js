const express = require("express");

const userControllers = require("@/app/v1/controllers/userControllers");
const { AsyncHandler } = require("@/utils");

const router = express.Router();

//* GET
router.get("/", AsyncHandler(userControllers.GetAllUsers));
router.get("/:userId", AsyncHandler(userControllers.GetUserDetail));

//* POST
router.post("/", AsyncHandler(userControllers.CreateUser));

module.exports = router;
