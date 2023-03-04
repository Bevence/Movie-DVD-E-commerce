const prismaClient = require("../../prismaClient");

class TitleAkasController {
  getAllMovieTitle = async (req, res, next) => {
    try {
      const { name, genre, year, actor, director } = req.query;
      const filter = {};
      if (name) {
        filter.title = {
          contains: name,
          mode: "insensitive",
        };
      }
      if (genre) {
        filter.titleBasic = {
          genres: {
            has: genre,
          },
        };
      }
      if (year) {
        filter.titleBasic = {
          startYear: {
            equals: year,
          },
        };
      }
      if (director) {
        filter.titleCrew = {
          directors: {
            some: {
              primaryName: {
                contains: director,
                mode: "insensitive",
              },
            },
          },
        };
      }

      console.log("filter :>> ", filter);
      const titleAkas = await prismaClient.titleAkas.findMany({
        where: filter,
        include: {
          titleBasic: true,
          titleCrew: {
            include: {
              directors: true,
            },
          },
          titleEpisode: true,
          titleRatings: true,
        },
      });
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
          titleCrew: {
            include: {
              directors: true,
            },
          },
          titleEpisode: true,
          titleRatings: true,
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
