const prismaClient = require("../../prismaClient");

class TitleEpisodesController {
  registerTitleEpisodes = async (req, res, next) => {
    try {
      const { parentTconst, seasonNumber, episodeNumber } = req.body;
      const result = await prismaClient.titleEpisode.create({
        data: {
          parentTconst,
          seasonNumber,
          episodeNumber,
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
        message: "Register movie episode success",
      });
    } catch (error) {
      console.log("error :>> ", error);

      next(error);
    }
  };
}

const titleEpisodesController = new TitleEpisodesController();
module.exports = titleEpisodesController;
