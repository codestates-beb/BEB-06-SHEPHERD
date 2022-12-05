"use strict";

const mainControllers = require("../controllers/main.controllers");

const router = require("express").Router();

router.get("/faucet/:account", mainControllers.faucet);

module.exports = router;
