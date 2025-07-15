// const productModel = require("../models/product.model");
const Product = require("../models/product.model");
const base_url = process.env.BASE_URL;
const getPrimaryImageUrl = (files) => {
  const primaryImage = files.find((el) => el.fieldname === "image");
  if (primaryImage) {
    return base_url + primaryImage.filename;
  }
};
const getAdditionalImages = (files) => {
  const additionalImages = files.filter((el) => el.fieldname === "images");
  const urlArray = [];
  if (additionalImages.length > 0) {
    additionalImages.forEach((img) => {
      const url = base_url + img.filename;
      urlArray.push(url);
    });
  }
  return urlArray;
};
const createProduct = async (req, res) => {
  // const {name, type, price, ratings} = req.body;
  const name = req.body.name;
  const type = req.body.type;
  const price = req.body.price;
  const ratings = req.body.ratings;

  if (!name || !type || !price || !ratings) {
    return res.status(400).json({ message: "fields are missing" });
  }
  const newproduct = { name, type, price, ratings };

  const imageArrayFiles = req.files;
  const primaryImageUrl = getPrimaryImageUrl(imageArrayFiles, base_url);

  if (primaryImageUrl) {
    newproduct.image = primaryImageUrl;
  }

  const urlArray = getAdditionalImages(imageArrayFiles);
  if (urlArray.length > 0) {
    newproduct.images = urlArray;
  }
  const createdProduct = await Product.create(newproduct);
  res.status(201).json(createdProduct);
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  if (!productId) {
    return res.status(404).send("Product Id not found");
  }
  const { brand, discount, stock } = req.body;
  const newproduct = { brand, discount, stock };

  const imageArrayFiles = req.files;
  const primaryImageUrl = getPrimaryImageUrl(imageArrayFiles);
  if (primaryImageUrl) {
    newproduct.image = primaryImageUrl;
  }

  const urlArray = getAdditionalImages(imageArrayFiles);
  if (urlArray.length > 0) {
    newproduct.images = urlArray;
  }
  const updatedproduct = await Product.findByIdAndUpdate(productId, newproduct);
  res.status(200).json(updatedproduct);
};

const getAllProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      brand,
      type,
      pricestart,
      priceend,
    } = req.query;

    // pagination logic
    const skip = (page - 1) * limit;

    let filterObj = {};
    if (brand) {
      filterObj.brand = brand;
    }
    if (type) {
      filterObj.type = type;
    }

    filterObj.price = {};
    if (pricestart) {
      filterObj.price.$gte = Number(pricestart);
    }
    if (priceend) {
      filterObj.price.$lte = Number(priceend);
    }

    const total = await Product.countDocuments(filterObj);
    const products = await Product.find(filterObj).skip(skip).limit(limit);

    const resObj = {
      total,
      page,
      data: products,
    };

    res.status(200).json({ message: "Products retrived", data: resObj });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getAllProducts,
};
