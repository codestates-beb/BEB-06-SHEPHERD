'use strict';

const userController = require('../controllers/user.controllers');

const router = require('express').Router();

router.post('/join', userController.join);
router.post('/login', userController.login);
router.get('/:uid', userController.userInfo);

router.patch('/:uid', userController.addAccount);

module.exports = router;
