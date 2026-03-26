const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/auth.middleware.js");
const isAdmin = require("../middleware/admin.middleware.js");

const {
  getProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController
} = require("../controllers/product.controller");

router.get("/", getProductsController);
router.get("/:id", getProductByIdController);
router.post("/", verifyToken, isAdmin, createProductController);

router.put("/:id", verifyToken, isAdmin, updateProductController);
router.delete("/:id", verifyToken, isAdmin, deleteProductController);

module.exports = router;