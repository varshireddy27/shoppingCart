const express = require('express');
const { createProduct } = require('../controllers/seller.controller');
const sellerRouter = express.Router();

sellerRouter.post('/', createProduct);

module.exports = sellerRouter;