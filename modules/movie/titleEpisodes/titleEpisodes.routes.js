const router = require("express").Router();
const titleEpisodesController = require("./titleEpisodes.controller");

router.route("/:id").post(titleEpisodesController.registerTitleEpisodes);

module.exports = router;
