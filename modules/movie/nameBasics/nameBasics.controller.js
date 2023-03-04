const prismaClient = require("../../prismaClient");

class NameBasicsController {
  list = async (req, res, next) => {
    const result = await prismaClient.nameBasic.findMany();
    res.json({
      status: true,
      data: result,
      message: "List name basics success",
    });
  };

  registerNameBasics = async (req, res, next) => {
    try {
      const {
        primaryName,
        birthYear,
        deathYear,
        primaryProfession,
        knownForTitles,
      } = req.body;
      const titleBasics = await prismaClient.nameBasic.create({
        data: {
          primaryName,
          birthYear: new Date(birthYear),
          deathYear: deathYear ? new Date(deathYear) : null,
          primaryProfession,
          knownForTitles,
        },
      });
      res.json({
        status: true,
        data: titleBasics,
        message: "Register name basics success",
      });
    } catch (error) {
      next(error);
    }
  };
}

const nameBasicsController = new NameBasicsController();
module.exports = nameBasicsController;
