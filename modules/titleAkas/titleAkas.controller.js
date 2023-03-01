const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();

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
      const { title, region, language, types, attributes } = req.body;
      const titleAkas = await prismaClient.titleAkas.create({
        data: {
          title,
          region,
          language,
          types,
          attributes,
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

  updateMovieTitleById = async (req, res, next) => {};

  deleteMovieTitleById = async (req, res, next) => {};
}

const titleAkasController = new TitleAkasController();
module.exports = titleAkasController;
