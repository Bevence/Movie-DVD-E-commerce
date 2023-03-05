const router = require("express").Router();

const isLoggedIn = require("../../../middlewares/isLoggedIn");
const isAdmin = require("../../../middlewares/isAdmin");
const titleAkasController = require("./titleAkas.controller");

router
  .route("/")
  .get(titleAkasController.getAllMovieTitle)
  .post([isLoggedIn, isAdmin], titleAkasController.registerMovieTitle);

router
  .route("/:id")
  .get(titleAkasController.getMovieTitleById)
  .put([isLoggedIn, isAdmin], titleAkasController.updateMovieTitleById)
  .delete([isLoggedIn, isAdmin], titleAkasController.deleteMovieTitleById);

module.exports = router;
