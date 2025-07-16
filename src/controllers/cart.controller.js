const Cart = require("../models/cart.model");
const createCart = async (req, res) => {
  const { carts } = req.body;
  console.log(carts);

  const userId = req.user.id;
  const cartexist = await Cart.findOne({ user_id: userId });

  if (!cartexist) {
    const newCart =  new Cart({
      user_id: userId,
      items: carts,
    });
    await newCart.save();
    return res
      .status(200)
      .json({ message: "Cart is successfully created", data: newCart });
  }
  else {
    cartexist.items = carts;
    await cartexist.save();
    return res
      .status(200)
      .json({ message: "Cart is updated created", data: cartexist });
  }
};

const getCart = async(req, res) => {
  const userId = req.user.id;
  const cart = await Cart.findOne({ user_id: userId });
  if(!cart) {
    return res.status(400).send("No items in the cart");
  }
  res.status(200).json({message : "Cart has items", data : cart});

}

module.exports = {
  createCart,
  getCart
};
