const router = require("express").Router();

const orderController = require("./order.controller");
const isLoggedIn = require("../../middlewares/isLoggedIn");
const isAdmin = require("../../middlewares/isAdmin");

router.post("/add-to-cart", isLoggedIn, orderController.addToCart);
router.post("/make-order", isLoggedIn, orderController.makeOrder);
router.get("/my-orders", isLoggedIn, orderController.myOrders);
router.get("/my-orders-history", isLoggedIn, orderController.orderHistory);
router.get("/my-order-status/:id", isLoggedIn, orderController.orderStatus);
router.put("/collect-order/:id", isLoggedIn, orderController.collectOrder);
router.put(
  "/update-order/:id",
  isLoggedIn,
  isAdmin,
  orderController.updateOrderStatusByAdmin
);

module.exports = router;
