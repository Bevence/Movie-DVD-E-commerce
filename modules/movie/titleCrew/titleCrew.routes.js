const router = require("express").Router();
const titleCrewController = require("./titleCrew.controller");

router.route("/:id").post(titleCrewController.registerTitleCrew);

module.exports = router;
