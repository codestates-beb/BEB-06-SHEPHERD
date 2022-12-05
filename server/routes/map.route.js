'use strict';

const mapController = require('../controllers/map.controllers');

const router = require('express').Router();

router.get('/mapBalance', mapController.mapBalance);

module.exports = router;
