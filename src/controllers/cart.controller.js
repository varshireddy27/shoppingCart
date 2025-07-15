const Cart = require('../models/cart.model');
const createCart = async(req, res) => {
    const cart = await Cart.find({user_id : userId});
    if(!cart) {
        
    }
    
}

module.exports = {
    createCart
}