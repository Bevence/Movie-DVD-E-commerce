const router = require("express").Router();
const titleBasicsController = require("./titleBasics.controller");

router.route("/:id").post(titleBasicsController.registerMovieTitleBasics);

module.exports = router;
