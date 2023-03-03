const router = require("express").Router();

const orderController = require("./order.controller");

router.post("/add-to-cart", orderController.addToCart);

module.exports = router;
