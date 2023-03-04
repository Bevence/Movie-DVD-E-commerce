const prismaClient = require("../../prismaClient");

class TitleAkasController {
  getAllMovieTitle = async (req, res, next) => {
    try {
      const titleAkas = await prismaClient.titleAkas.findMany();
      res.json({
        status: true,
        data: titleAkas,
        message: "Get all movie title success",
      });
    } catch (error) {
      next(error);
    }
  };

  registerMovieTitle = async (req, res, next) => {
    try {
      const {
        title,
        ordering,
        region,
        language,
        types,
        attributes,
        isOriginalTitle,
        quantityAvailable,
      } = req.body;
      const titleAkas = await prismaClient.titleAkas.create({
        data: {
          title,
          ordering,
          region,
          language,
          types,
          attributes,
          isOriginalTitle,
          quantityAvailable,
        },
      });
      res.json({
        status: true,
        data: titleAkas,
        message: "Register movie title success",
      });
    } catch (error) {
      console.log("error :>> ", error);

      next(error);
    }
  };

  getMovieTitleById = async (req, res, next) => {
    const { id } = req.params;

    try {
      const movieTitle = await prismaClient.titleAkas.findUnique({
        where: {
          titleId: id,
        },
        include: {
          titleBasic: true,
        },
      });
      res.json({
        status: true,
        data: movieTitle,
        message: "Get movie title by id success",
      });
    } catch (error) {
      next(error);
    }
  };

  updateMovieTitleById = async (req, res, next) => {
    const { id } = req.params;

    try {
      const movieTitle = await prismaClient.titleAkas.update({
        where: {
          titleId: id,
        },
        data: req.body,
      });
      res.json({
        status: true,
        data: movieTitle,
        message: "Update movie title by id success",
      });
    } catch (error) {
      next(error);
    }
  };

  deleteMovieTitleById = async (req, res, next) => {
    const { id } = req.params;

    try {
      const movieTitle = await prismaClient.titleAkas.delete({
        where: {
          titleId: id,
        },
      });
      res.json({
        status: true,
        data: movieTitle,
        message: "Delete movie title by id success",
      });
    } catch (error) {
      next(error);
    }
  };
}

const titleAkasController = new TitleAkasController();
module.exports = titleAkasController;
