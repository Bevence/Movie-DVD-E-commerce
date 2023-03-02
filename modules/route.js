const router = require("express").Router();

const authUserRoute = require("./authUser/authUser.routes");

const titleAkasRoute = require("./titleAkas/titleAkas.routes");
const titleBasicsRoute = require("./titleBasics/titleBasics.routes");

router.use("/auth", authUserRoute);
router.use("/movie", titleAkasRoute);
router.use("/movie-basics", titleBasicsRoute);

module.exports = router;
