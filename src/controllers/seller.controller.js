const Order = require("../models/order.model");
const Product = require("../models/product.model");
const createProduct = async (req, res) => {
  try {
    const { name, type, brand, price, ratings, stock } = req.body;
    const sellerId = req.user.id;
    const newProduct = await new Product({
      name,
      type,
      brand,
      price,
      ratings,
      stock,
      createdBy: sellerId,
    });
    await newProduct.save();
    res.status(200).json({
      message: "Product is successfully created by the seller",
      data: newProduct,
    });
  } catch (err) {
    return res.staus(500).json({ message: err.message });
  }
};
const getSellerProducts = async (req, res) => {
  try{
    const sellerId = req.user.id;


  } catch(err){
    return res.status(500). json({ message : err.message});
    const orders = await Order.find()
  }
}

module.exports = {
  createProduct,
  getSellerProducts
};
