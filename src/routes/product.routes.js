const express = require('express');
const {createProduct, updateProduct} = require('../controllers/product.controller');
 
const productRouter = express.Router();
 
productRouter.post('/',createProduct);
productRouter.put('/:id', updateProduct);
 
module.exports = productRouter