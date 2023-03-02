const jwt = require("jsonwebtoken");
const config = require("config");

const prismaClient = require("../modules/prismaClient");

const JWT_SECRET = config.get("jwt.secret");

module.exports = async (req, res, next) => {
  let accessToken = "";
  // handle token from authorization header
  if (req.headers.authorization) {
    accessToken = req.headers.authorization;
  }
  // handle token from query string
  if (req.query.accessToken) {
    accessToken = req.query.accessToken;
  }
  if (!accessToken) next("Access token not found");

  const splittedToken = accessToken.split(" ");
  accessToken = splittedToken[splittedToken.length - 1];

  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET);
    const { id: userId } = decoded;
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) next("User not found");

    const { id, email, username, role } = user;
    req.currentUser = { id, email, username, role };
    next();
  } catch (err) {
    next(err);
  }
};
