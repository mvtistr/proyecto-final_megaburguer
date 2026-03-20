const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth.middleware.js");

const {
	getOrders,
	createOrder,
	updateOrder,
	deleteOrder,
	getOrderDetails
} = require("../controllers/order.controller.js");

router.get("/", verifyToken, getOrders);
router.post("/", verifyToken, createOrder);
router.put("/:id", verifyToken, updateOrder);
router.delete("/:id", verifyToken, deleteOrder);
router.get("/:id/details", verifyToken, getOrderDetails);

module.exports = router;