const jwt = require("jsonwebtoken");
const config = require("config");

const JWT_SECRET = config.get("jwt.secret");
const JWT_EXPIRY = config.get("jwt.expiresIn");

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
    role: user.role,
  };
  const options = {
    expiresIn: JWT_EXPIRY,
  };
  return jwt.sign(payload, JWT_SECRET, options);
};

module.exports = generateToken;
