"use strict";

const orderController = require("../controllers/tx.controllers");

const router = require("express").Router();

router.post("/sendZ", orderController.sendZ);
router.post("/sendX", orderController.sendX);

module.exports = router;
