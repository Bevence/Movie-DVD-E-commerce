const prismaClient = require("../../prismaClient");

class TitleCrewController {
  registerTitleCrew = async (req, res, next) => {
    try {
      const query = [];
      const directors = req.body.directors;
      directors.map((director) => {
        query.push({
          nconst: director,
        });
      });

      const result = await prismaClient.titleCrew.create({
        data: {
          titleAkas: {
            connect: {
              titleId: req.params.id,
            },
          },
          directors: {
            connect: query,
          },
        },
      });
      res.json({
        status: true,
        data: result,
        message: "Register movie crew success",
      });
    } catch (error) {
      console.log("error :>> ", error);

      next(error);
    }
  };
}

const titleCrewController = new TitleCrewController();
module.exports = titleCrewController;
