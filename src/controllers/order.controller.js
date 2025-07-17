const Order = require("../models/order.model");
const productModel = require("../models/product.model");
const createOrder = async (req, res) => {
  try {
    const { products , paymentMethod} = req.body;

    console.log(products);
    // get the user id
    const userId = req.user.id;

    if (products.length === 0) {
      res.status(400).json({ message: "No items available !" });
    }

    let items = [];
    let order_total = 0;

    //   iterate the products
    for (let product of products) {
      // destructure the product properties
      const { product_id, quantity } = product;

      if (!product_id) {
        return res.status(404).json({
          message: `Missing Products feilds ( product id for id:${product_id}`,
        });
      }

      // get the product detail from db by id
      const productDetail = await productModel.findById(product_id);

      // if product detail not found send error message
      if (!productDetail) {
        return res.status(404).json({
          message: `Product not found !`,
        });
      }

      const productPrice = productDetail.price;
      const totalPrice = productPrice * (Number(quantity) || 1);

      // construct the obj
      const item = {
        product_id,
        quantity: quantity || 1,
        price_at_purchase: totalPrice,
      };

      items.push(item);

      // logic for grand total
      order_total += totalPrice;
    }

    //   insert the data to db
    const newOrder = await new Order({
      user_id: userId,
      order_total,
      paymentMethod,
      items
    });
    await newOrder.save();
    return res
      .status(200)
      .json({ message: " Order Placed Successfully", data: newOrder });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = {
  createOrder,
};
