const user = require('./user.route');
const main = require('./main.route');
const tx = require('./tx.route');

const router = require('express').Router();

router.use('/user', user);
router.use('/', main);
router.use('/tx', tx);

module.exports = router;
