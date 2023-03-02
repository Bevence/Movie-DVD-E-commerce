const router = require("express").Router();

const titleAkasRoute = require("./titleAkas/titleAkas.routes");
const titleBasicsRoute = require("./titleBasics/titleBasics.routes");

router.use("/movie", titleAkasRoute);
router.use("/movie-basics", titleBasicsRoute);

module.exports = router;
