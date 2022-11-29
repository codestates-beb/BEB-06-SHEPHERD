const user = require('./user.route');
const main = require('./main.route');

const router = require('express').Router();

router.use('/user', user);
router.use('/', main);

module.exports = router;
