const router = require("express").Router();

const titleAkasRoute = require("./titleAkas/titleAkas.routes");

router.use("/movie", titleAkasRoute);

module.exports = router;
