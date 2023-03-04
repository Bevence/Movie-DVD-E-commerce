const router = require("express").Router();
const titleRatingController = require("./titleRatings.controller");

router.route("/:id").post(titleRatingController.registertitleRating);

module.exports = router;
