const userController = require("../controllers/user.controllers");

const router = require("express").Router();

router.get("/:uid", userController.userInfo);
router.post("/join", userController.join);
router.post("/login", userController.login);
router.post("/:uid/sendOrder", userController.sendOrder);

module.exports = router;
