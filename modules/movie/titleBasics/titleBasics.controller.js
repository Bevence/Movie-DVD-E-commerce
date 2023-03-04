const prismaClient = require("../../prismaClient");

class TitleBasicsController {
  registerMovieTitleBasics = async (req, res, next) => {
    try {
      const {
        titleType,
        primaryTitle,
        originalTitle,
        isAdult,
        startYear,
        endYear,
        runtimeMinutes,
        genres,
      } = req.body;
      const titleBasics = await prismaClient.titleBasic.create({
        data: {
          titleType,
          primaryTitle,
          originalTitle,
          isAdult,
          startYear: new Date(startYear),
          endYear: new Date(endYear),
          runtimeMinutes,
          genres,
          titleAkas: {
            connect: {
              titleId: req.params.id,
            },
          },
        },
      });
      res.json({
        status: true,
        data: titleBasics,
        message: "Register movie title basics success",
      });
    } catch (error) {
      console.log("error :>> ", error);

      next(error);
    }
  };
}

const titleBasicsController = new TitleBasicsController();
module.exports = titleBasicsController;
