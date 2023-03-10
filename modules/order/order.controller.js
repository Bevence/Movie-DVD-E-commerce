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
      if (movie && movie.quantityAvailable >= quantity) {
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
          message: "Movie not found or quantity exceed",
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
      cart.push(req.body);
      const orderList = [];

      cart.forEach((item) => {
        const { movieId, quantity } = item;
        orderList.push({
          userId,
          movieId,
          quantity,
        });
      });
      const result = await prismaClient.orderItem.createMany({
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

  myOrders = async (req, res, next) => {
    try {
      const { id: userId } = req.currentUser;
      const result = await prismaClient.orderItem.findMany({
        where: {
          userId,
          OR: [
            {
              status: "INITIATED",
            },
            {
              status: "PROCESSED",
            },
          ],
        },
        include: {
          movie: true,
        },
      });
      res.json({
        status: true,
        data: result,
        message: "Get my orders success",
      });
    } catch (err) {
      next(err);
    }
  };

  orderHistory = async (req, res, next) => {
    try {
      const { id: userId } = req.currentUser;
      const result = await prismaClient.orderItem.findMany({
        where: {
          userId,
          status: "SHIPPED",
        },
        include: {
          movie: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      res.json({
        status: true,
        data: result,
        message: "Get my orders history success",
      });
    } catch (err) {
      next(err);
    }
  };

  orderStatus = async (req, res, next) => {
    try {
      const { id: userId } = req.currentUser;
      const { id } = req.params;
      const order = await prismaClient.orderItem.findUnique({
        where: {
          id,
        },
      });
      if (order && order.userId === userId) {
        res.json({
          status: true,
          data: { status: order.status },
          message: "Get order status success",
        });
      } else {
        res.json({
          status: false,
          data: null,
          message: "Order not found",
        });
      }
    } catch (err) {
      next(err);
    }
  };

  collectOrder = async (req, res, next) => {
    try {
      const { id: userId } = req.currentUser;
      const { id } = req.params;
      const order = await prismaClient.orderItem.findUnique({
        where: {
          id,
        },
      });

      if (order && order.userId === userId && order.status === "SHIPPED") {
        const result = await prismaClient.orderItem.update({
          where: {
            id,
          },
          data: {
            status: "COLLECTED",
          },
        });
        res.json({
          status: true,
          data: result,
          message: "Collect order success",
        });
      } else {
        res.json({
          status: false,
          data: null,
          message: "Order not found or has not been shipped",
        });
      }
    } catch (err) {
      next(err);
    }
  };

  updateOrderStatusByAdmin = async (req, res, next) => {
    try {
      const { role } = req.currentUser;
      const { id } = req.params;
      const { status } = req.body;
      const order = await prismaClient.orderItem.findUnique({
        where: {
          id,
        },
      });

      if (order && role === "ADMIN" && order.status !== "COLLECTED") {
        const result = await prismaClient.orderItem.update({
          where: {
            id,
          },
          data: {
            status,
          },
        });
        res.json({
          status: true,
          data: result,
          message: "Collect order success",
        });
      } else {
        res.json({
          status: false,
          data: null,
          message: "Invalid request",
        });
      }
    } catch (err) {
      next(err);
    }
  };
}

const orderController = new OrderController();
module.exports = orderController;
