const express = require('express');

const userControllers = require('@/app/v1/controllers/userControllers');
const { AsyncHandler } = require('@/utils');

const router = express.Router();

router.get('/:userId', AsyncHandler(userControllers.getUserProfile));

module.exports = router;
