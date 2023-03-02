const bcrypt = require("bcrypt");

const prismaClient = require("../prismaClient");
const generateToken = require("../../utils/generateToken");

class AuthUserController {
  register = async (req, res, next) => {
    try {
      let { email, username, password } = req.body;

      // encrypt the plain password using bcrypt
      password = await bcrypt.hash(password, 10);

      const user = await prismaClient.user.create({
        data: {
          email,
          username,
          password,
        },
      });
      res.json({
        status: true,
        data: user,
        message: "User created successfully",
      });
    } catch (err) {
      next(err);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await prismaClient.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) res.json({ status: false, message: "User not found" });

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword)
        res.json({ status: false, message: "Invalid credentials" });
      delete user.password;

      res.json({
        status: true,
        accessToken: generateToken(user),
        user,
        message: "User logged in successfully",
      });
    } catch (err) {
      next(err);
    }
  };
}

const authUserController = new AuthUserController();
module.exports = authUserController;
