const router = require("express").Router();

const orderController = require("./order.controller");
const isLoggedIn = require("../../middlewares/isLoggedIn");

router.post("/add-to-cart", orderController.addToCart);
router.post("/make-order", isLoggedIn, orderController.makeOrder);

module.exports = router;
