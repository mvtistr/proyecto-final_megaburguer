const express = require("express");
const router = express.Router();

const {
	getOrders,
	getOrderById,
	getOrderDetails,
	createOrder,
	updateOrder,
	deleteOrder,
} = require("@controllers/order.controller.js");

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.get("/:id/details", getOrderDetails);
router.post("/", createOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

module.exports = router;