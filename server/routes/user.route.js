'use strict';

const userController = require('../controllers/user.controllers');

const router = require('express').Router();

router.get('/refreshByToken', userController.refreshByToken);
router.get('/:uid', userController.userInfo);
router.get('/', userController.accountInfo);
router.post('/join', userController.join);
router.post('/login', userController.login);

router.patch('/:uid', userController.addAccount);

module.exports = router;
