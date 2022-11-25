const user = require("./user.route");
const main = require("./main.route");
const map = require("./map.route");
const ledger = require("./ledger.route");

const router = require("express").Router();

router.use("/", main);
router.use("/user", user);
router.use("/map", map);
router.use("/ledger", ledger);

module.exports = router;
