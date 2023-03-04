const router = require("express").Router();
const nameBasicsController = require("./nameBasics.controller");

router.get("/", nameBasicsController.list);
router.route("/register").post(nameBasicsController.registerNameBasics);

module.exports = router;
