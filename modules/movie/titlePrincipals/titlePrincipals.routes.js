const router = require("express").Router();
const nameBasicsController = require("./nameBasics.controller");

router.route("/:id").post(nameBasicsController.registerNameBasics);

module.exports = router;
