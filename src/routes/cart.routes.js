const express = require('express');
const { createCart , getCart} = require('../controllers/cart.controller');

const cartRouter = express.Router();
cartRouter.post('/', createCart);
cartRouter.get('/items', getCart);
module.exports = cartRouter;