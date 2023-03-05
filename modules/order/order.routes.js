const router = require("express").Router();

const orderController = require("./order.controller");
const isLoggedIn = require("../../middlewares/isLoggedIn");

router.post("/add-to-cart", orderController.addToCart);
router.post("/make-order", isLoggedIn, orderController.makeOrder);
router.get("/my-orders", isLoggedIn, orderController.myOrders);
router.get("/my-orders-history", isLoggedIn, orderController.orderHistory);
router.get("/my-order-status/:id", isLoggedIn, orderController.orderStatus);
router.post("/collect-order/:id", isLoggedIn, orderController.collectOrder);

module.exports = router;
