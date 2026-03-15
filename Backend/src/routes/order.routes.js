const express = require("express");
const router = express.Router();

const {
	getOrders,
	getOrderById,
	createOrder,
	updateOrder,
	deleteOrder,
} = require("@controllers/order.controller.js");

router.get("/orders", getOrders);
router.get("/orders/:id", getOrderById);
router.post("/orders", createOrder);
router.put("/orders/:id", updateOrder);
router.delete("/orders/:id", deleteOrder);

module.exports = router;