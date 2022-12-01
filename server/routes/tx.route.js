'use strict';

const orderController = require('../controllers/tx.controllers');

const router = require('express').Router();

router.post('/sendZ', orderController.sendZ);
router.post('/sendX', orderController.sendX);
router.post('/sendAll', orderController.sendAll);
router.get('/getTxInfo', orderController.getTxInfo);

module.exports = router;
