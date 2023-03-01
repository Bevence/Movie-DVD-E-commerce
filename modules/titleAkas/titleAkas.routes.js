const router = require("express").Router();
const titleAkasController = require("./titleAkas.controller");

router
  .route("/")
  .get(titleAkasController.getAllMovieTitle)
  .post(titleAkasController.registerMovieTitle);

router
  .route("/:id")
  .get(titleAkasController.getMovieTitleById)
  .put(titleAkasController.updateMovieTitleById)
  .delete(titleAkasController.deleteMovieTitleById);

module.exports = router;
