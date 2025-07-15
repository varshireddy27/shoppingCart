const express = require("express");
const {
  createProduct,
  updateProduct,
  getAllProducts,
} = require("../controllers/product.controller");

const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.put("/:id", updateProduct);
productRouter.get('/', getAllProducts);

module.exports = productRouter;
