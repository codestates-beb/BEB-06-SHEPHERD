"use strict";

const mapController = require("../controllers/map.controllers");

const router = require("express").Router();

router.get("/gpsStatus", mapController.status);

module.exports = router;
