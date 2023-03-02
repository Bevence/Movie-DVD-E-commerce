const router = require("express").Router();

const authUserController = require("./authUser.controller");

router.post("/register", authUserController.register);
router.post("/login", authUserController.login);

module.exports = router;
