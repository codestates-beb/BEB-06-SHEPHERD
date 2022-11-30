'use strict';

const userController = require('../controllers/user.controllers');
// const checkAuth = require("../middleware/check-auth");

const router = require('express').Router();

router.post('/join', userController.join);
router.post('/login', userController.login);
router.get('/:uid', userController.userInfo);

// router.use(checkAuth);

router.patch('/:uid', userController.addAccount);

module.exports = router;
