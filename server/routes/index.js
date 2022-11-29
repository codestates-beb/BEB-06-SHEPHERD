const user = require("./user.route");
const main = require("./main.route");
const map = require("./map.route");

const router = require("express").Router();

router.use("/user", user);
router.use("/", main);
router.use("/map", map);

module.exports = router;
