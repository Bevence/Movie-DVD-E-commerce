const prismaClient = require("../../prismaClient");

class TitleRatingController {
  registertitleRating = async (req, res, next) => {
    try {
      const { averageRating, numVotes } = req.body;
      const result = await prismaClient.titleRating.create({
        data: {
          averageRating,
          numVotes,
          titleAkas: {
            connect: {
              titleId: req.params.id,
            },
          },
        },
      });
      res.json({
        status: true,
        data: result,
        message: "Register movie title rating success",
      });
    } catch (error) {
      console.log("error :>> ", error);

      next(error);
    }
  };
}

const titleRatingController = new TitleRatingController();
module.exports = titleRatingController;
