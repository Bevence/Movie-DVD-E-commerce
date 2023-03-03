const router = require("express").Router();

const authUserRoute = require("./authUser/authUser.routes");
const orderRoute = require("./order/order.routes");

const titleAkasRoute = require("./movie/titleAkas/titleAkas.routes");
const titleBasicsRoute = require("./movie/titleBasics/titleBasics.routes");

router.use("/order", orderRoute);
router.use("/auth", authUserRoute);
router.use("/movie", titleAkasRoute);
router.use("/movie-basics", titleBasicsRoute);

module.exports = router;
