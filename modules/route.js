const router = require("express").Router();

const authUserRoute = require("./authUser/authUser.routes");
const orderRoute = require("./order/order.routes");

const titleAkasRoute = require("./movie/titleAkas/titleAkas.routes");
const titleBasicsRoute = require("./movie/titleBasics/titleBasics.routes");
const titleCrewRoute = require("./movie/titleCrew/titleCrew.routes");
const titleEpisodeRoute = require("./movie/titleEpisodes/titleEpisodes.routes");
const titleRatingRoute = require("./movie/titleRatings/titleRatings.routes");
const characterNameRoute = require("./movie/nameBasics/nameBasics.routes");

router.use("/order", orderRoute);
router.use("/auth", authUserRoute);
router.use("/movie", titleAkasRoute);
router.use("/movie-basics", titleBasicsRoute);
router.use("/movie-crew", titleCrewRoute);
router.use("/movie-episode", titleEpisodeRoute);
router.use("/movie-rating", titleRatingRoute);
router.use("/movie-character", characterNameRoute);

module.exports = router;
