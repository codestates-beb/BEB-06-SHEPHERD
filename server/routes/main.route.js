'use strict';

const mainControllers = require('../controllers/main.controllers');
const checkAuth = require('../middleware/check-auth');

const router = require('express').Router();

router.get('/', mainControllers.main);

router.use(checkAuth);

router.get('/faucet/:account', mainControllers.faucet);

module.exports = router;
