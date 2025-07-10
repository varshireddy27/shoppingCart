const Product = require("../models/product.model");
// const createProduct = async (req, res) => {
//   try {
//     const name = req.body.name;
//     const type = req.body.type;
//     const price = req.body.price;
//     const ratings = req.body.ratings;


//     const { image, images } = req.files;
//     const product = new Product({
//       name,
//       type,
//       price,
//       ratings,
//       image,
//       images
//     });
//     const newProduct = await product.save();
//     res.status(200).json(newProduct);
//     res.json({body: req.body, files: req.files})
//   } catch (err) {
//     console.log("error", err)
//     res
//       .status(500)
//       .json({ message: "Error creating product", error: err.message });
//   }
// };

const createProduct = async (req, res) => {
  try {
    const name = req.body.name;
    const type = req.body.type;
    const price = req.body.price;
    const ratings = req.body.ratings;
    const BASE_URL = "http://localhost:3000/images/";


    const image = req.files.image;
    const images = req.files.images;
    if (!image && !images) {
      return res.status(400).json({ message: "No image files uploaded" });
    }
    const imageurl = BASE_URL + image;
    const imageurls= BASE_URL + images;

    const product = new Product({
      name,
      type,
      price,
      ratings,
      image:imageurl,
      images:imageurls
    });
    const newProduct = await product.save();
    res.status(200).json(newProduct);
    res.json({body: req.body, files: req.files})
  } catch (err) {
    console.log("error", err)
    res
      .status(500)
      .json({ message: "Error creating product", error: err.message });
  }
};


module.exports = { createProduct };



// module.exports = { createProduct };
