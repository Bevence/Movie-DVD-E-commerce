const prismaClient = require("../prismaClient");

class OrderController {
  addToCart = async (req, res, next) => {
    try {
      const { movieId, quantity } = req.body;
      const movie = await prismaClient.titleAkas.findUnique({
        where: {
          titleId: movieId,
        },
      });
      if (movie) {
        const cart = req.session.cart || [];
        const itemIndex = cart.findIndex((item) => item.movieId === movieId);
        if (itemIndex !== -1) {
          cart[itemIndex].quantity += quantity;
        } else {
          cart.push({
            movieId,
            quantity,
          });
        }
        req.session.cart = cart;
        res.json({
          status: true,
          data: cart,
          message: "Add to cart success",
        });
      } else {
        res.json({
          status: false,
          data: null,
          message: "Movie not found",
        });
      }
    } catch (err) {
      next(err);
    }
  };

  makeOrder = async (req, res, next) => {
    try {
      const { id: userId } = req.currentUser;
      const cart = req.session.cart || [];
      const orderList = [];

      cart.forEach((item) => {
        const { movieId, quantity } = item;
        orderList.push({
          userId,
          movieId,
          quantity,
        });
      });

      const result = await prismaClient.order.createMany({
        data: orderList,
      });
      req.session.cart = [];
      res.json({
        status: true,
        data: result,
        message: "Make order success",
      });
    } catch (err) {
      next(err);
    }
  };
}

const orderController = new OrderController();
module.exports = orderController;
