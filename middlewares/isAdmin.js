module.exports = (req, res, next) => {
  const { role } = req.currentUser;
  if (role !== "ADMIN") {
    next("You are not authorized");
  }
  next();
};
