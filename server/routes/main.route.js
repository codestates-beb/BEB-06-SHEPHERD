"use strict";

const mainControllers = require("../controllers/main.controllers");

const router = require("express").Router();

router.get("/", mainControllers.main);
router.get("/faucet/:address", mainControllers.faucet);

module.exports = router;
